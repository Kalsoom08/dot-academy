'use client';
import { Provider } from 'react-redux';
import {store} from '../../store/store';
import ClientWrapper from './ClientWrapper';

export default function ProvidersWrapper({ children }) {
  return (
    <Provider store={store}>
      <ClientWrapper>
        {children}
      </ClientWrapper>
    </Provider>
  );
}
