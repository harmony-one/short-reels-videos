import React, {ReactNode} from 'react';
import { Provider } from 'react-redux';
import { Grommet } from 'grommet';
import { baseTheme } from "./themes/baseThemes";
import { ToastContainer } from 'react-toastify'

import store from './store/store';

import 'react-toastify/dist/ReactToastify.css'

interface Props {
  children: React.ReactNode | ReactNode[],
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <Grommet theme={baseTheme} full>
      <Provider store={store}>
        {children}
      </Provider>
      <ToastContainer position='top-left' />
    </Grommet>
  );
};

Providers.displayName = 'Providers';
