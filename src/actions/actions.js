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

// export const requestActiveIssues = (year, month) => dispacth => {
//   if (month < 10) {
//     axios
//       .get(
//         `https://api.github.com/search/issues?q=repo:microsoft/vscode%20state:open%20created:${year}-0${month}&per_page=1`,
//         {
//           headers: {
//             Authorization: `Token a78c9527482b423d8c92e3b805bfe2081582daea`
//           }
//         }
//       )
//       .then(response =>
//         dispacth({
//           type: 'GETACTIVEISSUES',
//           activeIssues: response.data.total_count
//         })
//       );
//   } else {
//     axios
//       .get(
//         `https://api.github.com/search/issues?q=repo:microsoft/vscode%20state:open%20created:${year}-${month}&per_page=1`,
//         {
//           headers: {
//             Authorization: `Token a78c9527482b423d8c92e3b805bfe2081582daea`
//           }
//         }
//       )
//       .then(response =>
//         dispacth({
//           type: 'GETACTIVEISSUES',
//           activeIssues: response.data.total_count
//         })
//       );
//   }
// };

// export const requestActiveIssues0 = (
//   year,
//   month1Number1,
//   month1Number2
// ) => dispacth => {
//   for (let i = 1; i <= 12; i++) {
//     // .get(
//     //   `https://api.github.com/search/issues?q=repo:microsoft/vscode%20state:open%20created:${year}-${month1Number1}${month1Number2}&per_page=1`
//     // )
//     if (i < 10) {
//       axios
//         .get(
//           `https://api.github.com/search/issues?q=repo:microsoft/vscode%20state:open%20created:${year}-0${i}&per_page=1`,
//           {
//             headers: {
//               Authorization: `Token a78c9527482b423d8c92e3b805bfe2081582daea`
//             }
//           }
//         )
//         .then(response =>
//           dispacth({
//             type: 'GETACTIVEISSUES',
//             activeIssues: response.data.total_count
//           })
//         );
//     } else {
//       axios
//         .get(
//           `https://api.github.com/search/issues?q=repo:microsoft/vscode%20state:open%20created:${year}-${i}&per_page=1`
//         )
//         .then(response =>
//           dispacth({
//             type: 'GETACTIVEISSUES',
//             activeIssues: response.data.total_count
//           })
//         );
//     }
//   }
// };

export const setPage = pageValue => ({
  type: 'CHANGEPAGE',
  pagePayload: pageValue
});

export const nextPage = () => ({
  type: 'NEXTPAGE'
});
