import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import './App.css'
import Main from './pages/Main'
import Auth from './pages/Auth'
import { Notification } from './components/Popup'
import store$ from './store'
import api from './api'

function App() {
  const [user, setUser] = useState({logged: false})

  const parseStorageToken = () => {
    const token = localStorage.getItem('token') || null

    return JSON.parse(token)
  }

  useEffect(() => {
    const token = parseStorageToken()
    
    if(token)
      api.user(token.user_id, setUser)
      
    const stream$ = store$.subscribe(data => {
      if(data.token === null){
        setUser(null)
        return
      }

      if(data.token){
        localStorage.setItem('token', JSON.stringify(data.token))
        api.user(data.token.user_id, setUser)
      }
    });

    return () => stream$.unsubscribe()
  }, []);

  return (
    <div className='App'>
      <Notification />
      <Router>
        {user && user.logged ? (
          <Switch>
            <Route path="/" exact component={() => <Main user={user}/>} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route 
              path="/signin"
              component={() => <Auth type="signin"/>}
            />
            <Route 
              path="/signup"
              component={() => <Auth type="signup"/>}
            />
            <Redirect to="/signin" />
          </Switch>
        )}
      </Router>
    </div>
  )
}

export default App
