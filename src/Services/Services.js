const fetchAPI = async () => {
  const urlApi = 'https://economia.awesomeapi.com.br/json/all';
  const currencies = await fetch(urlApi);
  const data = await currencies.json();
  return data;
};

export default fetchAPI;
