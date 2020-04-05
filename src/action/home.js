import {
  LOAD_DATE_SUCCESS,
  LOAD_DATE_FAILED,
  REFRESH_DATA_TRUE,
  REFRESH_DATA_FALSE,
  REFRESH_DATA_VALUE,
} from './type';

export const loadData = () => {
  return dispatch => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          dispatch({type: LOAD_DATE_SUCCESS, payload: responseJson});
        } else {
          dispatch({type: LOAD_DATE_FAILED});
        }
      })
      .catch(e => dispatch({type: LOAD_DATE_FAILED}));
  };
};

export const refreshData = () => {
  return dispatch => {
    dispatch({type: REFRESH_DATA_TRUE});
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(res => res.json())
      .then(resJson => {
        if (resJson !== '') {
          dispatch({type: REFRESH_DATA_VALUE, payload: resJson});
        } else {
          dispatch({type: REFRESH_DATA_FALSE});
        }
      })
      .catch(e => console.log(e));
  };
};
