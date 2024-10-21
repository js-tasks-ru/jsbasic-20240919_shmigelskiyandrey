import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.container = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.categories.map((el) => (
            `<a  href="#" class="ribbon__item" data-id=${el.id}>${el.name}</a>`
          )).join('')}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
    this.scrollRibbon();
    this.selectItem();
  }

  scrollRibbon() {
    this.arrowRight = this.container.querySelector('.ribbon__arrow_right');
    this.arrowLeft = this.container.querySelector('.ribbon__arrow_left');
    this.ribbonInner = this.container.querySelector('.ribbon__inner');

    this.ribbonInner.addEventListener('scroll', () => {
      this.toggleArrows();
    })

    this.container.addEventListener('click', (e) => {
      const target = e.target.closest('BUTTON');

      if (target == this.arrowRight) {
        this.ribbonInner.scrollBy(350, 0);
      };

      if (target == this.arrowLeft) {
        this.ribbonInner.scrollBy(-350, 0);
      };
    });
  }

  toggleArrows() {
    let scrollLeft = this.ribbonInner.scrollLeft;
    let scrollRight = this.ribbonInner.scrollWidth - scrollLeft - this.ribbonInner.clientWidth;

    scrollLeft < 1 ? 
      this.arrowLeft.classList.remove('ribbon__arrow_visible') : 
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    
    scrollRight < 1 ?
      this.arrowRight.classList.remove('ribbon__arrow_visible') : 
      this.arrowRight.classList.add('ribbon__arrow_visible');
  }

  selectItem() {
    this.allItems = [...this.container.querySelectorAll('.ribbon__item')];
    this.container.querySelector('.ribbon__item').classList.add('ribbon__item_active');

    this.container.addEventListener('ribbon-select', () => {});

    this.container.addEventListener('click', (e) => {
      const target = e.target.closest('A');

      if (!target) return;

      e.preventDefault();
      this.allItems.map((item) => item.classList.remove('ribbon__item_active'));
      target.classList.add('ribbon__item_active');

      this.container.dispatchEvent( new CustomEvent('ribbon-select', {
        detail: target.dataset.id,
        bubbles: true,
      }))
    })
  }

  get elem() {
    return this.container
  }
}
