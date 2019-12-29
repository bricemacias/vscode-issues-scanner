const initialState = {
  labelHeaders: [],
  labelIssues: [],
  // activeHeaders: [],
  // activeIssues: [],
  totalIssues: [],
  pageNumber: 1
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETLABLEISSUES':
      return {
        ...state,
        labelIssues: action.issuesPayload,
        labelHeaders: action.headersPayload
      };
    // case 'GETACTIVEISSUES':
    //   return {
    //     ...state,
    //     activeIssues: [...state.activeIssues, action.activeIssues]
    //   };
    case 'NEXTPAGE':
      return {
        ...state,
        pageNumber: state.pageNumber + 1
      };
    default:
      return state;
  }
};

export default rootReducer;
