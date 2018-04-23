import React from 'react';
import { Redirect } from 'react-router-dom';

const Login = props => {
  const {
    auth: { isAuthenticated },
    location: { state }
  } = props;
  if (isAuthenticated) {
    const to = (state && state.from.pathname) || '/';
    return <Redirect to={to} />;
  }
  return props.children;
};

export default Login;
