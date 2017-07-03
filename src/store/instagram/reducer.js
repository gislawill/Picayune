import * as types from '../action-types';

const defaultState = {
  accessToken: '',
  likeCount: null,
  addingAccessToken: false,
  gettingLikes: false
}

export default (state = defaultState, action) => {
  switch (action.type) {

    // Add Access Token
    case types.ADD_ACCESS_TOKEN_STARTED:
      return Object.assign({}, state, {
        addingAccessToken: true
      })
    case types.ADD_ACCESS_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        addingAccessToken: false,
        accessToken: action.accessToken
      })
    case types.ADD_ACCESS_TOKEN_FAIL:
      return Object.assign({}, state, {
        addingAccessToken: false
      })

    // Set Access Token
    case types.SET_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken
      })

    // Get Number of Likes
    case types.GET_LIKES_STARTED:
      return Object.assign({}, state, {
        gettingLikes: true
      })
    case types.GET_LIKES_SUCCESS:
      return Object.assign({}, state, {
        gettingLikes: false,
        likeCount: action.likeCount
      })
    case types.GET_LIKES_FAIL:
      return Object.assign({}, state, {
        gettingLikes: false
      })

    default:
      return state
  }
}
