import godirect from './godirect-js-main/dist/godirect.min.esm.js';
// functions for data collection

function SayHi() {

}

function BLECapability() {
    // checks if browser supports bluetooth
    if (navigator.bluetooth) {
      // eslint-disable-next-line react/style-prop-object
      return (<em> Bluetooth is Supported in this Browser </em>);
    } else {
      // eslint-disable-next-line react/style-prop-object
      return (<em> Bluetooth is Not SUpported in this Browser</em>);
    }
  }

export {}