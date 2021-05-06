import React, { useState, useEffect } from 'react'
import styles from '../styles/Popup.module.css'
import store$ from '../store'

export function Notification(){
  const [state, setState] = useState(null)

  useEffect(() => {
    const stream$ = store$.subscribe(data => {
      if(data.notification)
        setState(() => {return data.notification})
        
      if(data.notification.show)
        setTimeout(() => {
          setState(() => {return null})
        }, 3000);
    });

    return () => stream$.unsubscribe()

  }, []);

  return state && state.show ?
    <div className={styles.container}>
      {state.message}
    </div> : null
}

export function FormError(){
  const [state, setState] = useState(null)

  useEffect(() => {
    const stream$ = store$.subscribe(data => {
      if(data.form_error)
        setState(() => {return data.form_error})
    });

    return () => stream$.unsubscribe()
  }, []);

  return state && state.show ?
    <div className={styles['error-container']}>
      {state.message}
    </div> : null
}