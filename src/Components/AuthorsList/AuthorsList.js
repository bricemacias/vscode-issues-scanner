import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthorElement from './AuthorElement';

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [isBroken, setIsBroken] = useState(0);

  // Permet de récupérer les issues les plus récentes, et pou chaque auteur, récupéré son nombre d'issues postées
  useEffect(() => {
    axios
      .get(
        `https://api.github.com/repositories/41881900/issues?page=${page}&per_page=10`
      )
      .then(response => {
        for (let el of response.data) {
          axios
            .get(
              `https://api.github.com/search/issues?q=author:${el.user.login}%20repo:microsoft/vscode%20type:issue&per_page=1`,
              {
                // Le token permet d'avoir un nombre de requêtes successives plus large et donc de surcharger l'API moins vite
                headers: {
                  Authorization: `Token a78c9527482b423d8c92e3b805bfe2081582daea`
                }
              }
            )
            .then(response => {
              if (!authors.includes(authors[el.user.login])) {
                setAuthors(authors => [
                  ...authors,
                  {
                    name: el.user.login,
                    numberOfIssues: response.data.total_count,
                    id: el.number
                  }
                ]);
              }
            })
            .catch(err => {
              console.log(err);
              setIsBroken(1);
            });
        }
      })
      .catch(err => {
        console.log(err);
        setIsBroken(1);
      });
  }, [page]);

  return (
    <div className="responsive-button-group">
      <h2>List of most recent authors</h2>
      <p className="f4">Sorted by number of issues posted</p>
      {!authors ? (
        <p>Loading...</p>
      ) : (
        <div>
          {isBroken ? (
            <div className="tc ba b--orange">
              <h3>{`Oops! Too many requests have been sent to the API, try again in 30 seconds ;)`}</h3>
            </div>
          ) : (
            <h4 className="ba b--grey">
              {`
              To avoid overloading the API, try to space your requests a few seconds apart. 
          
          `}
            </h4>
          )}
          {/* Permet de fitrer les doublons, de classer la liste par nombre d'issues postées, et de charger plus de résultats grâce au bouton Load More */}
          {authors
            .filter(
              (thing, index, self) =>
                self.findIndex(
                  t =>
                    t.name === thing.name &&
                    t.numberOfIssues === thing.numberOfIssues
                ) === index
            )
            .sort((a, b) => b.numberOfIssues - a.numberOfIssues)
            .map(el => {
              return (
                <AuthorElement
                  name={el.name}
                  number={el.numberOfIssues}
                  key={el.id}
                />
              );
            })}
        </div>
      )}
      <button
        className="responsive-button"
        onClick={() => setPage(page => page + 1)}
      >
        Load More
      </button>
    </div>
  );
};

export default AuthorsList;
