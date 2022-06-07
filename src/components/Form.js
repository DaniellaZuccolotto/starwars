import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Form() {
  const { search, onChangeSearch } = useContext(PlanetsContext);

  return (
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
  );
}

export default Form;
