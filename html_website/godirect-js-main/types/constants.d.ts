export namespace commands {
    export { HEADER };
    export { INIT };
    export { DISCONNECT };
    export { START_MEASUREMENTS };
    export { STOP_MEASUREMENTS };
    export { SET_MEASUREMENT_PERIOD };
    export { GET_INFO };
    export { GET_STATUS };
    export { GET_SENSOR_IDS };
    export { GET_SENSOR_INFO };
    export { GET_DEFAULT_SENSORS_MASK };
}
export namespace measurementType {
    export { NORMAL_REAL32 };
    export { WIDE_REAL32 };
    export { APERIODIC_REAL32 };
    export { SINGLE_CHANNEL_REAL32 };
    export { SINGLE_CHANNEL_INT32 };
    export { APERIODIC_INT32 };
    export { START_TIME };
    export { DROPPED };
    export { PERIOD };
}
export namespace responseType {
    export { MEASUREMENT };
}
export namespace chargingState {
    export { IDLE };
    export { CHARGING };
    export { COMPLETE };
    export { ERROR };
}
declare const HEADER: Uint8Array;
declare const INIT: Uint8Array;
declare const DISCONNECT: Uint8Array;
declare const START_MEASUREMENTS: Uint8Array;
declare const STOP_MEASUREMENTS: Uint8Array;
declare const SET_MEASUREMENT_PERIOD: Uint8Array;
declare const GET_INFO: Uint8Array;
declare const GET_STATUS: Uint8Array;
declare const GET_SENSOR_IDS: Uint8Array;
declare const GET_SENSOR_INFO: Uint8Array;
declare const GET_DEFAULT_SENSORS_MASK: Uint8Array;
declare const NORMAL_REAL32: 6;
declare const WIDE_REAL32: 7;
declare const APERIODIC_REAL32: 10;
declare const SINGLE_CHANNEL_REAL32: 8;
declare const SINGLE_CHANNEL_INT32: 9;
declare const APERIODIC_INT32: 11;
declare const START_TIME: 12;
declare const DROPPED: 13;
declare const PERIOD: 14;
declare const MEASUREMENT: 32;
declare const IDLE: 0;
declare const CHARGING: 1;
declare const COMPLETE: 2;
declare const ERROR: 3;
export {};
