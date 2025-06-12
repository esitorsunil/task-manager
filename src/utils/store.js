import { configureStore } from '@reduxjs/toolkit';
import attachmentsReducer from './attachmentsSlice';
import taskFilterReducer from './searchFilterSlice';

const store = configureStore({
  reducer: {
    attachments: attachmentsReducer,
    taskFilter: taskFilterReducer,
    taskFilter: taskFilterReducer,
  },
});

export default store;
