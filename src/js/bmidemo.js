const lowBMI = 'Jos painoindeksi on alle 18,5, se merkitsee laihuutta. Sen syynä voi olla jokin pitkällinen sairaus tai laihuushäiriö eli anoreksia. Jos paino muutamassa kuukaudessa on laskenut yli 20:n tasolta reilusti, on varminta mennä lääkäriin jo painoindeksin lähestyessä 19:ää.';

const normalBmi = "Normaaliksi on valittu se painoindeksi alue, jossa ihmisen terveys on parhaimmillaan. Normaali painoindeksin alue on välillä 18,5-25. Jos painoindeksi on pienempi kuin 18,5 tai suurempi kuin 25, sairauksien vaara suurenee. Painoindeksiä voidaan käyttää 18 vuoden iästä lähtien.";

const highBmi = "Kun painoindeksi ylittää 25, ollaan liikapainon puolella. Liikakilojen määrä voi vaihdella erittäin paljon muutamasta kilosta moniin kymmeniin kiloihin. Siksi on hyödyllistä täsmentää, kuinka suuresta ylipainosta on kyse.";

// Odota, että dokumentti on täysin latautunut
document.addEventListener("DOMContentLoaded", function() {
  // Käytetään tarkempia valitsimia
  const bmiForm = document.querySelector(".card-bmi form");
  const weightInput = document.querySelector(".card-bmi #weight");
  const heightInput = document.querySelector(".card-bmi #height");
  const calculateButton = document.querySelector(".card-bmi .calculate");
  const bmiScoreElement = document.querySelector(".card-bmi .bmi-score");
  const analyysiElement = document.querySelector(".card-bmi .analysis");
  
  // Varmistetaan, että elementit löytyvät
  if (!bmiForm || !weightInput || !heightInput || !calculateButton || !bmiScoreElement || !analyysiElement) {
    console.error("BMI-laskurin elementtejä ei löytynyt!");
    return;
  }

  calculateButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    const weight = Number(weightInput.value);
    const height = Number(heightInput.value);
    
    if (!weight || !height) {
      analyysiElement.innerText = "Katso tarkasti ja täydennä puuttuvat paino- tai pituustiedot 😅";
      return;
    }
    calculateBMI(weight, height);
  });

  function calculateBMI(weight, height) {
    // Lasketaan BMI: paino (kg) / (pituus (m))²
    // Pituus muunnetaan senteistä metreiksi jakamalla 100:lla
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    bmiScoreElement.innerText = bmi;

    // Lisätään visuaalinen korostus oikealle riville
    const lowRow = document.querySelector(".card-bmi .bmi0-19");
    const normalRow = document.querySelector(".card-bmi .bmi19-25");
    const highRow = document.querySelector(".card-bmi .bmi25-30");
    
    // Poistetaan kaikki korostusluokat
    lowRow?.classList.remove("lowBmi");
    normalRow?.classList.remove("normalBmi");
    highRow?.classList.remove("highBmi");
    
    // Lisätään oikea korostus BMI-arvon perusteella
    if (bmi < 18.5) {
      lowRow?.classList.add("lowBmi");
      analyysiElement.innerText = lowBMI;
    } else if (bmi > 25) {
      highRow?.classList.add("highBmi");
      analyysiElement.innerText = highBmi;
    } else {
      normalRow?.classList.add("normalBmi");
      analyysiElement.innerText = normalBmi;
    }
  }

  // Lomake käsitellään jo klikkauksen yhteydessä
  bmiForm.addEventListener("submit", function(event) {
    event.preventDefault();
  });
});