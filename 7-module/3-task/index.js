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

    this.sliderSteps = this.slider.querySelector('.slider__steps')
    for (let i = 0; i < this.steps; i++) {
      this.sliderSteps.append(document.createElement('span'))
    }
    this.sliderSteps.querySelector('span').classList.add('slider__step-active')
    this.clickListener()
  }

  clickListener() {
    this.slider.addEventListener('slider-change', () => {});

    this.slider.addEventListener('click', e => {
      let points = [...this.sliderSteps.querySelectorAll('span')];
      let pointsXCordinates = points.map(point => point.getBoundingClientRect().x);
      let sliderValue = this.slider.querySelector('.slider__value');
      let sliderThumb = this.slider.querySelector('.slider__thumb');
      let sliderProgress = this.slider.querySelector('.slider__progress')

      points.map(el => el.classList.remove('slider__step-active'));

      let distance = pointsXCordinates.map(el => (el - e.clientX));
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
    })
  }



  get elem() {
    return this.slider
  }
}
