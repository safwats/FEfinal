import {fetchData} from './fetch';

const getEntries = async () => {
  console.log('Moikka, maailma');
  console.log('Haetaan paikallisesta tiedostosta');

  // haetaan alue joho luodaan kortit
  const diaryContainer = document.getElementById('diary');
  console.log(diaryContainer);

  // haetaan data joko json tai fetch rajapinnasta
  const token = localStorage.getItem ("token");
  const url = 'http://127.0.0.1:3000/api/entries';
  const options = 
  { method: "GET", 
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`
  }
  }
  
  const response = await fetchData(url, options);

  if (response.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(response);

  // looppi jossa luodaan yksittäiset kortit
  diaryContainer.innerHTML = '';
  response.forEach((entry) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardImg = document.createElement('div');
    cardImg.classList.add('card-img');

    const img = document.createElement('img');
    img.src = '/img/notebook.jpg';
    img.alt = 'Diary Image';
    cardImg.appendChild(img);

    const cardDiary = document.createElement('div');
    cardDiary.classList.add('card-diary');
    cardDiary.innerHTML = `
     <div class="card-diary">
      <h2>Päiväkirjamerkintä</h2>
      <p><strong>Pvm:</strong> ${entry.entry_Pvm}</p>
      <p><strong>Fiilis:</strong> ${entry.Fiilis}</p>
      <p><strong>Paino:</strong> ${entry.Paino} kg</p>
      <p><strong>Uni:</strong> ${entry.Uni_tuntia} tuntia</p>
      <p><strong>Huomio:</strong> ${entry.Huomio}</p>
     </div> 
    `;

    card.appendChild(cardImg);
    card.appendChild(cardDiary);
    diaryContainer.appendChild(card);
  });
};


const addEntry = async (date, feeling, weight, sleep, note) => {
  console.log('Lisätään uusi merkintä');

  const token = localStorage.getItem("token");
  const url = 'http://127.0.0.1:3000/api/entries';
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ 
      entry_Pvm: date, 
      Fiilis: feeling, 
      Paino: weight, 
      Uni_tuntia: sleep, 
      Huomio: note 
    })
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.log('Virhe merkinnän lisäyksessä');
    return;
  }

  console.log('Merkintä lisätty onnistuneesti!');
  getEntries(); // Päivitetään lista uusilla tiedoilla
};

const createEntryButton = document.getElementById("create_entry");
if (createEntryButton) {
    createEntryButton.addEventListener("click", function() {
        const form = document.querySelector(".luo.merkintä");
        if (!form) return;

        const inputs = form.querySelectorAll("input");
        const date = inputs[0].value;
        const feeling = inputs[1].value;
        const weight = inputs[2].value;
        const sleep = inputs[3].value;
        const note = inputs[4].value;

        form.style.display = "none"; // Piilotetaan lomake
        addEntry(date, feeling, weight, sleep, note);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".luo.merkintä"); // Haetaan lomake

  if (form) {
      form.addEventListener("submit", function (event) {
          event.preventDefault(); // Estetään sivun uudelleenlataus

          console.log("Hae-nappia painettu!"); // Testataan, että event toimii

          // Haetaan käyttäjän syöttämät arvot
          const inputs = form.querySelectorAll("input");
          const date = inputs[0].value;
          const feeling = inputs[1].value;
          const weight = inputs[2].value;
          const sleep = inputs[3].value;
          const note = inputs[4].value;

          console.log("Syötetyt tiedot:", { date, feeling, weight, sleep, note });

          // Piilotetaan lomake
          form.style.display = "none";

          // Kutsutaan addEntry-funktiota, jos se on jo olemassa
          if (typeof addEntry === "function") {
              addEntry(date, feeling, weight, sleep, note);
          }
      });
  }
});



export {getEntries};
