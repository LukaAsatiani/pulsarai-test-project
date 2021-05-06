import React from 'react'

import api from '../api'

export default function Main(props){
  const name = props.user?.username
  
  return (
    <>
      <div>
        {
          props.user?.login_count === 0 ? 
            <h3>
              Welcome {name.charAt(0).toUpperCase() + name.slice(1)}
            </h3> :
            <> 
              <p>
                User: {name.charAt(0).toUpperCase() + name.slice(1)}
              </p>
              <p>
                Login count: {props.user?.login_count}
              </p>
            </>
        }
      </div>
      <input type='button' onClick={api.logout} value='Log out'/>
    </>
  )
}