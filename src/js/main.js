import '../css/style.css';
import '../css/snackbar.css';
import {getItems} from './items.js';
import {getUsers, addUser} from './users.js';
import {getData} from './test.js';
import {getEntries} from './entries.js';


function logout() {
    localStorage.removeItem("token"); // Poistetaan token
    localStorage.removeItem("nimi"); // Poistetaan käyttäjänimi
    window.location.href = "../index.html"; // Ohjaa kirjautumissivulle
}

// Määritä logout() globaaliksi
window.logout = logout;



document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (token) {

        document.getElementById("kirjaudu-ulos").style.display = "block"; // Näytä "Kirjaudu ulos"
    }
  });

document.querySelector('#app').innerHTML = `Welcome to our website ${localStorage.getItem('nimi')}`;

getData();

document.addEventListener("DOMContentLoaded", function () {
    const makeNewEntry = document.querySelector('#create_entry');

    makeNewEntry.addEventListener('click', function () {
        // Haetaan lomake ja tarkistetaan, onko se olemassa
        const form = document.querySelector(".luo.merkintä");
        if (!form) return;

        // Haetaan lomakkeen syötteet
        const inputs = form.querySelectorAll("input");
        const date = inputs[0].value;
        const feeling = inputs[1].value;
        const weight = inputs[2].value;
        const sleep = inputs[3].value;
        const note = inputs[4].value;

        // Piilotetaan vain lomake
        form.style.display = "none";

        // Haetaan päiväkirjaosio
        const diarySection = document.getElementById("diary");

        // Luodaan uusi päiväkirjamerkintä
        const diaryEntry = document.createElement("div");
        diaryEntry.classList.add("card");
        diaryEntry.innerHTML = `
            <div class="card-diary">
                <h2>Päiväkirjamerkintä</h2>
                <p><strong>Pvm:</strong> ${date}</p>
                <p><strong>Fiilis:</strong> ${feeling}</p>
                <p><strong>Paino:</strong> ${weight} kg</p>
                <p><strong>Uni:</strong> ${sleep} tuntia</p>
                <p><strong>Huomio:</strong> ${note}</p>
            </div>
        `;

        // Lisätään päiväkirjamerkintä näkyviin
        diarySection.appendChild(diaryEntry);
    });
});




const getItemBtn = document.querySelector('.get_items');
getItemBtn.addEventListener('click', getItems);

const getUserBtn = document.querySelector('.get_users');
getUserBtn.addEventListener('click', getUsers);

const addUserForm = document.querySelector('.formpost');
addUserForm.addEventListener('click', addUser);

const getEntriesBtn = document.querySelector('.get_entries');
getEntriesBtn.addEventListener('click', getEntries);

// BMI-laskurin toiminnallisuus
const lowBMI = 'Jos painoindeksi on alle 18,5, se merkitsee laihuutta...';
const normalBmi = "Normaaliksi on valittu se painoindeksialue, jossa...";
const highBmi = "Kun painoindeksi ylittää 25, ollaan liikapainon puolella...";

const bmiForm = document.querySelector("form");
const weightInput = document.querySelector("#weight");
const heightInput = document.querySelector("#height");
const calculateButton = document.querySelector(".calculate");
const bmiScoreElment = document.querySelector(".bmi-score");
const analyysiElment = document.querySelector(".analysis");

calculateButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    const weight = Number(weightInput.value);
    const height = Number(heightInput.value);

    if (!weight || !height) {
        analyysiElment.innerText = "Täytä puuttuvat tiedot!";
        return;
    }
    calculateBMI(weight, height);
});

function calculateBMI(weight, height) {
    const bmi = (weight / (height / 100) ** 2).toFixed(1);
    bmiScoreElment.innerText = bmi;

    if (bmi < 18.5) {
        analyysiElment.innerText = lowBMI;
    } else if (bmi > 25) {
        analyysiElment.innerText = highBmi;
    } else {
        analyysiElment.innerText = normalBmi;
    }
}


console.log(token["token"])