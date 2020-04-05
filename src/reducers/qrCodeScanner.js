import {START_SCAN_QR_CODE, SCAN_DONE} from '../action/type';

const INITIALIZE_STATE = {
  loading: true,
  qrCode: '',
};

const qrCodeScanner = (state = INITIALIZE_STATE, action) => {
  switch (action.type) {
    case START_SCAN_QR_CODE:
      return {...state, loading: false};

    case SCAN_DONE:
      return {...state, qrCode: action.payload};

    default:
      return {...state};
  }
};

export default qrCodeScanner;
