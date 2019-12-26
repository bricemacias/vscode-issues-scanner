import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import { connect } from 'react-redux';

import { requestIssues, setPage, nextPage } from '../actions/actions';

function Label({ onRequestIssues, onSetPage, onNextPage, pageNumber, issues }) {
  useEffect(() => {
    (async function fetchIssues() {
      await onRequestIssues(pageNumber);
    })();
  }, [onRequestIssues, pageNumber]);

  const labeledIssues = [];
  const labeledNames = [];
  const labeledNumbers = [];

  return (
    <div>
      <button onClick={onNextPage}>Next Page</button>
      <p>{issues.total_count}</p>
      {!issues ? (
        <p>Loading</p>
      ) : (
        issues.forEach(el => labeledIssues.push(el.labels.length)) &
        issues.forEach(el =>
          labeledNumbers.push((pageNumber - 1) * 100 + issues.indexOf(el))
        )
      )}
      {!labeledIssues && !labeledNames ? (
        <p>Loading</p>
      ) : (
        <Bar
          options={{ responsive: true }}
          data={{
            labels: [...labeledNumbers],
            datasets: [
              {
                label: 'Number of labels for each issue',
                backgroundColor: 'rgba(255,0,255,0.75)',
                data: [...labeledIssues]
              }
            ]
          }}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    pageNumber: state.pageNumber,
    issues: state.issues
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetPage: number => dispatch(setPage(number)),
    onNextPage: () => dispatch(nextPage()),
    onRequestIssues: page => dispatch(requestIssues(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Label);
