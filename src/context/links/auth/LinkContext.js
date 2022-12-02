import React, { createContext, useReducer, useCallback, useEffect } from 'react'
import linkReducer from './LinkReducer'
import * as types from './LinkActionTypes'
import axios from 'axios'
import {API} from '../../../../constants'
const initialLinkState = {
  loading: false,
  error: false,
  data: [],
  errResponse: null,
}

export const LinksContext = createContext(initialLinkState)

export const LinkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(linkReducer, initialLinkState)


  const LinkAction = useCallback(async (type = 'corp') => {
    dispatch({
      type: types.LINK_START,
    })
    try {
      let res = null
        res = await axios.get(`${API}/links`)
      dispatch({
        type: types.LINK_SUCCESS,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: types.LINK_FAILURE,
        payload: 'failed',
      })
    }
  }, []);

  useEffect(() => [
    LinkAction()
  ],[]);



  return (
    <LinksContext.Provider
      value={{
        state,
        LinkAction,
      }}
    >
      {children}
    </LinksContext.Provider>
  )
}
