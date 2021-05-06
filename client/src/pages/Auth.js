import React from 'react'

import api from '../api'
import styles from '../styles/Auth.module.css'
import Form from '../components/Form'

const templates = {
  signin: {
    type: 'signin',
    title: 'Sign in',
    fields: {
      email: {
        type: 'email',
        placeholder: 'Email'
      },
      password: {
        type: 'password',
        placeholder: 'Password'
      }
    },
    btn: {
      value: 'Sign in',
      callback: api.signin
    },
    help: {
      text: 'Not a member?',
      link: 'signup',
      title: 'Sign up'
    }
  },
  signup: {
    type: 'signup',
    title: 'Sign up',
    fields: {
      email: {
        type: 'email',
        placeholder: 'Email'
      },
      username: {
        placeholder: 'Username'
      },
      password: {
        type: 'password',
        placeholder: 'Password'
      }
    },
    btn: {
      value: 'Sign up',
      callback: api.signup
    },
    help: {
      text: 'Already have an account?',
      link: 'signin',
      title: 'Sign in'
    }
  }
}

export default function Auth(props){
  const template = templates[props.type || null] || null

  if(!template)
    return <div>Error</div>

  return (
    <div className={styles.container}>
      <h3>
        {template.title}
      </h3>
      <Form type={template.type} fields={template.fields} btn={template.btn} help={template.help} api_endpoint={template.api_endpoint}/>
    </div>
  )
}