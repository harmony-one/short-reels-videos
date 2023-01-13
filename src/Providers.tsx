import React, {ReactNode} from 'react';
import { Provider } from 'react-redux';
import { Grommet } from 'grommet';
import { baseTheme } from "./themes/baseThemes";

import store from './store/store';

interface Props {
  children: React.ReactNode | ReactNode[],
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <Grommet theme={baseTheme} full>
      <Provider store={store}>
        {children}
      </Provider>
    </Grommet>
  );
};

Providers.displayName = 'Providers';
