import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
  }

  render() {
    this.container = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    this.innerContainer = this.container.querySelector('.products-grid__inner');
    this.renderProducts(this.products);
  }

  renderProducts(products) {
    this.innerContainer.innerHTML = '';
    
    products.forEach(product => {
      const productCard = new ProductCard(product);
      this.innerContainer.append(productCard.elem);
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) {
        return false
      };

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false
      };

      if (this.filters.maxSpiciness !== undefined && (product.spiciness > this.filters.maxSpiciness)) {
        return false
      };

      if (this.filters.category && (this.filters.category !== product.category)) {
        return false
      };

      return true
    })

    this.renderProducts(filteredProducts)
  }


  get elem() {
    return this.container
  }
}
