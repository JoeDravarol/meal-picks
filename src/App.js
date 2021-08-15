import React from 'react';

import MuiTheme from 'components/MuiTheme';
import Content from './Routes';
import { AuthProvider } from 'contexts/auth';

const App = () => {
  return (
    <MuiTheme>
      <AuthProvider>
        <Content />
      </AuthProvider>
    </MuiTheme>
  );
};

export default App;
