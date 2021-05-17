import * as ESGDS from './../actionTypes/Company';

const initialState = { };

export default (state = initialState, action) => {
  switch (action.type) {
    case ESGDS.COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        company: false,
        error: false,
      };
    case ESGDS.COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: true,
        company: action.company,
      };
    case ESGDS.COMPANY_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
