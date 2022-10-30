import Card from './UI/Card';

const Place = ({ place }) => {
  return (
    <Card>
      <div className="p-4">
        <p className="mb-2">Payload:</p>
        {place && <pre className="text-indigo-500">
          {`{
  nome: ${place.nome},
  email: ${place.email},
  telefone: ${place.telefone},
  cpf: ${place.cpf},
  destinos:\n
}
        `}
        </pre>}
      </div>
    </Card>
  );
};

export default Place;