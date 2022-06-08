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
  const [ordemColumn, setOrdemColumn] = useState({
    order: { column: 'population', sort: 'ASC' } });
  const [search, setSearch] = useState(
    {
      filterByName: { name: '' },
    },
  );

  const deleteOption = () => {
    const optionDelete = optionColumn;
    delete optionDelete[column];
    setOptionColumn(optionDelete);
  };

  const orderInitial = (retorno) => {
    const newArray = [];
    const array = retorno.map((planets) => planets.name);
    array.sort();
    array.forEach((names) => {
      retorno.forEach((planets) => {
        if (planets.name === names) {
          newArray.push(planets);
        }
      });
    });
    return newArray;
  };

  const planetsApi = async () => {
    const retorno = await ResquestAPI();
    retorno.map((planets) => delete planets.residents);
    setHeaderTable(retorno);
    setData(orderInitial(retorno));
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

  const onClickFilterNumber = (objFilter) => {
    setFilter([...filter, objFilter]);
    setColumn('population');
    deleteOption();
    setData(planetsFilter([...filter, objFilter]));
  };

  useEffect(() => {
    planetsApi();
  }, []);

  const context = {
    data,
    setData,
    search,
    setSearch,
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
    setOrdemColumn,
    ordemColumn,
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
