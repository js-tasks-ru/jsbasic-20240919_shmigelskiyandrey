import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.container = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `)
    this.closeByButton();
    this.closeByEsc();
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.container);
  }

  setTitle(modalTitle) {
    this.container.querySelector('.modal__title').innerHTML = modalTitle;
  }

  setBody(modalBody) {
    this.container.querySelector('.modal__body').innerHTML = '';
    this.container.querySelector('.modal__body').append(modalBody);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.container.remove();

    document.onkeydown = null
  }

  closeByButton() {
    this.container.addEventListener('click', (e) => {
      let target = e.target.closest('.modal__close');

      if (!target) return

      this.close();
    })
  }

  closeByEsc() {
    function keyDownClose(e) {
      if (e.code === 'Escape') {
        console.log(this)
        this.close();
      }
    }

    let keyDownCloseBinded = keyDownClose.bind(this); 
    
    document.onkeydown = function (e) { keyDownCloseBinded(e) }
  }
}

