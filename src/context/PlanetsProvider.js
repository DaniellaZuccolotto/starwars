import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import ResquestAPI from '../services/ResquestAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState(
    {
      filterByName: { name: '' },
      filterByNumericValues: [{
        column: 'population',
        comparison: 'maior que',
        value: 0 }],
      buttonFilter: false,
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

  const planetsFilter = () => {
    if (search.buttonFilter) {
      return data.filter((planets) => {
        switch (comparison) {
        case 'maior que':
          return Number(planets[column]) > value;
        case 'menor que':
          return Number(planets[column]) < value;
        case 'igual a':
          return planets[column] === value;
        default:
          return '';
        }
      });
    }
    return data;
  };

  const onClickFilterNumber = () => {
    setSearch({
      ...search,
      filterByNumericValues: [{
        column,
        comparison,
        value }],
      buttonFilter: true,
    });
  };

  useEffect(() => {
    planetsApi();
  }, []);

  const context = { data,
    setData,
    search,
    onChangeSearch,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    onClickFilterNumber,
    planetsFilter,
  };
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
