// src/redux/slices/taskFilterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  filter: 'none',
};

const taskFilterSlice = createSlice({
  name: 'taskFilter',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setSearchQuery, clearSearchQuery, setFilter } = taskFilterSlice.actions;
export default taskFilterSlice.reducer;
