// users fetching
const table = document.querySelector('.users__table');
const tableBody = table.querySelector('.table__body');
const loader = document.createElement('div');
loader.classList.add('loading-spinner');
table.append(loader);
const users = fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((data) => {
    const usersLength = Math.floor(Math.random() * 10); // random max size for filtering
    const localStorageData = JSON.parse(localStorage.getItem('users')) || {};
    Object.keys(localStorageData).forEach((key) => {
      data.push(localStorageData[key]);
    });
    if (table) {
      table.removeChild(loader);
      data
        .filter((user) => user.id > usersLength)
        .forEach((user) => {
          if (tableBody) {
            tableBody.innerHTML += `
              <tr class="table__row">
                <td class="table__cell table__data">${user.name}</td>
                <td class="table__cell table__data">${user.email}</td>
                <td class="table__cell table__data">${user.phone}</td>
                <td class="table__cell table__data"><a href="https://${user.website}">${user.website}</a></td>
              </tr>
          `;
          }
        });
    }
  })
  .catch((e) => {
    const main = document.querySelector('.main');
    main.innerHTML = `<div class="error">Увы, ошибка! ${e}</div>`;
  });

// add user form
const form = document.forms.addUser;
form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  console.log('submitted');
  const nameInput = form.elements.name;
  const emailInput = form.elements.email;
  const phoneInput = form.elements.phone;
  const websiteInput = form.elements.website;
  if (tableBody) {
    const user = {
      id: Math.floor(Math.random() * 100 + 10),
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      website: websiteInput.value,
    };
    tableBody.innerHTML += `
      <tr class="table__row">
        <td class="table__cell table__data">${user.name}</td>
        <td class="table__cell table__data">${user.email}</td>
        <td class="table__cell table__data">${user.phone}</td>
        <td class="table__cell table__data"><a href="https://${user.website}">${user.website}</a></td>
      </tr>
    `;
    const localStorageData = JSON.parse(localStorage.getItem('users')) || {};
    localStorageData[user.email] = user;
    localStorage.setItem('users', JSON.stringify(localStorageData));
    console.log(JSON.parse(localStorage.getItem('users')));
  }
}
