import {fetchData} from './fetch';

/**
 * Muotoilee ISO-päivämäärän luettavampaan muotoon
 */
const formatDate = (dateStr) => {
  if (!dateStr) return 'Tuntematon';
  
  try {
    // Oletetaan että päivämäärä on ISO-muodossa (2025-03-14) tai MySQL timestamp
    const date = new Date(dateStr);
    
    if (isNaN(date.getTime())) {
      return dateStr; // Jos ei voida jäsentää, palautetaan alkuperäinen
    }
    
    return date.toLocaleDateString('fi-FI');
  } catch (error) {
    console.error('Virhe päivämäärän muotoilussa:', error);
    return dateStr;
  }
};

/**
 * Hakee merkinnät API:sta ja näyttää ne vasemmalla puolella
 */
const getEntries = async () => {
  console.log('Haetaan merkintöjä...');

  // Haetaan alue johon luodaan kortit
  const diaryContainer = document.getElementById('diary-entries');
  
  // Näytetään latausviesti
  diaryContainer.innerHTML = '<p class="loading">Ladataan merkintöjä...</p>';
  
  // Haetaan token ja luodaan API-kutsu
  const token = localStorage.getItem("token");
  const url = 'http://127.0.0.1:3000/api/entries';
  const options = { 
    method: "GET", 
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  
  try {
    const response = await fetchData(url, options);

    if (response.error) {
      console.log('Tapahtui virhe merkintöjen haussa!');
      diaryContainer.innerHTML = '<p class="error">Virhe merkintöjen haussa. Yritä uudelleen.</p>';
      return;
    }

    // Varmistetaan että vastaus on array
    // Jos vastaus on objekti, oletetaan että se sisältää entryt arrayna
    let entries = [];
    if (Array.isArray(response)) {
      entries = response;
    } else if (response && typeof response === 'object') {
      // Jos vastaus on objekti mutta ei array, koitetaan löytää siitä array
      // Etsitään objektista ensimmäinen array-tyyppinen arvo
      const arrayProperties = Object.values(response).filter(val => Array.isArray(val));
      if (arrayProperties.length > 0) {
        entries = arrayProperties[0];
      } else {
        // Jos vastauksessa ei ole array-kenttää, käsitellään se yhtenä merkintänä
        entries = [response];
      }
    }

    // Tyhjennetään container
    diaryContainer.innerHTML = '';
    
    // Jos ei merkintöjä, näytetään ilmoitus
    if (entries.length === 0) {
      diaryContainer.innerHTML = '<p class="no-entries">Ei merkintöjä. Lisää ensimmäinen merkintäsi oikealta.</p>';
      return;
    }
    
    // Luodaan kortit jokaiselle merkinnälle
    entries.forEach((entry, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-entry-id', entry.id || index);

      const cardImg = document.createElement('div');
      cardImg.classList.add('card-img');

      const img = document.createElement('img');
      img.src = '/img/notebook.jpg';
      img.alt = 'Päiväkirjamerkintä';
      cardImg.appendChild(img);

      const cardDiary = document.createElement('div');
      cardDiary.classList.add('card-diary');
      
      // Luodaan sisältö merkinnälle, varmistetaan että arvot ovat olemassa
      cardDiary.innerHTML = `
        <p><strong>Pvm:</strong> ${formatDate(entry.entry_Pvm)}</p>
        <p><strong>Fiilis:</strong> ${entry.Fiilis || 'Ei määritelty'}</p>
        <p><strong>Paino:</strong> ${entry.Paino ? entry.Paino + ' kg' : 'Ei määritelty'}</p>
        <p><strong>Uni:</strong> ${entry.Uni_tuntia ? entry.Uni_tuntia + ' tuntia' : 'Ei määritelty'}</p>
        <p><strong>Huomio:</strong> ${entry.Huomio || 'Ei huomioita'}</p>
      `;
      
      // Lisätään poisto-painike
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-entry');
      deleteButton.textContent = 'Poista';
      deleteButton.addEventListener('click', () => deleteEntry(entry.id || index));
      
      cardDiary.appendChild(deleteButton);
      card.appendChild(cardImg);
      card.appendChild(cardDiary);
      diaryContainer.appendChild(card);
    });
    
  } catch (error) {
    console.error('Virhe merkintöjen hakemisessa:', error);
    diaryContainer.innerHTML = '<p class="error">Virhe merkintöjen haussa. Yritä uudelleen.</p>';
  }
};

/**
 * Luo uuden merkinnän ja lähettää sen API:iin
 */
const createEntry = async (event) => {
  event.preventDefault();
  
  // Haetaan formin tiedot
  const entryForm = document.getElementById('entry-form');
  const dateInput = entryForm.querySelector('input[name="entry_date"]');
  const feelingInput = entryForm.querySelector('input[name="feeling"]');
  const weightInput = entryForm.querySelector('input[name="weight"]');
  const sleepInput = entryForm.querySelector('input[name="sleep"]');
  const noteInput = entryForm.querySelector('input[name="note"]');
  
  // Varmistetaan että tarvittavat tiedot on annettu
  if (!dateInput.value || !feelingInput.value) {
    showMessage('Päivämäärä ja fiilis ovat pakollisia tietoja!', 'error');
    return;
  }
  
  // Luodaan lähetettävä data tietokannan sarakerakenteen mukaisesti
  const entryData = {
    entry_Pvm: dateInput.value,         // Käytetään entry_Pvm (ei entry_date)
    Fiilis: feelingInput.value,         // Käytetään Fiilis (ei mood)
    Paino: weightInput.value ? parseFloat(weightInput.value) : null,  // Käytetään Paino (ei weight)
    Uni_tuntia: sleepInput.value ? parseFloat(sleepInput.value) : null, // Käytetään Uni_tuntia (ei sleep_hours)
    Huomio: noteInput.value || ''       // Käytetään Huomio (ei notes)
  };
  
  // Haetaan token
  const token = localStorage.getItem("token");
  if (!token) {
    showMessage('Et ole kirjautunut sisään!', 'error');
    return;
  }
  
  // Luodaan API-kutsu
  const url = 'http://127.0.0.1:3000/api/entries';
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Varmistetaan oikea kirjoitusasu
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(entryData)
  };
  
  console.log('Lähetetään data:', JSON.stringify(entryData));
  
  try {
    console.log('Lähetetään pyyntö URL:iin:', url);
    const response = await fetchData(url, options);
    console.log('Vastaus palvelimelta:', response);
    
    // Käsitellään virheet selkeämmin
    try {
      handleApiResponse(response);
    } catch (error) {
      console.error('Virhe merkinnän luomisessa:', error.message);
      showMessage('Virhe merkinnän luomisessa! ' + error.message, 'error');
      return;
    }
    
    // Näytetään onnistumisviesti
    showMessage('Merkintä luotu onnistuneesti!', 'success');
    
    // Tyhjennetään formi
    entryForm.reset();
    
    // Asetetaan päivämääräkenttään uudelleen tämä päivä
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    
    // Haetaan merkinnät uudelleen
    getEntries();
    
  } catch (error) {
    console.error('Virhe merkinnän luomisessa:', error);
    showMessage('Virhe merkinnän luomisessa: ' + (error.message || 'Tuntematon virhe'), 'error');
  }
};

