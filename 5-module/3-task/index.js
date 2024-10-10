function initCarousel() {
  const carouselContainer = document.querySelector('.carousel');
  const carousel = document.querySelector('.carousel__inner');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const width = carousel.offsetWidth;
  let currentPosition = 0;
  arrowLeft.style.display = 'none';

  carouselContainer.addEventListener('click', function(event) {
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
    currentPosition <= (-width * 3) ? arrowRight.style.display = 'none' : arrowRight.style.display = '';
  })
}