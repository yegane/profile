import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {CameraKitCameraScreen} from 'react-native-camera-kit';
import {connect} from 'react-redux';
import {openScanner, scanDon} from '../action/qrCodeScanner';

class QrCodeScan extends React.Component {
  startScanQrCode = () => {
    this.props.openScanner();
  };
  render() {
    const {main} = styles;
    if (this.props.loading) {
      return (
        <View style={main}>
          <TouchableOpacity onPress={() => this.startScanQrCode()}>
            <Text>Click me for scan qr code</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={main}>
        <CameraKitCameraScreen
          showFrame={true}
          scanBarcode={true}
          laserColor={'#FF3D00'}
          frameColor={'#00C853'}
          colorForScannerFrame={'black'}
          onReadCode={event =>
            this.props.scanDon(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.qrCodeScanner.loading,
    qrCode: state.qrCodeScanner.qrCode,
  };
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default connect(
  mapStateToProps,
  {openScanner, scanDon},
)(QrCodeScan);
