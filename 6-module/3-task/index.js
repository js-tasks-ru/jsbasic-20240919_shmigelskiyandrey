import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.container = createElement(`
        <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
          </div>
        </div>
    `)
    
    this.addSlides()
    this.addScrolling()
    this.eventListener()
  }

  addSlides() {
    let carouselInner = createElement(`<div class="carousel__inner"></div>`)

    this.slides.map(slide => {
      let element = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `)
      carouselInner.append(element)
    })

    this.container.append(carouselInner)
  }

  addScrolling() {
    const carousel = this.container.querySelector('.carousel__inner');
    const arrowRight = this.container.querySelector('.carousel__arrow_right');
    const arrowLeft = this.container.querySelector('.carousel__arrow_left');
    const numberOfSlides = this.slides.length;
    let currentPosition = 0;
    arrowLeft.style.display = 'none';

    this.container.addEventListener('click', function(event) {
      const width = carousel.offsetWidth;
      let target = event.target.closest('.carousel__arrow');

      if (!target) return;

      switch (target) {
        case arrowRight :
          currentPosition -= width;
          carousel.style.transform = `translateX(${currentPosition}px)`;
          break;

        case arrowLeft :
          currentPosition += width;
          carousel.style.transform = `translateX(${currentPosition}px)`;
          break;
      }

      currentPosition == 0 ? arrowLeft.style.display = 'none' : arrowLeft.style.display = '';
      currentPosition <= (-width * (numberOfSlides - 1)) ? arrowRight.style.display = 'none' : arrowRight.style.display = '';
    })
  }

  eventListener() {
    this.container.addEventListener('product-add', () => {})

    this.container.addEventListener('click', (event) => {
      let target = event.target.closest('.carousel__button');

      if (!target) return;

      this.container.dispatchEvent( new CustomEvent('product-add', {
        detail: target.closest('.carousel__slide').dataset.id,
        bubbles: true,
      }))
    })
  }

  get elem() {
    return this.container
  }
}
