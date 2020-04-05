import {
  LOAD_DATE_FAILED,
  LOAD_DATE_SUCCESS,
  REFRESH_DATA_VALUE,
  REFRESH_DATA_TRUE,
  REFRESH_DATA_FALSE,
} from '../action/type';

const INITIALIZE_STATE = {
  loading: true,
  refreshData: false,
  data: [],
};

const homeReducer = (state = INITIALIZE_STATE, action) => {
  switch (action.type) {
    case LOAD_DATE_FAILED:
      return {...state};

    case LOAD_DATE_SUCCESS:
      return {...state, loading: false, data: action.payload};

    case REFRESH_DATA_VALUE:
      return {...state, data: action.payload, refreshData: false};

    case REFRESH_DATA_TRUE:
      return {...state, refreshData: true};

    case REFRESH_DATA_FALSE:
      return {...state, refreshData: false};

    default:
      return {...state};
  }
};

export default homeReducer;
