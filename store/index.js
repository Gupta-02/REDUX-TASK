import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import authSlice from './slices/authSlice';
import postsSlice from './slices/postsSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authSlice,
      posts: postsSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
