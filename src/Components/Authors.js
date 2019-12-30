import React, { useState } from 'react';
import axios from 'axios';

const Authors = () => {
  const [searchName, setSearchName] = useState('');
  const [fetchedName, setFetchedName] = useState('');

  const handleChange = event => {
    setSearchName(event.target.value);
  };

  // On lance la recherche de l'auteur correspondant lorsque l'on clique sur le bouton
  const handleClick = () => {
    axios
      .get(
        `https://api.github.com/search/issues?q=author:${searchName}%20repo:microsoft/vscode%20type:issue&per_page=1`
      )
      .then(response => {
        if (response.data.total_count === 0) {
          setFetchedName({
            name: searchName,
            data: `Sorry, this user didn't post any issue on this repository`
          });
        } else {
          setFetchedName({ name: searchName, data: response.data });
        }
      })
      .catch(err => {
        setFetchedName({
          name: searchName,
          data: `Sorry, this user didn't post any issue on this repository`
        });
      });
  };
  return (
    <div>
      <h1 className="pb3">Search authors by name</h1>
      <div className="pa3 ma1 search-elements">
        {/* Input permettant de faire la recherche */}
        <input
          className="ba b--near-white bg-white searchbox"
          type="search"
          placeholder="Search Authors"
          value={searchName}
          onChange={handleChange}
        />
        <button className="search-button" type="submit" onClick={handleClick}>
          {' '}
          Search
        </button>
      </div>
      {/* Si l'utilisateur a déposé au moins une issue, son nom et le nombre d'issues total postées par lui apparaitra ici*/}
      <div className="mb4">
        {fetchedName.data ===
        `Sorry, this user didn't post any issue on this repository` ? (
          <p className="ml3">{fetchedName.data}</p>
        ) : fetchedName ? (
          <p className="ml3">
            <strong>{fetchedName.name}</strong>
            {`: ${fetchedName.data.total_count} issues opened by this user in this repository`}
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Authors;
