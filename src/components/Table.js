import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Form.css';

function Table() {
  const { data, search, headerTable } = useContext(PlanetsContext);

  const createLink = (linkList, string) => (linkList.map((link, index) => (
    <a href={ link } key={ `${string}-${index}` } className="table-film-display">
      {`${link.split('/')[5]}º`}
    </a>
  )));

  const formatedDisplayDate = (info) => {
    const date = info.split('.')[0].split('T');
    return `${date[0].replace('-', '/').replace('-', '/')} at ${date[1]}`;
  };

  return (
    <div className="table-container">
      <table className="table table-dark">
        <thead className="thead-dark">
          <tr>
            {Object.keys(headerTable[0])
              .map((planets, i) => <th key={ i }>{planets}</th>)}
          </tr>
        </thead>
        <tbody>
          {data
            .filter((planet) => planet.name.includes(search.filterByName.name))
            .map((planets, i) => (
              <tr key={ i }>
                <td data-testid="planet-name">{planets.name}</td>
                <td>{planets.rotation_period}</td>
                <td>{planets.orbital_period}</td>
                <td>{planets.diameter}</td>
                <td>{planets.climate}</td>
                <td>{planets.gravity}</td>
                <td>{planets.terrain}</td>
                <td>{planets.surface_water}</td>
                <td>{planets.population}</td>
                <td>{ createLink(planets.films, 'film') }</td>
                <td>{ formatedDisplayDate(planets.created) }</td>
                <td>{ formatedDisplayDate(planets.edited) }</td>
                <td><a href={ planets.url }>Link</a></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
