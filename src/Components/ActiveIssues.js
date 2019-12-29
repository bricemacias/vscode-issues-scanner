import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';

import axios from 'axios';

const moment = extendMoment(Moment);

const ActiveIssues = () => {
  const [isBroken, setIsBroken] = useState(0);
  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState(new Date('2019/03'));
  const [endDate, setEndDate] = useState(new Date('2019/12'));
  const [rangeArray, setRangeArray] = useState([]);

  useEffect(() => {
    setData([]);
    const rangeMoment = moment.range(moment(startDate), moment(endDate));
    console.log(rangeMoment);
    const rangeYears = Array.from(rangeMoment.by('Years'));
    const rangeMonths = Array.from(rangeMoment.by('months'));
    const rangeDays = Array.from(rangeMoment.by('days'));
    //let rangeArray = {};
    // if (rangeYears.length > 2) {
    //   rangeArray = rangeYears.map(m => m.format('YYYY'));
    // } else if (rangeMonths > 1) {
    //   rangeArray = rangeMonths.map(m => m.format('YYYY-MM'));
    // } else {
    //   rangeArray = rangeDays.map(m => m.format('YYYY-MM-DD'));
    // }
    // console.log(rangeYears);
    // console.log(rangeMonths);
    // console.log(rangeDays);
    const rangeArray = rangeMonths.map(m => m.format('YYYY-MM'));

    for (let el of rangeArray) {
      if (isBroken === 1) {
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
  }, [startDate, endDate]);

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
          quelques secondes. Une limite de deux ans d'intervalle a également été
          fixée
        </p>
      )}
      <br />
      <DatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date);
          setEndDate(addDays(date, 365));
        }}
        minDate={new Date('2015/11')}
        maxDate={new Date()}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={addDays(startDate, 730)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      {/* <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date('2015/11/17')}
        maxDate={new Date()}
        selectsStart
        startDate={startDate}
        endDate={endDate}
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
      /> */}
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
