import '../css/style.css';
import '../css/snackbar.css';
import {getItems} from './items.js';
import {getUsers, addUser} from './users.js';
import {getData} from './test.js';

document.querySelector('#app').innerHTML = 'Moi tässä oman APIn harjoituksia';

getData();

// TODO: tehkää getData funktiosta oma test.js tiedosto!!

// haetaan GET all items nappi ja tehdään rajapintahaku
const getItemBtn = document.querySelector('.get_items');
getItemBtn.addEventListener('click', getItems);
//getItems();

const getUserBtn = document.querySelector('.get_users');
getUserBtn.addEventListener('click', getUsers);

const addUserForm = document.querySelector('.formpost');
addUserForm.addEventListener('click', addUser);
