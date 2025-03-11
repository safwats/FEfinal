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
  const options = { method: "GET", 
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
      <p><strong>Pvm:</strong> ${entry.entry_Pvm}</p>
      <p><strong>Fiilis:</strong> ${entry.Fiilis}</p>
      <p><strong>Paino:</strong> ${entry.Paino} kg</p>
      <p><strong>Uni:</strong> ${entry.Uni_tuntia} tuntia</p>
      <p><strong>Huomio:</strong> ${entry.Huomio}</p>
    `;

    card.appendChild(cardImg);
    card.appendChild(cardDiary);
    diaryContainer.appendChild(card);
  });
};

export {getEntries};
