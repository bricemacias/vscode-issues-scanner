const initialState = {
  issues: [],
  totalIssues: [],
  headers: [],
  pageNumber: 1
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET':
      return {
        ...state,
        issues: action.issuesPayload,
        headers: action.headersPayload
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
