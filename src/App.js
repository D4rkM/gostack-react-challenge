import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(({data}) => {
        console.log(data)
      setRepositories(data)
    })
  }, [], handleRemoveRepository)

  async function handleAddRepository() {
    const { data } = await api.post('/repositories', {
      title: `back-repository`,
      url: 'http://gihub.com/',
      techs: ['nodeJS', 'typescript']
    });
    setRepositories([ ...repositories, data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(prevState => (prevState.filter(repository => repository.id !== id)))
  }

  return (
    <>
    <h1>Repositories</h1>
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (  
          <li key={repository.id} id={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
    </>
  );
}

export default App;
