import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>        
        <div class="slider__progress" style='width: 0%;'></div>
        <div class="slider__steps">
        </div>
      </div>
    `)

    this.sliderSteps = this.slider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      this.sliderSteps.append(document.createElement('span'));
    };
    this.sliderSteps.querySelector('span').classList.add('slider__step-active');
    this.clickListener();
    this.DND();
  }

  clickListener() {
    this.slider.addEventListener('slider-change', () => {});

    this.slider.addEventListener('click', e => {
      this.calculateClosestPoint(e.clientX)
    })
  }

  DND() {
    let sliderThumb = this.slider.querySelector('.slider__thumb');
    let sliderProgress = this.slider.querySelector('.slider__progress');
    sliderThumb.ondragstart = () => false;
    
    sliderThumb.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.slider.classList.add('slider_dragging');
      let sliderWidth = this.slider.offsetWidth;
      
      let shiftX = this.slider.getBoundingClientRect().left;
      let rightShiftX = this.slider.getBoundingClientRect().right;

      sliderThumb.style.position = 'absolute';
      sliderThumb.style.zIndex = 1000;

      const moveAt =(clientX) => {
        if (clientX < shiftX) {clientX = shiftX};
        if (clientX > rightShiftX) {clientX = rightShiftX};
        sliderThumb.style.left = (clientX - shiftX) / sliderWidth * 100 + '%';
        sliderProgress.style.width = (clientX - shiftX) / sliderWidth * 100 + '%';

        let points = [...this.sliderSteps.querySelectorAll('span')];
        let pointsXCordinates = points.map(point => point.getBoundingClientRect().x);
        let sliderValue = this.slider.querySelector('.slider__value');

        points.map(el => el.classList.remove('slider__step-active'));

        let distance = pointsXCordinates.map(el => (el - sliderThumb.getBoundingClientRect().x));
        let positiveDistance = distance.map(el => el >= 0 ? el : -el);
        let closestPoint = Math.min.apply(null, positiveDistance);
        let targetPoint = positiveDistance.indexOf(closestPoint);

        sliderValue.innerHTML = targetPoint;
        points[targetPoint].classList.add('slider__step-active');
      }

      moveAt(e.clientX);
    
      function onPointerMove(e) {
        e.preventDefault();
        moveAt(e.clientX);
      }

      document.addEventListener('pointermove', onPointerMove);

      document.onpointerup = () => {
        document.removeEventListener('pointermove', onPointerMove);
        this.slider.classList.remove('slider_dragging');
        document.onpointerup = null;

        this.calculateClosestPoint(sliderThumb.getBoundingClientRect().x)
      };
    })
  }

  calculateClosestPoint(coordinates) {
    let points = [...this.sliderSteps.querySelectorAll('span')];
    let pointsXCordinates = points.map(point => point.getBoundingClientRect().x);
    let sliderValue = this.slider.querySelector('.slider__value');
    let sliderThumb = this.slider.querySelector('.slider__thumb');
    let sliderProgress = this.slider.querySelector('.slider__progress')

    points.map(el => el.classList.remove('slider__step-active'));

    let distance = pointsXCordinates.map(el => (el - coordinates));
    let positiveDistance = distance.map(el => el >= 0 ? el : -el);
    let closestPoint = Math.min.apply(null, positiveDistance);
    let targetPoint = positiveDistance.indexOf(closestPoint);

    sliderValue.innerHTML = targetPoint;
    points[targetPoint].classList.add('slider__step-active');
    let currentPercent = (((targetPoint) / (this.steps - 1)) * 100) + '%';
    sliderThumb.style.left = currentPercent;
    sliderProgress.style.width = currentPercent;

    this.slider.dispatchEvent( new CustomEvent('slider-change', {
      detail: targetPoint,
      bubbles: true,
    }))
  }

  get elem() {
    return this.slider
  }
}
