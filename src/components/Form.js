import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Form() {
  const {
    setData,
    data,
    search,
    onChangeSearch,
    column,
    setColumn,
    comparison,
    setComparison,
    setValue,
    value,
    onClickFilterNumber,
    optionColumn,
    filter,
    setFilter,
    planetsFilter,
    setOptionColumn,
    allOptions,
    setOrdemColumn,
    ordemColumn,
  } = useContext(PlanetsContext);

  const functionSortPopulation = (columnOrder, sortOrder) => {
    const arraySort = [];
    const arrayUnknown = [];
    const newArray = [];
    data.forEach((planets) => {
      if (planets[columnOrder] !== 'unknown') {
        arraySort.push(planets[columnOrder]);
      } else {
        arrayUnknown.push(planets);
      }
    });
    if (sortOrder === 'ASC') {
      arraySort.sort((a, b) => a - b);
    }
    if (sortOrder === 'DESC') {
      arraySort.sort((a, b) => b - a);
    }
    arraySort.forEach((population) => {
      data.forEach((planets) => {
        if (planets[columnOrder] === population) {
          newArray.push(planets);
        }
      });
    });
    const newArrayCompleto = [...newArray, ...arrayUnknown];
    setData(newArrayCompleto);
  };

  const functionSort = (columnOrder, sortOrder) => {
    // const arraySort = [];
    const newArray = [];
    const array = data.map((planets) => planets[columnOrder]);
    if (sortOrder === 'ASC') {
      array.sort((a, b) => a - b);
    }
    if (sortOrder === 'DESC') {
      array.sort((a, b) => b - a);
    }
    array.forEach((filterOrder) => {
      data.forEach((planets) => {
        if (planets[columnOrder] === filterOrder) {
          newArray.push(planets);
        }
      });
    });
    setData(newArray);
  };

  return (
    <main>
      <form>
        <label htmlFor="input-filter">
          Pesquise aqui:
          <input
            data-testid="name-filter"
            type="text"
            id="input-filter"
            name="search"
            value={ search.filterByName.name }
            onChange={ onChangeSearch }
          />
        </label>
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => { setColumn(target.value); } }
          value={ column }
        >
          {
            Object.keys(optionColumn).map((option, i) => (
              <option value={ option } key={ i }>{option}</option>))
          }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => { setComparison(target.value); } }
          value={ comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="number-filter">
          Digite um numero:
          <input
            data-testid="value-filter"
            type="number"
            id="number-filter"
            name="search"
            value={ value }
            onChange={ ({ target }) => { setValue(target.value); } }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            const objFilter = { column, comparison, value };
            onClickFilterNumber(objFilter);
          } }
        >
          Filtrar
        </button>
      </form>
      <ul>
        {
          filter.map((filtro, i) => (
            <li key={ i } data-testid="filter">
              {`${filtro.column}, ${filtro.comparison}, ${filtro.value}`}
              <button
                type="button"
                onClick={ () => {
                  const newFilter = filter.filter((_, index) => index !== i);
                  setFilter(newFilter);
                  setData(planetsFilter(newFilter));
                  setOptionColumn({
                    ...optionColumn,
                    [filtro.column]: [filtro.column],
                  });
                } }
              >
                Delete
              </button>
            </li>))
        }
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setFilter([]);
            setData(planetsFilter([]));
            setOptionColumn(allOptions);
          } }
        >
          Delete All Filter
        </button>
      </ul>
      <form>
        <select
          data-testid="column-sort"
          onChange={ ({ target }) => {
            setOrdemColumn({
              ...ordemColumn,
              order: {
                ...ordemColumn.order,
                column: target.value,
              },
            });
          } }
          value={ ordemColumn.order.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="input-radio">
          Ascendente
          <input
            id="input-radio"
            data-testid="column-sort-input-asc"
            type="radio"
            name="order"
            value="ASC"
            onChange={ ({ target }) => {
              setOrdemColumn({
                ...ordemColumn,
                order: {
                  ...ordemColumn.order,
                  sort: target.value,
                },
              });
            } }
          />
        </label>
        <label htmlFor="input-radio2">
          Descendente
          <input
            id="input-radio2"
            data-testid="column-sort-input-desc"
            type="radio"
            name="order"
            value="DESC"
            onChange={ ({ target }) => {
              console.log(target.value);
              setOrdemColumn({
                ...ordemColumn,
                order: {
                  ...ordemColumn.order,
                  sort: target.value,
                },
              });
            } }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => {
            if (ordemColumn.order.column === 'population'
                || ordemColumn.order.column === 'surface_water') {
              functionSortPopulation(ordemColumn.order.column, ordemColumn.order.sort);
            } else {
              functionSort(ordemColumn.order.column, ordemColumn.order.sort);
            }
          } }
        >
          Ordenar
        </button>
      </form>
    </main>
  );
}

export default Form;
