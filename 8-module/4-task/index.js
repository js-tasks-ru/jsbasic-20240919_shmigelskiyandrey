import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return
    };

    let item = this.cartItems.find(item => item.product.id === product.id);

    if (item == undefined) {
      this.cartItems.push({product, count: 1})
    } else {
      item.count++
    };

    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    let item = this.cartItems.find(item => item.product.id === productId);

    item.count += amount;

    this.cartItems = this.cartItems.filter(item => item.count !== 0);

    this.onProductUpdate(item);
  }

  isEmpty() {
    return this.cartItems.length === 0
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.product.price * item.count, 0)
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    let body = createElement(`<div></div>`);
    this.cartItems.forEach(item => body.append(this.renderProduct(item.product, item.count)));
    body.append(this.renderOrderForm());
    this.modal.setBody(body)

    this.modal.open()

    this.modalWindow = document.querySelector('.modal')
    let cartForm = document.querySelector('.cart-form')

    this.modalWindow.addEventListener('click', e => {
      let target = e.target.closest('.cart-counter__button');

      if (!target) { return }
      let productId = target.closest('.cart-product').dataset.productId;

      if (target.classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(productId, -1);
      };

      if (target.classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(productId, 1);
      };
    });

    cartForm.addEventListener('submit', e => {
      e.preventDefault();
      this.onSubmit(e); 
    })
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let productCount = this.modalWindow.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = this.modalWindow.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = this.modalWindow.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.cartItems.reduce((totalPrice, item) => totalPrice + item.product.price * item.count, 0).toFixed(2)}`

      if (this.isEmpty()) {
        this.modal.close()
      }
    };

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let submitButton = document.querySelector('[type="submit"]');
    submitButton.classList.add('is-loading');
    let form = document.querySelector('.cart-form')

    fetch('https://httpbin.org/post', {
      method: "POST",
      body: new FormData(form)
    }).then((response) => {
      if (response.ok) {
        this.modal.setTitle('Success!');
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modal.setBody(createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `));
      };})
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

