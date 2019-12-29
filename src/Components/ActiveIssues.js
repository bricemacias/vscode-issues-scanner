import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import axios from 'axios';

const moment = extendMoment(Moment);

const ActiveIssues = () => {
  const [range, setRange] = useState([
    moment('2018-01-23'),
    moment('2018-12-14')
  ]);
  const [data, setData] = useState([]);

  //fonction qui fetch la data pour chaque élément d'un range donné et qui retourne cette data
  // const fetchData = aRange => {
  //   const issuesNumber = [];
  //   const data = {};
  //   const range = moment.range(aRange[0], aRange[1]);
  //   const rangeObject = Array.from(range.by('months'));
  //   const rangeArray = rangeObject.map(m => m.format('YYYY-MM'));
  //   rangeArray.forEach(async el =>
  //     axios
  //       .get(
  //         `https://api.github.com/search/issues?q=repo:microsoft/vscode%20state:open%20created:${el}&per_page=1`,
  //         {
  //           headers: {
  //             Authorization: `Token a78c9527482b423d8c92e3b805bfe2081582daea`
  //           }
  //         }
  //       )
  //       .then(response => issuesNumber.push(response.data.total_count))
  //   );
  // };

  useEffect(() => {
    //faire le premier itération du set, avec la fonction au dessus
    const range1 = moment.range(range[0], range[1]);
    const rangeObject = Array.from(range1.by('months'));
    const rangeArray = rangeObject.map(m => m.format('YYYY-MM'));
    const issuesNumber = rangeArray.forEach(
      el =>
        axios
          .get(
            `https://api.github.com/search/issues?q=repo:microsoft/vscode%20state:open%20created:${el}&per_page=1`,
            {
              headers: {
                Authorization: `Token a78c9527482b423d8c92e3b805bfe2081582daea`
              }
            }
          )

          .then(response =>
            setData(data => [
              ...data,
              {
                x: moment(response.data.items[0].created_at).subtract(
                  1,
                  'months'
                ),
                y: response.data.total_count
              }
            ])
          )
      // .then(setData(data => data.sort((a, b) => b.x - a.x)))
      // .then(response =>
      //   setData([...data, (this.state.data[el] = response.data.total_count)])
      // )
    );
  }, []);

  return (
    <div>
      <h1 className="mb4"> Active Issues </h1>
      {/* <button
        onClick={() =>
          console.log(data.sort((a, b) => new Date(b.x) - new Date(a.x)))
        }
      >
        Click
      </button> */}
      <button onClick={() => console.log(data.sort((a, b) => b.x - a.x))}>
        Click
      </button>
      {!data ? (
        <p>Loading</p>
      ) : (
        <Line
          options={
            ({ responsive: true },
            {
              scales: {
                xAxes: [
                  {
                    type: 'time',
                    time: {
                      unit: 'month'
                    }
                  }
                ]
              }
            })
          }
          data={{
            datasets: [
              {
                label: 'Number of active issues',
                backgroundColor: 'rgba(255,0,255,0.75)',
                data: data.sort((a, b) => b.x - a.x)
                // [
                //   {
                //     x: moment(datax[0]),
                //     y: 17
                //   },
                //   {
                //     x: moment(datax[1]),
                //     y: 10
                //   }
                // ]
              }
            ]
          }}
        />
      )}
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     pageNumber: state.pageNumber,
//     issues: state.activeIssues
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onSetPage: number => dispatch(setPage(number)),
//     onNextPage: () => dispatch(nextPage()),
//     onRequestActiveIssues: (year, month) =>
//       dispatch(requestActiveIssues(year, month))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ActiveIssues);

export default ActiveIssues;
