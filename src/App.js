import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(repositories => {
      setRepositories(repositories.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', { 
      title: "Desafio React", 
      url: "https://github.com/tspimentel", 
      techs: ["Node JS", "React JS", "Angular", "React Native", "Express", "TypeScript" ]
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const filteredRepositories = repositories.filter((repository) => { return repository.id !== id } );
    setRepositories(filteredRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repositorie)=>{
            return(
              <li key={repositorie.id}>
                {repositorie.title}
                <button onClick={() => handleRemoveRepository(repositorie.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
