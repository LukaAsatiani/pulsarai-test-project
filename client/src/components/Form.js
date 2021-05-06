import React, { useState, useRef, useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Form.module.css'
import { FormError } from './Popup'
import store$ from '../store'

export default function Form(props){
  const formEl = useRef(null)

  const temp = {...props.fields}
  Object.keys(temp).forEach(key => {
    temp[key] = ''
  })

  const [fields, setFields] = useState(temp)
  
  useEffect(() => {
    const changeEvent$ = fromEvent(formEl.current, 'input')
      .pipe(
        map(e => ({
          name: e.target.name, 
          value: e.target.value
        }))
      )

    changeEvent$.subscribe((res) => {
      setFields((state) => ({...state, [res.name]: res.value}))
    })
  }, [])

  const inputs = (f) => {
    const list = []

    Object.entries(f).forEach(item => {
      const [key, value] = item
      
      list.push(
        <input key={key} type={value.type || 'text'} name={key} defaultValue={fields[key]} className={styles.field} placeholder={value.placeholder} />
      )
    })

    return list
  }
  
  return (
    <>
      <FormError />
      <form ref={formEl} className={styles.container}>
        {inputs(props.fields || {})}
      </form>
      <div className={styles['submit-container']}> 
        <button onClick={() => props.btn.callback(fields)} className={styles.submit}>{props.btn?.value || 'Submit'}</button>
      </div>
      {props.help ? 
        <div className={styles['help-container']}> 
          {props.help.text} <NavLink onClick={() => store$.dispatch({type: 'CLOSE_FORM_ERROR'})} className={styles.link} to={props.help.link}>{props.help.title}</NavLink>
        </div> : null
      }
    </>
  )
}