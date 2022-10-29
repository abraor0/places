import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAvailableCountriesAndCities } from '../apis';

const Form = () => {
  const { register, handleSubmit, watch } = useForm();
  const [countriesList, setCountriesList] = useState();
  const selectedCountry = watch('pais');

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getAvailableCountriesAndCities();
      setCountriesList(countries);
    }
    fetchCountries();
  }, []);

  let filteredCities = [], mappedCities = [];
  if (countriesList && selectedCountry) {
    filteredCities = countriesList.find(country => country.code === selectedCountry).cities?.sort((a, b) => a.name.localeCompare(b.name));
    mappedCities = filteredCities.map(({ country_code, name, id }) => <option key={id} value={country_code}>{name}</option>);
  }

  return (
    <form action="#" method="POST">
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('nome')}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                id="email-address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('email')}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="text"
                id="telephone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('telefone')}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('cpf')}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                País
              </label>
              <select
                disabled={!countriesList}
                id="country"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register('pais')}
              >
                {countriesList && countriesList.map(({ code, name, index }) => <option key={code} selected={index === 0} value={code}>{name}</option>)}
              </select>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Cidade
              </label>
              <select
                disabled={!selectedCountry || filteredCities.length === 0}
                id="city"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register('cidade')}
              >
                {mappedCities}
              </select>
            </div>

          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;