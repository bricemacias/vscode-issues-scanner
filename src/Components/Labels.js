import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { connect } from 'react-redux';

import {
  requestLabelIssues,
  setPage,
  nextPage,
  previousPage
} from '../redux/actions/actions';
// Ce composant utilise redux pour la gestion d'état (même si ce n'est pas indispensable, c'est utile pour faire de la visualisation et pour conserver l'état lors de la navigation)

const Labels = ({
  onRequestLabelIssues,
  onSetPage,
  onNextPage,
  onPreviousPage,
  pageNumber,
  issues
}) => {
  // Etat et fonction permettant de choisir un numéro de page spécifique
  const [page, setPage] = useState(pageNumber);
  const handleChange = event => {
    setPage(event.target.value);
  };
  const handleClick = () => {
    if (page > 0 && page <= 44) onSetPage(page);
    else if (page <= 0) {
      onSetPage(1);
    } else if (page > 44) {
      onSetPage(44);
    } else {
      alert('Please, enter a valid number between 1 and 44');
    }
  };

  // Execute la fonction permettant de récupérer les données dès que le composant est monté ou que le numéro de la page est changé
  useEffect(() => {
    (async function fetchIssues() {
      await onRequestLabelIssues(pageNumber);
    })();
  }, [onRequestLabelIssues, pageNumber]);

  // Initialisation de vecteurs permettant de fournir les données au graphique
  const labeledIssues = [];
  const labeledNumbers = [];

  return (
    <div className="ml2 mr2">
      <h1 className="mb4"> Labels </h1>
      <div>
        <p>{`Issues are classified from the most recent date of creation, corresponding to No. 1, to the oldest. 

        Change page to load more results, and wait for the results to load.
        
        `}</p>
      </div>
      {/* Permet de choisir un numéro de page spécifique*/}
      <div className="page-elements">
        <input
          className="ba b--near-white bg-white pagebox"
          type="search"
          placeholder="Enter Page Number"
          onChange={handleChange}
        />
        <button className="page-button" type="submit" onClick={handleClick}>
          {' '}
          Set Page
        </button>
      </div>
      <br />
      <div className="page-number ml2">
        <p>
          <strong>Page Number : </strong>
          {pageNumber}
        </p>
      </div>
      {pageNumber === 1 ? (
        <div className="responsive-button-group ma1">
          <button className="responsive-button" onClick={onNextPage}>
            Next Page
          </button>
        </div>
      ) : pageNumber > 1 && pageNumber < 44 ? (
        <div className="responsive-button-group ma1">
          <button className="responsive-button" onClick={onPreviousPage}>
            Previous Page
          </button>
          <button className="responsive-button" onClick={onNextPage}>
            Next Page
          </button>
        </div>
      ) : (
        <div className="responsive-button-group ma1">
          <button className="responsive-button" onClick={onPreviousPage}>
            Previous Page
          </button>
        </div>
      )}

      {!issues ? (
        <p>Loading</p>
      ) : (
        (issues.forEach(el => labeledIssues.push(el.labels.length)),
        issues.forEach(el =>
          labeledNumbers.push((pageNumber - 1) * 100 + issues.indexOf(el))
        ))
      )}

      {!labeledIssues && !labeledNumbers ? (
        <p>Loading</p>
      ) : (
        <Bar
          options={{ responsive: true }}
          data={{
            labels: [...labeledNumbers],
            datasets: [
              {
                label: 'Number of labels for each issue',
                backgroundColor: 'rgba(255,0,255,0.70)',
                data: [...labeledIssues]
              }
            ]
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    pageNumber: state.pageNumber,
    issues: state.labelIssues
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetPage: number => dispatch(setPage(number)),
    onNextPage: () => dispatch(nextPage()),
    onPreviousPage: () => dispatch(previousPage()),
    onRequestLabelIssues: page => dispatch(requestLabelIssues(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Labels);
