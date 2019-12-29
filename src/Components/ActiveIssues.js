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

  // La fonction permettant de récupérer les données de l'API
  const fetchData = (aStartDate, aEndDate, aDateType, format) => {
    const rangeMoment = moment.range(moment(aStartDate), moment(aEndDate));
    const rangeObject = Array.from(rangeMoment.by(aDateType));
    const rangeArray = rangeObject.map(m => m.format('YYYY-MM-DD'));
    console.log(rangeObject);
    console.log(rangeArray);

    for (let el of rangeArray) {
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
              x: moment(el).subtract(1, aDateType),
              y: response.data.total_count
            }
          ])
        )
        .catch(err => {
          setIsBroken(1);
        });
    }
  };

  // Permet de lancer la lancer la fonction fetchData dès que le composant est monté ou que les dates de début et de fin sont changées. Il règle également le type d'unité utilisé (jours, mois, années) en fonction de la taille de l'espacement entre les dates demandées
  useEffect(() => {
    setData([]);
    setIsBroken(0);
    const rangeMoment = moment.range(moment(startDate), moment(endDate));
    const rangeInMonths = Array.from(rangeMoment.by('months'));
    const monthsNumber = rangeInMonths.length;
    console.log(monthsNumber);
    if (monthsNumber === 1) {
      setDateType('day');
      fetchData(startDate, endDate, `days`);
    } else if (monthsNumber > 1 && monthsNumber < 24) {
      setDateType('month');
      fetchData(startDate, endDate, `months`);
    } else if (monthsNumber >= 24) {
      setDateType('year');
      fetchData(startDate, endDate, `years`);
    } else {
    }
  }, [startDate, endDate]);

  // Rendu
  return (
    <div>
      <h1 className="mb4"> Active Issues </h1>
      {isBroken ? (
        <div className="tc ba b--orange">
          <h3>{`Oups ! Trop de requêtes on été envoyées à l'API, réessayer dans 30 secondes ;)`}</h3>
        </div>
      ) : (
        <p>
          Afin d'éviter de surcharger l'API, essayer d'espacer vos requêtes de
          quelques secondes. Une limite de deux ans d'intervalle a également été
          fixée
        </p>
      )}
      <br />
      <h3>Sélectionner l'intervalle de temps souhaité</h3>
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
