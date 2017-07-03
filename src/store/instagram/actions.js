import * as types from '../action-types'
import firebase from '../firebase-config'
import fetchJsonp from 'fetch-jsonp'

// Add Access Token
const addAccessTokenStarted = () => {
  return {
    type: types.ADD_ACCESS_TOKEN_STARTED
  }
}

const addAccessTokenSuccess = (accessToken) => {
  return {
    type: types.ADD_ACCESS_TOKEN_SUCCESS,
    accessToken: accessToken
  }
}

const addAccessTokenFail = (error) => {
  return {
    type: types.ADD_ACCESS_TOKEN_FAIL,
    error: error
  }
}

export const addAccessToken = (uid, accessToken) => {
  return dispatch => {
    dispatch(addAccessTokenStarted())
    firebase.database().ref('users/' + uid).update({
      accessToken: accessToken
    })
    .then(() => {
      dispatch(addAccessTokenSuccess(accessToken))
    })
    .catch((error) => {
      console.log(error)
      dispatch(addAccessTokenFail(error))
    })
  }
}

// Set Access Token, when you already have one
export const setAccessToken = (accessToken) => {
  return {
    type: types.SET_ACCESS_TOKEN,
    accessToken: accessToken
  }
}

// Get Likes
const getLikesStarted = () => {
  return {
    type: types.GET_LIKES_STARTED
  }
}

const getLikesSuccess = (likeCount) => {
  return {
    type: types.GET_LIKES_SUCCESS,
    likeCount: likeCount
  }
}

const getLikesFail = (error) => {
  return {
    type: types.GET_LIKES_FAIL,
    error: error
  }
}

export const getLikes = (accessToken) => {
  return dispatch => {
    dispatch(getLikesStarted())
    // In browser, must use jsonp to get around cors issue
    // fetchJsonp() will not run on server during isomorphic)
    // Should move api request to node server using https request
    // client = fetch(OUR_ENDPOINT)
    // server = https.get(INSTAGRAM) and return
    fetchJsonp('https://api.instagram.com/v1/users/self/media/liked?access_token=' + accessToken)
    .then(res => res.json())
    .then(resData => {
      const likeCount = resData.data.length
      dispatch(getLikesSuccess(likeCount))
    })
    .catch((error) => {
      console.log(error)
      dispatch(getLikesFail(error))
    })
  }
}
