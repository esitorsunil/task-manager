// taskColumnSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visibleColumns: [
    'dueDate',
    'assignees',
    'assignedBy',
    'createdAt',
    'updatedAt',
    'status',
    'priority',
    'collaborators',
    'attachments',
    'id',
  ],
};

const taskColumnSlice = createSlice({
  name: 'taskColumn',
  initialState,
  reducers: {
    setVisibleColumns: (state, action) => {
      state.visibleColumns = action.payload;
    },
  },
});

export const { setVisibleColumns } = taskColumnSlice.actions;
export default taskColumnSlice.reducer;
