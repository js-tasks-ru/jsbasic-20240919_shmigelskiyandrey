function highlight(table) {
  const rows = table.tBodies[0].rows

  for (let row of rows) {
    const status = row.cells[3].getAttribute('data-available')
    const gender = row.cells[2].innerHTML
    const age = row.cells[1].innerHTML

    switch (status) {
      case 'true':
        row.classList.add('available');
        break;
      case 'false':
        row.classList.add('unavailable');
        break;
      default:
        row.hidden = true;
    }

    switch (gender) {
      case 'm':
        row.classList.add('male');
        break;
      case 'f':
        row.classList.add('female');
        break;
    }

    if (age < 18) {
      row.style="text-decoration: line-through"
    }
  }
}
