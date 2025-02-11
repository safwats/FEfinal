import {fetchData} from './fetch';

const getUsers = async () => {
  const url = 'http://localhost:3000/api/users';
  const users = await fetchData(url);

  if (users.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(users);

  const tableBody = document.querySelector('.tbody');
  tableBody.innerHTML = ''; //tyhjennetään taulukko

  // TODO, myöhemmin järkevä erotella omaksi funktiokseen
  users.forEach((user) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td><button class="check" data-id="${user.user_id}">Info</button></td>
        <td><button class="del" data-id="${user.user_id}">Delete</button></td>
        <td>${user.user_id}</td>
      `;

    tableBody.appendChild(row);
  });
};

// Get the snackbar DIV
const snackbar = document.getElementById('snackbar');

// Reusable function to show snackbar message
const showSnackbar = (message, type = '') => {
  snackbar.innerText = message;
  snackbar.className = `show ${type}`.trim(); // Add optional type class (e.g., 'error')

  setTimeout(() => {
    snackbar.className = snackbar.className.replace('show', '').trim();
  }, 3000);
};

const addUser = async (event) => {
  event.preventDefault();
  // POST
  //content-type: application/json

  // Haetaan formista oikea tieto mikä on täytetty .value
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  const email = document.querySelector('#email').value.trim();

  // const bodyData = {
  //   username: 'Uusi käyttäjä',
  //   password: 'salakala',
  //   email: 'newuser@example.com',
  // };

  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  // url
  const url = 'http://localhost:3000/api/users';

  // options eli mikä metodi, headers ja JSON
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  const response = await fetchData(url, options);

  if (response.error) {
    //alert('Sinun täytyy muistaa täyttää kaikki kentät!!');
    // On hyvä jättää oikea virhe ns. koodareille luettavaksi
    console.log(response.error);
    // Käyttäjän viesti!!
    showSnackbar(
      'Virhe lähettämisessä, täytä kaikki vaadittavat kentät!',
      'error',
    );
    return;
  }

  if (response.message) {
    //alert(response.message);
    console.log(response.message);
    showSnackbar('Onnistunut käyttäjän lisääminen :) 💕', 'success');
  }

  console.log(response);
  document.querySelector('.addform').reset(); // tyhjennetään formi
  getUsers();
};

// TODOO
// Tee tänne funktio joka hakee yksittäiset käyttäjän tiedot
// KÄytä tähän reittiä
// GET http://localhost:3000/api/users/:id

export {getUsers, addUser};