/**
 * Poistaa merkinnän API:sta
 */
const deleteEntry = async (entryId) => {
  if (!confirm('Haluatko varmasti poistaa tämän merkinnän?')) {
    return;
  }
  
  // Haetaan token
  const token = localStorage.getItem("token");
  if (!token) {
    showMessage('Et ole kirjautunut sisään!', 'error');
    return;
  }
  
  // Luodaan API-kutsu
  const url = `http://127.0.0.1:3000/api/entries/${entryId}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  try {
    const response = await fetchData(url, options);
    
    if (response.error) {
      console.error('Virhe merkinnän poistamisessa:', response.error);
      showMessage('Virhe merkinnän poistamisessa! ' + response.error, 'error');
      return;
    }
    
    // Näytetään onnistumisviesti
    showMessage('Merkintä poistettu onnistuneesti!', 'success');
    
    // Haetaan merkinnät uudelleen
    getEntries();
    
  } catch (error) {
    console.error('Virhe merkinnän poistamisessa:', error);
    showMessage('Virhe merkinnän poistamisessa!', 'error');
  }
};

/**
 * Näyttää viestin käyttäjälle
 */
const showMessage = (message, type = 'info') => {
  console.log(`[${type}] ${message}`); // Lokitetaan myös konsoliin
  
  // Tarkistetaan löytyykö snackbar
  const snackbar = document.getElementById('snackbar');
  if (snackbar) {
    snackbar.innerText = message;
    snackbar.className = `show ${type}`;
    setTimeout(() => {
      snackbar.className = snackbar.className.replace('show', '').trim();
    }, 3000);
  } else {
    // Jos snackbaria ei löydy, käytetään alertia
    alert(message);
  }
};

/**
 * Korjausfunktio fetch.js:n virheistä palautumiseksi
 * Jos fetchData palauttaa {error: "viesti"}, tämä funktio tekee siitä Error-olion
 */
const handleApiResponse = (response) => {
  if (response && response.error) {
    throw new Error(response.error);
  }
  return response;
};

/**
 * Alustaa lomakkeen ja tapahtumankuuntelijat
 */
const initEntryForm = () => {
  // Haetaan elementit
  const entryForm = document.getElementById('entry-form');
  const getEntriesBtn = document.querySelector('.get_entries');
  
  // Jos elementit löytyvät, lisätään tapahtumankuuntelijat
  if (entryForm) {
    entryForm.addEventListener('submit', createEntry);
    
    // Lisätään debug-toiminto lomakkeelle
    const debugButton = document.createElement('button');
    debugButton.type = 'button';
    debugButton.textContent = 'Näytä/piilota debug-tiedot';
    debugButton.style.marginTop = '10px';
    debugButton.style.backgroundColor = '#f0f0f0';
    debugButton.style.color = '#333';
    
    debugButton.addEventListener('click', (e) => {
      e.preventDefault();
      const debugDiv = document.getElementById('form-debug');
      if (debugDiv) {
        debugDiv.style.display = debugDiv.style.display === 'none' ? 'block' : 'none';
        
        // Näytetään nykyiset lomakekentät
        if (debugDiv.style.display === 'block') {
          const debugInfo = document.getElementById('debug-info');
          const formData = {
            entry_Pvm: document.querySelector('input[name="entry_date"]').value,
            Fiilis: document.querySelector('input[name="feeling"]').value,
            Paino: document.querySelector('input[name="weight"]').value,
            Uni_tuntia: document.querySelector('input[name="sleep"]').value,
            Huomio: document.querySelector('input[name="note"]').value
          };
          
          debugInfo.textContent = JSON.stringify(formData, null, 2);
        }
      }
    });
    
    entryForm.appendChild(debugButton);
  }
  
  if (getEntriesBtn) {
    getEntriesBtn.addEventListener('click', getEntries);
  }
  
  // Asetetaan päivämääräkenttään oletuksena tämä päivä
  const dateInput = document.querySelector('input[name="entry_date"]');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initEntryForm();
  
  // Jos kirjautunut, haetaan merkinnät automaattisesti
  if (localStorage.getItem('token')) {
    getEntries();
  }
});

export {getEntries, createEntry, deleteEntry};