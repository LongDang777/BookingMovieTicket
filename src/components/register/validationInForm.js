import React from 'react'

export default function validationInForm(values) {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'FirstName required'
  }
  if (!values.lastName) {
    errors.lastName = 'LastName required'
  }
  if (!values.userName) {
    errors.userName = 'UserName required'
  }
  // Email
  if (!values.email) {
    errors.email = 'Email required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z{2,}$]/i.test(values.email)) {
    errors.email = 'Email address is invalid'
  }

  //password
  if (!values.password) {
    errors.passWord = 'Password is required' 
  }
  else if (values.password.length < 5) {
    errors.password = 'Password needs to be 6 characters or more'
  }
  else if(values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords do not match'
  }
  else if (values.password.length > 36) {
    errors.password = 'Password cannot exceed more than 36 characters'
  }
  else if (!values.passwordConfirm) {
    errors.passwordConfirm = 'passwordConfirm is required'
  } 

  return errors

}
