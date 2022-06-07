import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import ResquestAPI from '../services/ResquestAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);

  const planetsApi = async () => {
    const retorno = await ResquestAPI();
    const planetsResidents = retorno.map((planets) => {
      if (delete planets.residents) {
        return planets;
      }
      return null;
    });
    setData(planetsResidents);
    setApiLoading(true);
  };

  useEffect(() => {
    planetsApi();
  }, []);

  const context = { data, setData };
  return (
    apiLoading && (
      <PlanetsContext.Provider value={ context }>
        {children}
      </PlanetsContext.Provider>
    )
  );
}

export default PlanetsProvider;
