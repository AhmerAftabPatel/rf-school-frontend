import React, { createContext, useReducer, useCallback, useEffect } from 'react'
import userReducer from './HomeReducer'
import * as types from './HomeActionTypes'
import axios from 'axios'
import {API} from '../../constants'
const initialHomeState = {
  loading: false,
  error: false,
  data: [],
  errResponse: null,
}

export const HomeContext = createContext(initialHomeState)

export const HomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialHomeState)


  const GetHomeData = useCallback(async (type = 'corp') => {
    dispatch({
      type: types.AUTH_START,
    })
    try {
      let res = null
        res = await axios.get(`${API}/home`)

      dispatch({
        type: types.AUTH_SUCCESS,
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: types.AUTH_FAILURE,
        payload: 'failed',
      })
    }
  }, [])




  return (
    <HomeContext.Provider
      value={{
        state,
        GetHomeData,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
