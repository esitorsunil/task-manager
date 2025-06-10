import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [],
};

const attachmentsSlice = createSlice({
  name: 'attachments',
  initialState,
  reducers: {
    addFiles: (state, action) => {
      const newFiles = action.payload;

      const combinedFiles = [...state.files, ...newFiles].filter(
        (file, index, self) =>
          index === self.findIndex(f => f.name === file.name)
      );

      state.files = combinedFiles;
    },
    removeFile: (state, action) => {
      const filename = action.payload;
      state.files = state.files.filter(file => file.name !== filename);
    },
    clearFiles: (state) => {
      state.files = [];
    }
  },
});

export const { addFiles, removeFile, clearFiles } = attachmentsSlice.actions;

export default attachmentsSlice.reducer;
