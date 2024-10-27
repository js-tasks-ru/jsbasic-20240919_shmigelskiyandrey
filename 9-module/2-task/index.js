import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(new Carousel(slides).elem);

    let ribbonHolder = document.querySelector('[data-ribbon-holder]');
    this.ribbonMenu = new RibbonMenu(categories);
    ribbonHolder.append(this.ribbonMenu.elem);

    let sliderHolder = document.querySelector('[data-slider-holder]');
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    sliderHolder.append(this.stepSlider.elem);

    let iconHolder = document.querySelector('[data-cart-icon-holder]');
    this.cartIcon = new CartIcon();
    iconHolder.append(this.cartIcon.elem);
    this.cart = new Cart(this.cartIcon);

    let gridHolder = document.querySelector('[data-products-grid-holder]');

    let response = await fetch('products.json');
    let data = await response.json();

    this.productsGrid = new ProductsGrid(data);
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    gridHolder.innerHTML = '';
    gridHolder.append(this.productsGrid.elem);

    document.body.addEventListener('product-add', (e) => {
      let product = this.productsGrid.products.find(el => el.id === e.detail);
      this.cart.addProduct(product);
    });

    document.body.addEventListener('slider-change', (e) => {
      this.productsGrid.updateFilter({ maxSpiciness: e.detail });
    });

    document.body.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({ category: e.detail });
    });

    document.body.addEventListener('change', (e) => {
      let target = e.target.closest('.filters__checkbox');
      
      if (!target) return

      if (e.target.id === 'nuts-checkbox') {
        this.productsGrid.updateFilter({
          noNuts: e.target.checked
        });
      };

      if (e.target.id === 'vegeterian-checkbox') {
        this.productsGrid.updateFilter({
          vegeterianOnly: e.target.checked
        });
      };
    });
  }
}
