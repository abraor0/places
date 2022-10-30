import { useState } from 'react';
import Place from './components/Place';
import PlacesForm from './components/PlacesForm';

function App() {
  const [place, setPlace] = useState();

  const addPlace = place => setPlace(place);

  return (
    <div className=" bg-gray-100">
      <div className="h-screen pt-10 px-3 sm:px-6">
        <div className="mb-10 sm:px-0 text-center">
          <h1 className="text-3xl md:text-4xl font-bold leading-6 text-indigo-500">Places</h1>
          <p className="mt-1 text-base md:text-lg text-gray-700">Salves seus destinos de interesse.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 self">
            <PlacesForm addPlace={addPlace} />
          </div>
          <div className="lg:col-span-1 lg:-order-1 ">
            <Place place={place} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;