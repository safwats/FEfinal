import {fetchData} from './fetch';

const getItems = async () => {
  const url = ' http://127.0.0.1:3000/api/items';
  const items = await fetchData(url);

  if (items.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }
  console.log(items);
};

export {getItems};
