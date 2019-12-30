import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Authors = () => {
  const [searchName, setSearchName] = useState('');
  const [fetchedName, setFetchedName] = useState('');

  const handleChange = event => {
    setSearchName(event.target.value);
  };
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
      <div className="pa3 ma1">
        <input
          className="ba br3 b--near-white bg-white"
          type="search"
          placeholder="Search Authors"
          value={searchName}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleClick}>
          {' '}
          Search
        </button>
      </div>
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
