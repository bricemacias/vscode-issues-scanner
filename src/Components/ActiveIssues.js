import React, { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import DatePicker from 'react-datepicker';

import axios from 'axios';

const moment = extendMoment(Moment);

const ActiveIssues = () => {
  // Les différents states et leurs fonctions
  const [isBroken, setIsBroken] = useState(0);
  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState(new Date('2019/12/1'));
  const [endDate, setEndDate] = useState(new Date('2019/12/13'));
  const [dateType, setDateType] = useState('day');

  // La fonction permettant de récupérer les données de l'API et de les stocker dans data
  const fetchData = (aStartDate, aEndDate, aDateType, format) => {
    const rangeMoment = moment.range(moment(aStartDate), moment(aEndDate));
    const rangeObject = Array.from(rangeMoment.by(aDateType));
    const rangeArray = rangeObject.map(m => m.format(format));
    console.log(rangeObject);
    console.log(rangeArray);

    for (let el of rangeArray) {
      axios
        .get(
          `https://api.github.com/search/issues?q=repo:microsoft/vscode%20state:open%20created:${el}&per_page=1`,
          {
            // Le token permet d'avoir un nombre de requêtes successives plus large et donc de surcharger l'API moins vite
            headers: {
              Authorization: `Token a78c9527482b423d8c92e3b805bfe2081582daea`
            }
          }
        )
        .then(response =>
          setData(data => [
            ...data,
            {
              x: moment(el),
              y: response.data.total_count
            }
          ])
        )
        .catch(err => {
          setIsBroken(1);
        });
    }
  };

  // Permet de lancer lancer la fonction fetchData dès que le composant est monté ou que les dates de début et de fin sont changées. Il règle également le type d'unité utilisé (jours, mois, années) en fonction de la taille de l'espacement entre les dates demandées
  useEffect(() => {
    setData([]);
    setIsBroken(0);
    const rangeMoment = moment.range(moment(startDate), moment(endDate));
    const rangeInDays = Array.from(rangeMoment.by('days'));
    const daysNumber = rangeInDays.length;
    console.log(daysNumber);
    if (daysNumber <= 29) {
      setDateType('day');
      fetchData(startDate, endDate, `days`, 'YYYY-MM-DD');
    } else if (daysNumber > 29 && daysNumber < 730) {
      setDateType('month');
      fetchData(startDate, endDate, `months`, 'YYYY-MM');
    } else if (daysNumber >= 730) {
      setDateType('year');
      fetchData(startDate, endDate, `years`, 'YYYY');
    }
  }, [startDate, endDate]);

  // Rendu
  return (
    <div>
      <h1 className="mb4"> Active Issues </h1>
      {isBroken ? (
        <div className="tc ba b--orange">
          <h3>{`Oops! Too many requests have been sent to the API, try again in 30 seconds ;)`}</h3>
        </div>
      ) : (
        <p>
          {`To avoid overloading the API, try to space your requests a few seconds apart. 
          
          For values greater than 30 days, the scale is displayed in months, and for values greater than two months, it is displayed in years.`}
        </p>
      )}
      <br />
      <h3>Select the desired time interval</h3>
      <DatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date);
          setEndDate(date);
        }}
        dateFormat="dd/MM/yyyy"
        minDate={new Date('2015/11/17')}
        maxDate={new Date()}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        showYearDropdown
        showMonthDropdown
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        dateFormat="dd/MM/yyyy"
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={new Date()}
        showYearDropdown
        showMonthDropdown
      />
      <br />
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
                      unit: dateType
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
