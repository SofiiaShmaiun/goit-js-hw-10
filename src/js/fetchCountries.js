const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTRATION_FIELDS = '?fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${FILTRATION_FIELDS}`).then(response => {
    return response.json();
  });
}

export { fetchCountries };
