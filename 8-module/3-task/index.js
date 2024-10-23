export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

