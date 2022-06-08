import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import ResquestAPI from '../services/ResquestAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [optionColumn, setOptionColumn] = useState({
    population: 'population',
    orbital_period: 'orbital_period',
    diameter: 'diameter',
    rotation_period: 'rotation_period',
    surface_water: 'surface_water',
  });
  const [search, setSearch] = useState(
    {
      filterByName: { name: '' },
      filterByNumericValues: [{
        column: 'population',
        comparison: 'maior que',
        value: 0 }],
    },
  );

  const deleteOption = () => {
    const optionDelete = optionColumn;
    delete optionDelete[column];
    setOptionColumn(optionDelete);
  };

  const planetsApi = async () => {
    const retorno = await ResquestAPI();
    retorno.map((planets) => delete planets.residents);
    setData(retorno);
    setHeaderTable(retorno);
    setApiLoading(true);
  };

  const onChangeSearch = ({ target }) => {
    setSearch({
      ...search,
      filterByName: { name: target.value },
    });
  };

  const planetsFilter = (buttonFilter) => {
    if (buttonFilter) {
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
    });
    setData(planetsFilter(true));
    deleteOption();
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
    headerTable,
    optionColumn,
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
