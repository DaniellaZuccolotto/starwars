import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import ResquestAPI from '../services/ResquestAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [search, setSearch] = useState(
    {
      filterByName: {
        name: '',
      },
    },
  );

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

  const onChangeSearch = ({ target }) => {
    setSearch({
      ...search,
      filterByName: { name: target.value },
    });
  };

  useEffect(() => {
    planetsApi();
  }, []);

  const context = { data, setData, search, onChangeSearch };
  return (
    apiLoading && (
      <PlanetsContext.Provider value={ context }>
        {children}
      </PlanetsContext.Provider>
    )
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsProvider;
