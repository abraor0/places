import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAvailableCountriesAndCities } from '../apis';
import { cityValidation, countryValidation, cpfValidation, emailValidation, nameValidation, telephoneValidation } from '../validations';
import { formatPhone, formatCPF } from '../utils';
import Card from './UI/Card';

const PlacesForm = ({ addPlace }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      pais: ['BR'],
      cidade: []
    }
  });
  const { ref: telRef, onChange: telOnChange, onBlur: telOnBlur, name: telName } = register('telefone', { onChange: telephoneInputHandler, ...telephoneValidation });
  const { ref: cpfRef, onChange: cpfOnChange, onBlur: cpfOnBlur, name: cpfName } = register('cpf', { onChange: cpfInputHandler, ...cpfValidation });
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
    let foundCounter = 0;
    for (let country of countriesList) {
      if (selectedCountry.find(selectedCountryCode => selectedCountryCode === country.code)) {
        filteredCities.push(...country.cities);
        ++foundCounter;
      }
      if (foundCounter === selectedCountry.length) break;
    }
    filteredCities.sort((a, b) => a.name.localeCompare(b.name));
    mappedCities = filteredCities.map(({ country_code, name, id }) => <option key={id} value={`${name}/${country_code}`}>{name}</option>);
  }

  const submitHandler = ({ nome, email, cpf, telefone, cidade, pais }) => {
    const countryCityList = pais.reduce((list, country) => {

    }, []);
    console.log(cidade);

    addPlace({
      nome,
      email,
      cpf,
      telefone,
      cidade,
      pais
    });
  };

  function telephoneInputHandler(e) {
    const formattedPhone = formatPhone(e.currentTarget.value);
    e.currentTarget.value = formattedPhone;
  };

  function cpfInputHandler(e) {
    const formattedCPF = formatCPF(e.currentTarget.value);
    e.currentTarget.value = formattedCPF;
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card className="overflow-hidden shadow sm:rounded-md">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('nome', nameValidation)}
            />
            <p className="text-xs text-red-500 mt-1">{errors.nome?.message}</p>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email-address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('email', emailValidation)}
            />
            <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              id="telephone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ref={telRef}
              name={telName}
              onBlur={telOnBlur}
              onChange={telOnChange}
            />
            <p className="text-xs text-red-500 mt-1">{errors.telefone?.message}</p>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ref={cpfRef}
              name={cpfName}
              onBlur={cpfOnBlur}
              onChange={cpfOnChange}
            />
            <p className="text-xs text-red-500 mt-1">{errors.cpf?.message}</p>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              País
            </label>
            <select
              multiple
              disabled={!countriesList}
              id="country"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              {...register('pais', countryValidation)}
            >
              {countriesList && countriesList.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
            </select>
            <p className="text-xs text-red-500 mt-1">{errors.pais?.message}</p>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              Cidade
            </label>
            <select
              disabled={!countriesList && selectedCountry && !selectedCountry?.length === 0}
              multiple
              id="city"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              {...register('cidade', cityValidation)}
            >
              {mappedCities}
            </select>
            <p className="text-xs text-red-500 mt-1">{errors.cidade?.message}</p>
          </div>

        </div>
        <div className="bg-gray-50 pt-4 text-right">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Enviar
          </button>
        </div>
      </Card>
    </form >
  );
};

export default PlacesForm;