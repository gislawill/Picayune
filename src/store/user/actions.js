import * as types from '../action-types'
import firebase from '../firebase-config'
import { setAccessToken } from '../instagram/actions'

// Get User Data
const getUserDataStarted = () => {
  return {
    type: types.GET_USER_DATA_STARTED
  }
}

const getUserDataSuccess = (userData) => {
  return {
    type: types.GET_USER_DATA_SUCCESS,
    displayName: userData.displayName,
    email: userData.email,
    uid: userData.uid
  }
}

const getUserDataFail = (error) => {
  return {
    type: types.GET_USER_DATA_FAIL,
    error: error
  }
}

export const getUserData = (user) => {
  return dispatch => {
    dispatch(getUserDataStarted())
    return firebase.database().ref('/users/' + user.uid).once('value')
    .then((snapshot) => {
      const userData = Object.assign({}, snapshot.val(), {uid: user.uid})
      if (userData.accessToken) dispatch(setAccessToken(userData.accessToken))
      dispatch(getUserDataSuccess(userData))
    })
    .catch((error) => {
      console.log(error)
      dispatch(getUserDataFail(error))
    })
  }
}

// Create User Record
const createUserRecordStarted = () => {
  return {
    type: types.CREATE_USER_RECORD_STARTED
  }
}

const createUserRecordSuccess = (displayName, email, uid) => {
  return {
    type: types.CREATE_USER_RECORD_SUCCESS,
    displayName: displayName,
    email: email,
    uid: uid
  }
}

const createUserRecordFail = (error) => {
  return {
    type: types.CREATE_USER_RECORD_FAIL,
    error: error
  }
}

export const createUserRecord = (displayName, email, uid) => {
  return dispatch => {
    dispatch(createUserRecordStarted())
    firebase.database().ref('users/' + uid).set({
      email: email,
      displayName: displayName,
    })
    .then(() => {
      createUserRecordSuccess(displayName, email, uid)
    })
    .catch((error) => {
      console.log(error)
      dispatch(createUserRecordFail(error))
    })
  }
}

// Update Account Settings
const updateAccountSettingsStarted = () => {
  return {
    type: types.UPDATE_ACCOUNT_SETTINGS_STARTED
  }
}

const updateAccountSettingsSuccess = (userData) => {
  return {
    type: types.UPDATE_ACCOUNT_SETTINGS_SUCCESS,
    userData: userData
  }
}

const updateAccountSettingsFail = () => {
  return {
    type: types.UPDATE_ACCOUNT_SETTINGS_FAIL
  }
}

export const updateAccountSettings = (userData) => {
  return dispatch => {
    dispatch(updateAccountSettingsStarted())
    firebase.database().ref('users/' + userData.uid).update({
      displayName: userData.displayName
    })
    .then(() => {
      dispatch(updateAccountSettingsSuccess(userData))
    })
    .catch((error) => {
      console.log(error)
      dispatch(updateAccountSettingsFail(error))
    })
  }
}
