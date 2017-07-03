import * as types from '../action-types'
import firebase from '../firebase-config'
import { createUserRecord } from '../user/actions'
import { getUserData } from '../user/actions'

const updateAuthDisplayName = (displayName) => {
  firebase.auth().currentUser.updateProfile({
    displayName: displayName
  })
}

// Sign Up
const submitSignUpStarted = () => {
  return {
    type: types.SUBMIT_SIGN_UP_STARTED
  }
}

const submitSignUpSuccess = (displayName, email, uid) => {
  return {
    type: types.SUBMIT_SIGN_UP_SUCCESS,
    displayName: displayName,
    email: email,
    uid: uid
  }
}

const submitSignUpFail = (error) => {
  return {
    type: types.SUBMIT_SIGN_UP_FAIL,
    error: error
  }
}

export const submitSignUp = (formData) => {
  return dispatch => {
    dispatch(submitSignUpStarted)
    firebase.auth().createUserWithEmailAndPassword(formData.userName, formData.passWord)
    .then((userData) => {
      dispatch(getUserData(userData))
      dispatch(submitSignUpSuccess(formData.displayName, formData.userName, userData.uid))
      updateAuthDisplayName(formData.displayName)
      dispatch(createUserRecord(formData.displayName, formData.userName, userData.uid))
    })
    .catch((error) => {
      dispatch(submitSignUpFail(error))
      console.log(error)
    })
  }
}


// Log In
const submitLogInStarted = () => {
  return {
    type: types.SUBMIT_LOG_IN_STARTED
  }
}

const submitLogInSuccess = (userData) => {
  return {
    type: types.SUBMIT_LOG_IN_SUCCESS,
    displayName: userData.displayName,
    email: userData.email,
    uid: userData.uid
  }
}

const submitLogInFail = (error) => {
  return {
    type: types.SUBMIT_LOG_IN_FAIL,
    error: error
  }
}

export const submitLogIn = (formData) => {
  return dispatch => {
    dispatch(submitLogInStarted)
    firebase.auth().signInWithEmailAndPassword(formData.userName, formData.passWord)
    .then((userData) => {
      dispatch(getUserData(userData))
      dispatch(submitLogInSuccess(userData))
    })
    .catch((error) => {
      console.log(error)
      dispatch(submitLogInFail(error))
    })
  }
}


// Watch Auth
const watchingAuthStatusStarted = () => {
  return {
    type: types.WATCH_AUTH_STATUS_STARTED
  }
}

const watchingAuthenticated = (userData) => {
  return {
    type: types.WATCH_AUTH_STATUS_AUTH,
    displayName: userData.displayName,
    email: userData.email,
    uid: userData.uid
  }
}

const watchingNotAuthenticated = () => {
  return {
    type: types.WATCH_AUTH_STATUS_NOT_AUTH
  }
}

export const watchAuthState = () => {
  return dispatch => {
    dispatch(watchingAuthStatusStarted)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(getUserData(user))
        dispatch(watchingAuthenticated(user))
      }
      else dispatch(watchingNotAuthenticated())
    })
  }
}


// Sign Out
const submitSignOutStarted = () => {
  return {
    type: types.SUBMIT_SIGN_OUT_STARTED
  }
}

const submitSignOutSuccess = (userData) => {
  return {
    type: types.SUBMIT_SIGN_OUT_SUCCESS
  }
}

const submitSignOutFail = (error) => {
  return {
    type: types.SUBMIT_SIGN_OUT_FAIL,
    error: error
  }
}

export const submitSignOut = () => {
  return dispatch => {
    dispatch(submitSignOutStarted)
    firebase.auth().signOut()
    .then(() => {
      dispatch(submitSignOutSuccess())
    })
    .catch((error) => {
      console.log(error)
      dispatch(submitSignOutFail(error))
    })
  }
}
