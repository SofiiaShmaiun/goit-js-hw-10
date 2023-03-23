import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('input#search-box');
const countryInfo = document.querySelector('.country-info');
const countryListInfo = document.querySelector('.country-list');

function createInfoMarkup(countryName) {
  for (const country of countryName) {
    return `
    <div class="header-group">
      <div class="flag-image">
        <img src="${country.flags.svg}" alt="${
      country.flags.alt
    }" width=45, height=30>
      </div>
      <h2 class="country-name">${country.name.official}</h2>
    </div>
    <p class="info-item">Capital: ${country.capital}</p>
    <p class="info-item">Population: ${country.population}</p>
    <p class="info-item">Language: ${Object.values(country.languages).join(', ')}</p>`;
  }
}

function createListMarkup(countryName) {
  return countryName
    .map(
      country =>
        `<li class = "country-list-item">
          <div class="header-group">
            <div class="flag-image">
              <img src="${country.flags.svg}" alt="${country.flags.alt}" width=36, height=24>
            </div>
            <h2 class="country-name">${country.name.common}</h2> 
          </div>
        </li>`
    )
    .join('');
}

countryInput.addEventListener(
  'input',
  debounce(handleCountrySearching, DEBOUNCE_DELAY)
);

function handleCountrySearching(event) {
  if (event.target.value.trim()) {
    fetchCountries(`${event.target.value.trim()}`)
      .then(country => {
        if (country.length > 10) {
          countryInfo.innerHTML = '';
          countryListInfo.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (country.length < 10 && country.length > 2) {
          countryInfo.innerHTML = '';
          countryListInfo.innerHTML = createListMarkup(country);
        } else if (country.length === 1) {
          countryListInfo.innerHTML = '';
          countryInfo.innerHTML = createInfoMarkup(country);
        } else if (country.status === 404) {
          countryInfo.innerHTML = '';
          countryListInfo.innerHTML = '';
          Notiflix.Notify.failure('Oops, there is no country with that name');
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else if (event.target.value.trim() === '') {
    countryInfo.innerHTML = '';
    countryListInfo.innerHTML = '';
  }
}
