import axios from 'axios';

// const serverUrl = "https://parking-renting-app-server.herokuapp.com/api/v1";
const serverUrl = "https://parkpin-server.onrender.com/api/v1";
// const serverUrl = "http://localhost:4000/api/v1";
// const serverUrl = "https://main-parking-server.herokuapp.com/api/v1";
// const serverUrl = "https://parkpin.onrender.com/api/v1";

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(
      `${serverUrl}/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "registerFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${serverUrl}/me`,
    );
    dispatch({ type: "loadUserSuccess", payload: data });

  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message })
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${serverUrl}/getuser/${id}`,
    );
    dispatch({ type: "getUserSuccess", payload: data });

  } catch (error) {
    dispatch({ type: "getUserFailure", payload: error.response.data.message })
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const verifyPassword = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "verifyPasswordRequest" });

    const { data } = await axios.post(
      `${serverUrl}/verifypassword`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "verifyPasswordSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "verifyPasswordFailure", payload: error.response.data.message });
  }
};

export const googleOAuthlogin = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "oauthLoginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/googleauth`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "oauthLoginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "oauthLoginFailure", payload: error.response.data.message });
  }
};

export const registerToken = (token) => async (dispatch) => {
  try {
    dispatch({ type: "registerTokenRequest" });

    const { data } = await axios.put(
      `${serverUrl}/token`,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "registerTokenSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "registerTokenFailure", payload: error.response.data.message });
  }
};


export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "changePasswordRequest" });

    const { data } = await axios.put(
      `${serverUrl}/updatepassword`,
      { oldPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "changePasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "changePasswordFailure", payload: error.response.data.message });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });

    const { data } = await axios.post(
      `${serverUrl}/forgotpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "forgotPasswordSuccess", payload: data.message });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: "forgotPasswordFailure", payload: error.response.data.message });
  }
};
export const resetPassword = (otp, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });

    const { data } = await axios.post(
      `${serverUrl}/resetpassword`,
      { otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "resetPasswordFailure", payload: error.response.data.message });
  }
};
export const resendOTP = () => async (dispatch) => {
  try {
    dispatch({ type: "resendOTPRequest" });

    const { data } = await axios.get(
      `${serverUrl}/resendotp`
    );
    dispatch({ type: "resendOTPSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "resendOTPFailure", payload: error.response.data.message });
  }
};
export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateRequest" });

    const { data } = await axios.put(
      `${serverUrl}/updateprofile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "updateSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "updateFailure", payload: error.response.data.message });
  }
};
export const verify = (otp) => async (dispatch) => {
  try {
    dispatch({ type: "verifyRequest" });

    const { data } = await axios.post(
      `${serverUrl}/verify`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "verifySuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "verifyFailure", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    await axios.get(
      `${serverUrl}/logout`,
    );
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({ type: "logoutFailure", payload: error.response.data.message });
  }
};


export const addTask = (title, description) => async (dispatch) => {
  try {
    dispatch({ type: "addTaskRequest" });

    const { data } = await axios.post(
      `${serverUrl}/newtask`,
      {
        title,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "addTaskSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "addTaskFailure", payload: error.response.data.message });
  }
};

export const completeTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "completeTaskRequest" });

    const { data } = await axios.get(
      `${serverUrl}/task/${taskId}`
    );
    dispatch({ type: "completeTaskSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "completeTaskFailure", payload: error.response.data.message });
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteTaskRequest" });

    const { data } = await axios.delete(
      `${serverUrl}/task/${taskId}`
    );
    dispatch({ type: "deleteTaskSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "deleteTaskFailure", payload: error.response.data.message });
  }
};

export const addParking = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "addParkingRequest" });

    const { data } = await axios.post(
      `${serverUrl}/new`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "addParkingSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "addParkingFailure", payload: error.response.data.message });
  }
};

export const getAllParking = () => async (dispatch) => {
  try {
    dispatch({ type: 'allParkingRequest' });

    const { data } = await axios.get(
      `${serverUrl}/allparking`,
    );
    dispatch({ type: "allParkingSuccess", payload: data });

  } catch (error) {
    dispatch({ type: "allParkingFailure", payload: error.response.data.message })
  }
};

export const getNearParking = (latitude, longitude) => async (dispatch) => {
  try {
    console.log("🚀 ~ file: action.js:335 ~ getNearParking ~ latitude:", latitude, longitude)
    dispatch({ type: 'nearParkingRequest' });

    const { data } = await axios.get(
      `${serverUrl}/nearparking`,
      // { latitude, longitude }
    );
    console.log("🚀 ~ file: action.js:348 ~ getNearParking ~ data:", data, '-------------------------------------------------------------------')
    dispatch({ type: "nearParkingSuccess", payload: data });

  } catch (error) {
    dispatch({ type: "nearParkingFailure", payload: error.response.data.message })
  }
};

export const getMyParking = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'myParkingRequest' });

    const { data } = await axios.get(
      `${serverUrl}/myparking/${id}`,
    );
    dispatch({ type: "myParkingSuccess", payload: data });

  } catch (error) {
    dispatch({ type: "myParkingFailure", payload: error.response.data.message })
  }
};

export const getMyBookings = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'getMyBookingsRequest' });

    const { data } = await axios.get(
      `${serverUrl}/getbooking/${id}`,
    );
    dispatch({ type: "getMyBookingsSuccess", payload: data });

  } catch (error) {
    dispatch({ type: "getMyBookingsFailure", payload: error.response.data.message })
  }
};

export const payment = (amount) => async (dispatch) => {
  try {
    dispatch({ type: 'paymentRequest' });

    const { data } = await axios.post(
      `${serverUrl}/payment`,
      { amount },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "paymentSuccess", payload: data.paymentIntent });
    return data;

  } catch (error) {
    dispatch({ type: "paymentFailure", payload: error.response.data.message })
  }
};

export const getMyBookingRequests = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'getMyBookingRequestsRequest' });

    const { data } = await axios.get(
      `${serverUrl}/getrequests/${id}`,
    );
    dispatch({ type: "getMyBookingRequestsSuccess", payload: data });

  } catch (error) {
    dispatch({ type: "getMyBookingRequestsFailure", payload: error.response.data.message })
  }
};

export const bookParking = (userId, ownerId, parkingSpaceId, startTime, endTime, vehicleType) => async (dispatch) => {
  try {
    dispatch({ type: "bookParkingRequest" });

    const { data } = await axios.post(
      `${serverUrl}/newbooking`,
      { userId, ownerId, parkingSpaceId, startTime, endTime, vehicleType },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "bookParkingSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "bookParkingFailure", payload: error.response.data.message });
  }
};

export const respond = (id, response) => async (dispatch) => {
  try {
    dispatch({ type: 'respondRequest' });

    const { data } = await axios.put(
      `${serverUrl}/respond/${id}`,
      { response },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "responseSuccess", payload: data });

  } catch (error) {
    dispatch({ type: "responseFailure", payload: error.response.data.message })
  }
};