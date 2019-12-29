import axios from 'axios';

export const requestLabelIssues = pageNumber => dispacth => {
  axios
    .get(
      `https://api.github.com/repositories/41881900/issues?page=${pageNumber}&per_page=100`
    )
    .then(response =>
      dispacth({
        type: 'GETLABLEISSUES',
        headersPayload: response.headers,
        issuesPayload: response.data
      })
    );
};

export const setPage = pageValue => ({
  type: 'CHANGEPAGE',
  pagePayload: pageValue
});

export const nextPage = () => ({
  type: 'NEXTPAGE'
});
