import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repository, setRepository] = useState(["Conceitos ReactJS"]);

  useEffect( () => {
    api.get('/repositories').then( response => setRepository(response.data))
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "https://github.com/danilobandeira29/conceitos-NodeJS",
      techs: ["NodeJS", "ReactJS", "React Native"],
    })
    if(response.status === 200){
      const repos = response.data;

      setRepository([...repository, repos]);

    }
    
  }

  async function handleRemoveRepository(id) {

    const resp = await api.delete(`/repositories/${id}`)

    if(resp.status === 204){
      const response = repository.filter( repository => repository.id !== id )
    
      setRepository([...response]);
    }
   
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map( repository => <li key={[repository.id, repository.title]}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
