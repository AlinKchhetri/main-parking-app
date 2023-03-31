import { configureStore } from "@reduxjs/toolkit";
import { authReducer, messageReducer, parkingReducer, salesReducer, locationReducer, colorReducer, bookingReducer, paymentReducer, earningsReducer } from "./reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    parking: parkingReducer,
    booking: bookingReducer,
    location: locationReducer,
    color: colorReducer,
    payment: paymentReducer,
    sales: salesReducer,
    earnings: earningsReducer
    // notification: notificationReducer
  },
});

export default store;