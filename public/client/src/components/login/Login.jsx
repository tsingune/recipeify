// Third Party Imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Project Imports
import LoginView from './LoginView';
import RecipeifyAPI from '../../api/RecipeifyAPI';
import errorController from '../error/errorController';

function Login() {
  const history = useHistory();

  // Fields state
  const initialFields = { email: '', password: '' };
  const [fields, setfields] = useState(initialFields);

  // Errors State
  const initialErrors = {};
  const [errors, setErrors] = useState(initialErrors);

  // Form valid state
  const initialFormValid = false;
  const [formValid, setformValid] = useState(initialFormValid);

  // Validation handling
  function handleValidation(fields) {
    let errors = {};
    let formIsValid = true;

    if (!fields['email']) {
      formIsValid = false;
      errors['email'] = 'Please provide Email';
    }

    if (!fields['password']) {
      formIsValid = false;
      errors['password'] = 'Please provide password';
    }

    setErrors(errors);
    setformValid(formIsValid);
  }

  // Input handle
  const onInputChange = (event) => {
    // Get input id as name, and value
    const { id: name, value } = event.target;

    // Create fields object with new value
    let newFields = { ...fields, [name]: value };

    // Set state to new value
    setfields(newFields);

    // Handle validation using new value
    handleValidation(newFields);
  };

  // Form submission
  const onSubmit = async (event) => {
    // Prevent default event (Refresh)
    event.preventDefault();

    // Form not valid return alert
    if (!formValid) {
      return alert('Form is not valid');
    }

    try {
      // Send data to API
      const res = await RecipeifyAPI.post('/users/login', fields);

      // Set token in local storage
      localStorage.setItem('token', res.data.data.token);

      alert('Succesfully logged in');

      // Navigate to home page
      history.push('/explore');
    } catch (err) {
      if (err.response) {
        errorController(err.response);
      } else {
        alert(err);
      }
    }
  };

  return (
    <LoginView
      fields={fields}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
}

export default Login;
