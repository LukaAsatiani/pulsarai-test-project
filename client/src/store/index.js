import {Subject} from 'rxjs'
import {scan, startWith, shareReplay} from 'rxjs/operators'

const initialState = {
  user: null,
  notification: {
    show: false
  },
  form_error: {
    show: false
  },
  token: null
}

const handlers = {
  USER: (state, action) => ({...state, user: action.payload}),
  UPDATE_TOKEN: (state, action) => ({...state, token: action.payload}),
  CALL_NOTIFICATION: (state, action) => ({...state, notification: {
    message: action.payload.message,
    type: action.payload.type,
    show: true
  }}),
  CLOSE_NOTIFICATION: (state) => ({...state, notification: {
    show: false
  }}),
  CALL_FORM_ERROR: (state, action) => ({...state, form_error: {
    message: action.payload.message,
    show: true
  }}),
  CLOSE_FORM_ERROR: (state) => ({...state, form_error: {
    show: false
  }}),
  
  DEFAULT: state => state
}

function reducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

function createStore(rootReducer) {
  const subj$ = new Subject()

  const store$ = subj$.pipe(
    startWith({type: '__INIT__'}),
    scan(rootReducer, undefined),
    shareReplay(1)
  )

  store$.dispatch = action => subj$.next(action)

  return store$
}

const store$ = createStore(reducer)

export default store$