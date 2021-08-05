// Third Party Imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Project Imports
import SignUpView from './SignUpView';
import RecipeifyAPI from '../../api/RecipeifyAPI';
import errorController from '../error/errorController';

function Signup(props) {
  const history = useHistory();

  // Fields state
  const initialFields = { name:'',email: '', password: '', passwordConfirm: '' };
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

    if (!fields['name']) {
      formIsValid = false;
      errors['name'] = 'Please provide name';
    }

    if (!fields['email']) {
      formIsValid = false;
      errors['email'] = 'Please provide Email';
    }

    if (!fields['password']) {
      formIsValid = false;
      errors['password'] = 'Please provide password';
    }

    if (fields['password'] !== fields['passwordConfirm']) {
      formIsValid = false;
      errors['passwordConfirm'] = 'Password and Password confirm should match';
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
      console.log(fields);
      // Send data to API
      await RecipeifyAPI.post(`/users/signup`, fields);

      setfields(initialFields);

      alert('Successfully signed up. Login to continue');
      history.push('/login');
    } catch (err) {
      errorController(err.response);
    }
  };

  function render() {
    return (
      <SignUpView
        fields={fields}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        errors={errors}
      />
    );
  }

  return render();
}

export default Signup;
