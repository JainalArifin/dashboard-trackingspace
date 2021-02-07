import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { configure } from 'axios-hooks';
import { INITIALIZERS } from './configs';
import { useTokenContext } from './contexts';

const App = () => {
  const { getToken } = useTokenContext();

  const { role } = getToken(true);
  const isLogin = role === 'admin';
  
  const routing = useRoutes(routes(isLogin));
  
  const token = getToken();

  configure({
    axios: INITIALIZERS.AXIOS(token),
    cache: false
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
