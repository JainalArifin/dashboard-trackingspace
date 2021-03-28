import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import useAxios from 'axios-hooks';
import { SERVICES } from '../../configs';
import { useTokenContext } from '../../contexts';
import { decodeToken } from '../../utils/converter';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formLogin: {
    backgroundColor: theme.palette.background.default,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    borderRadius: '10px',
    boxShadow: '0px 0px 2px #bababa'
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const history = useHistory();

  const { setToken } = useTokenContext();

  const [serverState, setServerState] = useState();

  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };

  const [, loginForm] = useAxios(
    {
      url: SERVICES.LOGIN_FORM,
      method: 'POST'
    },
    { manual: true }
  );

  const handleLogin = async (values, actions) => {
    handleServerResponse(false);

    try {
      const response = await loginForm({ data: values });
      const { token, message } = response.data;
      if (message) {
        return handleServerResponse(true, message);
      }
      window.localStorage.setItem('authToken', token);
      setToken(token);

      const { role } = decodeToken(token);

      if (role === 'admin') {
        navigate('/app/dashboard', { replace: true });
      }
    } catch (error) {
      const { email } = error.response.data;
      actions.setSubmitting(false);
      handleServerResponse(true, email);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container className={classes.formLogin} maxWidth="xs">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string()
                .max(255)
                .required('Password is required')
            })}
            onSubmit={handleLogin}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in as Admin
                  </Typography>
                </Box>
                {serverState && (
                  <p className={!serverState.ok ? 'errorMsg' : ''}>
                    {serverState.msg}
                  </p>
                )}
                <TextField
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default LoginView;
