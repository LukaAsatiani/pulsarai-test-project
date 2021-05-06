import { ajax } from 'rxjs/ajax'

import store$ from '../store'

const BASE_URL = 'http://localhost:8000/'

const _ajax = (method = 'GET', endpoint, body = {}) => {
  const token = localStorage.getItem('token') || null
  const headers = token && JSON.parse(token).value ? {"Authorization": `Bearer ${JSON.parse(token).value}`} : {}
  
  return ajax({
    method: method,
    url: `${BASE_URL}${endpoint}`,
    body: body,
    headers: headers
  })
}

const signup = (fields) => {
  const request = ajax({
    method: "POST",
    url: `${BASE_URL}auth/signup`,
    body: fields,
    headers: {"Authorization": localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token').value}` : null}
  })

  const stream$ = request.subscribe(
    res => {
      if(res.response.ok){
        if(res.response.isLucky){
          store$.dispatch({type: 'CALL_NOTIFICATION', payload: {message: res.response.message}})  
        }
        store$.dispatch({type: 'CLOSE_FORM_ERROR'})
        store$.dispatch({type: 'UPDATE_TOKEN', payload: res.response.token})
      } else {
        store$.dispatch({type: 'CALL_FORM_ERROR', payload: {message: res.response.message}})
      }
    },
    err => console.error(err)
  )

  return () => stream$.unsubscribe()
}

const user = (user_id, setter) => {
  const request = _ajax('GET', `users/${user_id}`)

  const stream$ = request.subscribe(
    res => {
      if(res.response.ok){
        if(setter)
          setter({...res.response.user, logged: true})
      } else {
        localStorage.removeItem('token')
      }
    }
  )

  return () => stream$.unsubscribe()
}

const signin = (fields) => {
  const request = _ajax('POST', 'auth/login', fields)

  const stream$ = request.subscribe(
    res => {
      if(res.response.ok){
        store$.dispatch({type: 'CLOSE_FORM_ERROR'})
        store$.dispatch({type: 'UPDATE_TOKEN', payload: res.response.token})
      } else {
        store$.dispatch({type: 'CALL_FORM_ERROR', payload: {message: res.response.message}})
      }
    },
    err => console.error(err)
  )

  return () => stream$.unsubscribe()
}


const logout = () => {
  const request = _ajax('get', 'auth/logout')

  const stream$ = request.subscribe(
    res => {
      if(res.response.ok){
        store$.dispatch({type: 'UPDATE_TOKEN', payload: null})
        localStorage.removeItem('token')
      }
    },
    err => console.error(err)
  )

  return () => stream$.unsubscribe()
}

const api = {
  signup, 
  signin, 
  user,
  logout
}

export default api