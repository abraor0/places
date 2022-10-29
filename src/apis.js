export async function getCountries() {
  const resp = await fetch('https://amazon-api.sellead.com/country');
  let data = await resp.json();
  data = data.map(({ code, name_ptbr }) => ({ code, name: name_ptbr, cities: [] }));
  data.sort((a, b) => a.name.localeCompare(b.name, 'br'));

  return data;
}

export async function getCities() {
  const resp = await fetch('https://amazon-api.sellead.com/city');
  let data = await resp.json();
  data = data.map(({ country_code, name_ptbr, id, url1 }) => ({ country_code, name: name_ptbr, id, photo: url1 }));

  return data;
}

export async function getAvailableCountriesAndCities() {
  const countries = await getCountries();
  const cities = await getCities();

  cities.forEach(city => {
    let cityCountry = countries.find(country => country.code === city.country_code);
    if (!city.name || city.name === cityCountry.name) return;
    cityCountry.cities.push(city);
  });

  return countries;
}