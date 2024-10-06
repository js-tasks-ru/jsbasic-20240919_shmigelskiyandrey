function makeFriendsList(friends) {
  const listItems = friends.map(friend => (friend.firstName + ' ' + friend.lastName));
  const list = document.createElement('ul')

  for (let li of listItems) {
    const item = document.createElement('li')
    item.innerHTML = li
    list.appendChild(item)
  }
  
  return list
}
