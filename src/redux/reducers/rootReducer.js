const initialState = {
  labelHeaders: [],
  labelIssues: [],
  totalIssues: [],
  pageNumber: 1,
  error: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETLABLEISSUES':
      return {
        ...state,
        labelIssues: action.issuesPayload,
        labelHeaders: action.headersPayload
      };
    case 'FETCHERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'CHANGEPAGE':
      return {
        ...state,
        pageNumber: action.pagePayload
      };
    case 'NEXTPAGE':
      return {
        ...state,
        pageNumber: state.pageNumber + 1
      };
    case 'PREVIOUSPAGE':
      return {
        ...state,
        pageNumber: state.pageNumber - 1
      };
    default:
      return state;
  }
};

export default rootReducer;
