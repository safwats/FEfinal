console.log('Moro maailma scriptit alkaa');

function synchronousFunction() {
  let number = 1;
  for (let i = 1; i < 10000; i++) {
    number += i;
    console.log('synchronousFunction running');
  }
  console.log('regular function complete', number);
}

function synchronousFunction2() {
  console.log('Mikä kesti nii kauan????');
}

//synchronousFunction();
//synchronousFunction2();

// tehdään http pyyntö
// fetch('https://api.restful-api.dev/objects')
//   .then((response) => {
//     console.log(response);
//     if (!response.ok) {
//       throw new Error('Verkkovastaus ei ollut kunnossa');
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error('Fetch-operaatiossa ilmeni ongelma:', error);
//   });

// Tehdään hieman modernimpi tapa hakea rajapintakutsuja
// async function getData() {
const getData = async () => {
  try {
    // tehdään pyyntö HTTP GET
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    console.log(response);
    // muunnetaan json muotoon
    const data = await response.json();
    console.log(data);
    console.log(data.value);
  } catch (error) {
    console.error('Virhe:', error);
  }
};

export {getData};
