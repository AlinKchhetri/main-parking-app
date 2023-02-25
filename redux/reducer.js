import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer({}, {
    loginRequest: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    oauthLoginRequest: (state) => {
        state.loading = true;
    },
    oauthLoginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    oauthLoginFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    registerRequest: (state) => {
        state.loading = true;
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    registerFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    verifyRequest: (state) => {
        state.loading = true;
    },
    verifySuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload;
    },
    verifyFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    verifyPasswordSuccess: (state, action) => {
        state.verify = true;
        state.message = action.payload;
    },
    verifyPasswordRequest: (state) => {
        state.verify = false;
    },
    verifyPasswordFailure: (state, action) => {
        state.verify = false;
        state.error = action.payload;
    },
    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
    },
    loadUserFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    logoutRequest: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
    },
    logoutFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    },
    clearMesssage: (state) => {
        state.message = null;
    }
});

export const messageReducer = createReducer({}, {

    addTaskRequest: (state) => {
        state.loading = true;
    },
    addTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addTaskFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    completeTaskRequest: (state) => {
        state.loading = true;
    },
    completeTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    completeTaskFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteTaskRequest: (state) => {
        state.loading = true;
    },
    deleteTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteTaskFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updateRequest: (state) => {
        state.loading = true;
    },
    updateSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    changePasswordRequest: (state) => {
        state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    changePasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    verifyRequest: (state) => {
        state.loading = true;
    },
    verifySuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    verifyFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    forgotPasswordRequest: (state) => {
        state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    resendOTPRequest: (state) => {
        state.loading = true;
    },
    resendOTPSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    resendOTPFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearError: (state) => {
        state.error = null;
    },
    clearMesssage: (state) => {
        state.message = null;
    }
});


export const parkingReducer = createReducer({}, {
    addParkingRequest: (state) => {
        state.loading = true;
    },
    addParkingSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addParkingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    allParkingRequest: (state) => {
        state.loading = true;
    },
    allParkingSuccess: (state, action) => {
        state.loading = false;
        state.parkingSpace = action.payload.parkingSpaceDetails;
    },
    allParkingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    myParkingRequest: (state) => {
        state.loading = true;
    },
    myParkingSuccess: (state, action) => {
        state.loading = false;
        state.parkingSpace = action.payload.parkingSpaceDetails;
    },
    myParkingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    bookParkingRequest: (state) => {
        state.loading = true;
    },
    bookParkingSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    bookParkingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getUserRequest: (state) => {
        state.loading = true;
    },
    getUserSuccess: (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
    },
    getUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearError: (state) => {
        state.error = null;
    },
    clearMesssage: (state) => {
        state.message = null;
    }
});

export const locationReducer = createReducer({}, {
    getLocation: (state, action) => {
        state.locationValue = action.payload
    },
});

export const colorReducer = createReducer({}, {
    toggleDarkMode: (state, action) => {
        state.isDarkMode = action.payload
    },

    setPrimaryColor: (state, action) => {
        state.primaryColor = action.payload
    },

    setSecondaryColor: (state, action) => {
        state.secondaryColor = action.payload
    }
});

// export const notificationReducer = createReducer({}, {
//     registerTokenRequest: (state) => {
//         state.loading = true;
//     },
//     registerTokenSuccess: (state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//     },
//     registerTokenFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     clearError: (state) => {
//         state.error = null;
//     },
//     clearMesssage: (state) => {
//         state.message = null;
//     }
// });
