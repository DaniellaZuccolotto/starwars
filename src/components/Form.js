import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Form() {
  const {
    setData,
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
  } = useContext(PlanetsContext);
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
    </main>
  );
}

export default Form;
