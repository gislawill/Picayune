import * as types from '../action-types';

const defaultState = {
    authChecked: false,
    authenticated: false,
    checkingAuth: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    // Update Auth Display Name
    case types.UPDATE_AUTH_DISPLAY_NAME_STARTED:
      return Object.assign({}, state, {
          updatingAuthDisplayName: true
        })
    case types.UPDATE_AUTH_DISPLAY_NAME_SUCCESS:
    return Object.assign({}, state, {
        updatingAuthDisplayName: false
      })
    case types.UPDATE_AUTH_DISPLAY_NAME_FAIL:
      return Object.assign({}, state, {
        updatingAuthDisplayName: false,
        updateAuthDisplayNameErrorMessage: action.error
      })

    // Sign Up
    case types.SUBMIT_SIGN_UP_STARTED:
      return Object.assign({}, state, {
        submittingSignUp: true
      })
    case types.SUBMIT_SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        submittingSignUp: false
      })
    case types.SUBMIT_SIGN_UP_FAIL:
      return Object.assign({}, state, {
        authenticated: false,
        submittingSignUp: false,
        signUpErrorMessage: action.error
      })

      // Log in
      case types.SUBMIT_LOG_IN_STARTED:
        return Object.assign({}, state, {
          submitingLogin: true
        })
      case types.SUBMIT_LOG_IN_SUCCESS:
        return Object.assign({}, state, {
          authenticated: true,
          submitingLogin: false
        })
      case types.SUBMIT_LOG_IN_FAIL:
        return Object.assign({}, state, {
          authenticated: false,
          submitingLogin: false,
          logInErrorMessage: action.error
        })

      // Check Auth
      case types.WATCH_AUTH_STATUS_STARTED:
        return Object.assign({}, state, {
          checkingAuth: true
        })
      case types.WATCH_AUTH_STATUS_AUTH:
        return Object.assign({}, state, {
          authenticated: true,
          authChecked: true
        })
      case types.WATCH_AUTH_STATUS_NOT_AUTH:
        return Object.assign({}, state, {
          authenticated: false,
          authChecked: true,
        })

      // Sign Out
      case types.SUBMIT_SIGN_OUT_STARTED:
        return Object.assign({}, state, {
          signingOut: true
        })
      case types.SUBMIT_SIGN_OUT_SUCCESS:
        return Object.assign({}, state, {
          authenticated: false,
          signingOut: false
        })
      case types.SUBMIT_SIGN_OUT_FAIL:
        return Object.assign({}, state, {
          signingOut: false,
          signOutErrorMessage: action.error
        })


    default:
      return state
  }
}
