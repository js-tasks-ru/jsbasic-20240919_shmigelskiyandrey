import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;
      
      this.elementTop = this.elem.getBoundingClientRect().top
      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let rightEdgeOfContainer = document.querySelector('.container').getBoundingClientRect().right

    if (!(window.scrollY > this.elementTop) || document.documentElement.clientWidth <= 767) {
      this.elem.style = 'position: absolute'
    } else if (document.documentElement.clientWidth - (rightEdgeOfContainer + 20) - this.elem.offsetWidth < 10) {
      this.elem.style = `position: fixed; top: 50px; z-index: 1000; left: ${document.documentElement.clientWidth - this.elem.offsetWidth - 10 + 'px'}`
    } else {
      this.elem.style = `position: fixed; top: 50px; z-index: 1000; left: ${rightEdgeOfContainer + 20 + 'px'}`
    }
   }
}
