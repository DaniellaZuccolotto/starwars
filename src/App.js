import React from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <div className="main">
        <Form />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
