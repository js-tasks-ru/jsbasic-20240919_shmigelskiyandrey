/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows
    this.elem = document.createElement('table')

    this.createThead()
    this.createTbody()
    this.addListener()
  }

  createThead() {
    this.thead = document.createElement('thead')
    this.tr = document.createElement('tr')

    for (let elem in this.rows[0]) {
      let th = document.createElement('th')
      th.innerHTML = elem
      this.tr.appendChild(th)
    }
    this.tr.appendChild(document.createElement('th'))

    this.thead.appendChild(this.tr)
    this.elem.appendChild(this.thead)
  }

  createTbody() {
    this.tbody = document.createElement('tbody')

    for (let row in this.rows) {
      let tr = document.createElement('tr')

      for (let elem in this.rows[row]) {
        let td = document.createElement('td')
        td.innerHTML = this.rows[row][elem]
        tr.appendChild(td)
      }
      let btn = document.createElement('button')
      btn.innerHTML = 'X'

      let tdWithBtn = document.createElement('td')
      tdWithBtn.appendChild(btn)
      tr.appendChild(tdWithBtn)

      this.tbody.appendChild(tr)
    }

    this.elem.appendChild(this.tbody)
  }

  addListener() {
    this.elem.addEventListener('click', (event) => {
      let row = event.target.closest('tr')
      if (event.target.tagName == 'BUTTON') {
        row.remove()
      }
    })
  }
}
