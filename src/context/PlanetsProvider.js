import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import ResquestAPI from '../services/ResquestAPI';

function PlanetsProvider({ children }) {
  const allOptions = {
    population: 'population',
    orbital_period: 'orbital_period',
    diameter: 'diameter',
    rotation_period: 'rotation_period',
    surface_water: 'surface_water',
  };
  const [data, setData] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filter, setFilter] = useState([]);
  const [optionColumn, setOptionColumn] = useState(allOptions);
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

  const planetsFilter = (arrayFilter) => arrayFilter
    .reduce((acc, filterMap) => acc.filter((planets) => {
      switch (filterMap.comparison) {
      case 'maior que':
        return Number(planets[filterMap.column]) > filterMap.value;
      case 'menor que':
        return Number(planets[filterMap.column]) < filterMap.value;
      case 'igual a':
        return planets[filterMap.column] === filterMap.value;
      default:
        return '';
      }
    }), headerTable);

  // const listFilter = (column2, comparison2, value2) => {
  //   setFilter((prevState) => [...prevState, {
  //     column2,
  //     comparison2,
  //     value2,
  //   }]);
  // };

  const onClickFilterNumber = (objFilter) => {
    setSearch({
      ...search,
      filterByNumericValues: [{
        column,
        comparison,
        value }],
    });
    setFilter([...filter, objFilter]);
    setColumn('population');
    deleteOption();
    setData(planetsFilter([...filter, objFilter]));
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
    filter,
    setFilter,
    setOptionColumn,
    allOptions,
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
