import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Form() {
  const {
    search,
    onChangeSearch,
    column,
    setColumn,
    comparison,
    setComparison,
    setValue,
    value,
    onClickFilterNumber,
  } = useContext(PlanetsContext);

  return (
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
        onClick={ onClickFilterNumber }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Form;
