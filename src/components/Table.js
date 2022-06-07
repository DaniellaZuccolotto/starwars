import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, search, planetsFilter } = useContext(PlanetsContext);
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((planets, i) => <th key={ i }>{planets}</th>)}
        </tr>
      </thead>
      <tbody>
        {planetsFilter()
          .filter((planet) => planet.name.includes(search.filterByName.name))
          .map((planets, i) => (
            <tr key={ i }>
              <td>{planets.name}</td>
              <td>{planets.rotation_period}</td>
              <td>{planets.orbital_period}</td>
              <td>{planets.diameter}</td>
              <td>{planets.climate}</td>
              <td>{planets.gravity}</td>
              <td>{planets.terrain}</td>
              <td>{planets.surface_water}</td>
              <td>{planets.population}</td>
              <td>{planets.films}</td>
              <td>{planets.created}</td>
              <td>{planets.edited}</td>
              <td>{planets.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
