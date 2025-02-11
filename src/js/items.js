import {fetchData} from './fetch';

// Oman rajapinnan kutsu
// const getItems = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/api/items');
//     console.log(response);
//     const data = await response.json();
//     console.log('Haetaan omasta rajapinnasta items!');
//     console.log(data);
//     data.forEach((element) => {
//       // Jokainen rivi
//       //console.log(element);
//       // jokaisen rivin yksittäiset tiedot
//       console.log(element.name);
//     });
//   } catch (error) {
//     console.error('Virhe:', error);
//   }
// };

const getItems = async () => {
  const url = 'http://localhost:3000/api/items';
  const items = await fetchData(url);

  if (items.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(items);
};

export {getItems};
