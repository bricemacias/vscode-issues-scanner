const initialState = {
  labelHeaders: [],
  labelIssues: [],
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
