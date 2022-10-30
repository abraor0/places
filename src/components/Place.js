import Card from './UI/Card';

const Place = ({ place }) => {
  return (
    <Card>
      <div>
        <p className="mb-2">Payload:</p>
        {place && <pre className="text-indigo-500">
          {`{
  nome: ${place.nome},
  email: ${place.email},
  telefone: ${place.telefone},
  cpf: ${place.cpf},
  pais: [
    ${place.pais.reduce((str, pais, index) => {
            if (index === 0) return str + '\'' + pais + '\',' + '\n';
            else return str + '\t' + '\'' + pais + '\',' + '\n';
          }, '')} ],
  cidade: [
    ${place.cidade.reduce((str, cidade, index) => {
            if (index === 0) return str + '\'' + cidade + '\',' + '\n';
            else return str + '\t' + '\'' + cidade + '\',' + '\n';
          }, '')} ]
}
        `}
        </pre>}
      </div>
    </Card>
  );
};

export default Place;