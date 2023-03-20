import { configureStore } from "@reduxjs/toolkit";
import { authReducer, messageReducer, parkingReducer, locationReducer, colorReducer, bookingReducer } from "./reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    parking: parkingReducer,
    booking: bookingReducer,
    location: locationReducer,
    color: colorReducer,
    // notification: notificationReducer
  },
});

export default store;