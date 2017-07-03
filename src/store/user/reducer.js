import * as types from '../action-types';

const defaultState = {
  gettingUserData: false,
  creatingUser: false,
  displayName: '',
  email: '',
  uid: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    // Get User Data
    case types.GET_USER_DATA_STARTED:
      return Object.assign({}, state, {
        gettingUserData: true
      })
    case types.GET_USER_DATA_SUCCESS:
      return Object.assign({}, state, {
        gettingUserData: false,
        accessToken: action.accessToken,
        displayName: action.displayName,
        email: action.email,
        uid: action.uid
      })
    case types.GET_USER_DATA_FAIL:
      return Object.assign({}, state, {
        gettingUserData: false
      })

    // Create User Record
    case types.CREATE_USER_RECORD_STARTED:
      return Object.assign({}, state, {
        creatingUser: true
      })
    case types.CREATE_USER_RECORD_SUCCESS:
      return Object.assign({}, state, {
        creatingUser: false,
        displayName: action.displayName,
        email: action.email,
        uid: action.uid
      })
    case types.CREATE_USER_RECORD_FAIL:
      return Object.assign({}, state, {
        creatingUser: false
      })

      // Update Account Settings
      case types.UPDATE_ACCOUNT_SETTINGS_STARTED:
        return Object.assign({}, state, {
          updatingAccountSettings: true
        })
      case types.UPDATE_ACCOUNT_SETTINGS_SUCCESS:
        return Object.assign({}, state, {
          updatingAccountSettings: false,
          displayName: action.userData.displayName
        })
      case types.UPDATE_ACCOUNT_SETTINGS_FAIL:
        return Object.assign({}, state, {
          updatingAccountSettings: false
        })

    default:
      return state
  }
}
