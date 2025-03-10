// painoindeksiteidot 
const lowBMI = 'jos painoindeksi on alle 18,5, se merkitsee laihuutta. Sen syynä voi olla jokin pitkällinen saoraus tai laihuushäirö eli anoreksia. Jos paino muutamassa kuukaudessa on laskenut yli 20:n tasolta reilusti, on varminta mennä kääkriin jo painoindeksi lähestyessä 19:ää.';

const normalBmi = "normaaliksi on vaittu se painoindeksi alue, jossa ihimsen terveys on parhaimmillaan. Normaali painoindeksin alue on välillä 18,5-25. Jos painoindeksi on pienempi kuin 18,5 tai suurempi kuin 25, sairauksien vaara suurenee. Painoindeksiä voidaa käyttää 18 vuoden iästä lähtien.";

const highBmi = "kun painoindeksi ylittää 25, ollaan liikapainon puolella. Liikailojen määrä voi vaihdella erittäin paljon muutamasta kilosta moniin kymmeniin kiloihin. Siksi on hyödyllistä täsmentää, kuinka suuresta ylipainosta on kyse.";

const bmiForm = document.querySelector("form");
const weightInput = document.querySelector("#weight");
const heightInput = document.querySelector("#height");
const calculateButton = document.querySelector(".calculate");
const bmiScoreElment = document.querySelector(".bmi-score");
const analyysiElment = document.querySelector(".analysis");
const lowBMITbl = document.querySelector(".bmi0-19");

calculateButton.addEventListener("click", (evt) => {
    console.log("haetaan tiedot");
    evt.preventDefault();
    const weight = Number(weightInput.value);
    const height = Number(heightInput.value);
    console.log(weight, height);

    if (!weight || !height) {
        analyysiElment.innerText =
        "Katso tarkasti ja täydennä puuttuvat paino- tai pituustiedot 😅";
        // return poistuu koko funktion suorittamisesta
        return;
    }
    calculateBMI(weight, height);
});

function calculateBMI(weight, height) {
    const bmi = (weight / (height / 100) ** 2) . toFixed(1);
    bmiScoreElment.innerText = bmi;

    if (bmi < 18.5) {
        document.querySelector(".bmi0-19").classList.add("lowBmi");
        document.querySelector(".bmi19-25").classList.remove("normalBmi");
        document.querySelector(".bmi25-30").classList.remove("highBmi");
        analyysiElment.innerText = lowBMI;
    } else if (bmi > 25) {
        document.querySelector(".bmi0-19").classList.remove("lowBmi");
        document.querySelector(".bmi19-25").classList.remove("normalBmi");
        document.querySelector(".bmi25-30").classList.add("highBmi");
        analyysiElment.innerText = highBmi;
    } else {
        document.querySelector(".bmi0-19").classList.remove("lowBmi");
        document.querySelector(".bmi19-25").classList.add("normalBmi");
        document.querySelector(".bmi25-30").classList.remove("highBmi");
        analyysiElment.innerText = normalBmi;

    }
}
console.log(bmiForm);
function analyysi() {
    console.log("moro");
}

bmiForm.addEventListener("submit", analyysi);