import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import { connect } from 'react-redux';

import { requestLabelIssues, setPage, nextPage } from '../actions/actions';

const Labels = ({
  onRequestLabelIssues,
  onSetPage,
  onNextPage,
  pageNumber,
  issues
}) => {
  useEffect(() => {
    (async function fetchIssues() {
      await onRequestLabelIssues(pageNumber);
    })();
  }, [onRequestLabelIssues, pageNumber]);

  const labeledIssues = [];
  const labeledNumbers = [];

  return (
    <div>
      <h1 className="mb4"> Labels </h1>
      <button onClick={onNextPage}>Next Page</button>
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
                backgroundColor: 'rgba(255,0,255,0.75)',
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
    onRequestLabelIssues: page => dispatch(requestLabelIssues(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Labels);
