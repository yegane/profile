import {CHANGE_PASSWORD, DOWNLOAD_FILE} from '../action/type';

const INITIALIZE_STATE = {loadingDownload: false, url: ''};

const profileReducer = (state = INITIALIZE_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {...state};

    case DOWNLOAD_FILE:
      return {...state, loadingDownload: false};

    default:
      return {...state};
  }
};

export default profileReducer;
