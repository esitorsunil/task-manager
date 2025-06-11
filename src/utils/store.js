import { configureStore } from '@reduxjs/toolkit';
import attachmentsReducer from './attachmentsSlice';

const store = configureStore({
  reducer: {
    attachments: attachmentsReducer,
 
  },
});

export default store;
