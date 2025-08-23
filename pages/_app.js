import { Provider } from 'react-redux';
import { wrapper } from '../store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { authService } from '../services/authService';
import '../styles/globals.css';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  
  return (
    <Provider store={store}>
      <AuthWrapper>
        <Component {...props.pageProps} />
      </AuthWrapper>
    </Provider>
  );
}

function AuthWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for stored user on app load
    const storedAuth = authService.getStoredUser();
    if (storedAuth) {
      dispatch(setUser(storedAuth));
    }
  }, [dispatch]);

  return children;
}

export default MyApp;
