import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import axios from 'axios';

const moment = extendMoment(Moment);

const ActiveIssues = () => {
  const [range, setRange] = useState([moment('2019-01'), moment('2019-12')]);
  const [data, setData] = useState([]);
  const [isBroken, setIsBroken] = useState(0);

  useEffect(() => {
    const rangeMoment = moment.range(range[0], range[1]);
    const rangeObject = Array.from(rangeMoment.by('months'));
    const rangeArray = rangeObject.map(m => m.format('YYYY-MM'));
    for (let el of rangeArray) {
      if (isBroken === 1) {
        console.log('BONJOUUUUUR');
        break;
      } else if (isBroken === 0) {
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
          .catch(err => {
            setIsBroken(1);
          });
      }
    }
  }, []);

  return (
    <div>
      <h1 className="mb4"> Active Issues </h1>
      {isBroken ? (
        <div>
          <alert>{`Oups ! Trop de requêtes on été envoyées à l'API, réessayer dans 1 minute ;)`}</alert>
        </div>
      ) : (
        <p>
          Afin d'éviter de surcharger l'API, essayer d'espacer vos requêtes de
          quelques secondes
        </p>
      )}
      <br />
      <button onClick={() => console.log(isBroken)}>Click</button>
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
                backgroundColor: 'rgba(0, 255 ,255,0.60)',
                data: data.sort((a, b) => b.x - a.x)
              }
            ]
          }}
        />
      )}
    </div>
  );
};

export default ActiveIssues;
