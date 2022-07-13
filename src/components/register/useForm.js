import React from 'react'
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import validate from './validationInForm';

const useForm = (callback) => {

  const initiaValues = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    passWord: '',
    passwordConfirm: ''
  }

  const [values, setValue] = useState(initiaValues);
  const [errors, setErrors] = useState({}); //validation

  // get values
  const handelOnchange = (event) => {
    const { name, value } = event.target;
    setErrors(validate(values))
    setValue({ ...values, [name]: value })
  }
  
  //Submit
  const [isSubmit, setIsSubmit] = useState(false)
  const handleSubmit = e => {
    e.preventDefault();
    let valid = true;
    let profileCotent = '';
    let errorsContent = '';

    for (let key in values) {
      if (values[key] === '') {
        valid = false;
      }
      valid = true
      profileCotent += `<p class='text-left'><b>${key}: </b> ${values[key]}</p>`
    }

    for (let key in errors) {
      if (errors[key] !== '') {
        valid = false
      }
      errorsContent += `<p class='text-left'><b class='text-danger'>${key} is invalid </b></p>`
    }

    if (!valid) {
      Swal.fire({
        title: 'Your title!',
        html: errorsContent,
        icon: 'error',
        confirmButtonText: 'error'
      })
      return;
    }

    Swal.fire({
      title: 'Your title!',
      html: profileCotent,
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      callback()
    }
  }, [errors])

  return { handelOnchange, values, handleSubmit, errors }
}

export default useForm


