const generalTextInputValidation = {
  required: 'Campo obrigatório',
  setValueAs: name => name.trim(),
}

export const nameValidation = {
  ...generalTextInputValidation,
  maxLength: {
    value: 50, message: 'Campo limitado a 50 caracteres'
  },
  validate: name => /^[A-Za-z\u00C0-\u00FF]+((\s)?([A-Za-z\u00C0-\u00FF])+)*$/.test(name) || 'Apenas letras e um espaço entre cada nome são permitidos'
};

export const emailValidation = {
  ...generalTextInputValidation,
  validate: email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || 'Email inválido'
};

export const telephoneValidation = {
  ...generalTextInputValidation,
  validate: telefone => /^\([\d]{2}\) 9?[\d]{4}-[\d]{4}$/.test(telefone) || 'Telefone inválido'
};

export const cpfValidation = {
  ...generalTextInputValidation,
  validate: cpf => /\d{3}\.\d{3}\.\d{3}\-\d{2}/.test(cpf) || 'CPF inválido'
}

export const countryValidation = {
  required: 'Campo obrigatório',
  validate: countryArr => countryArr.length > 0
}

export const cityValidation = {
  required: 'Campo obrigatório',
  validate: cityArr => cityArr.length > 0
}