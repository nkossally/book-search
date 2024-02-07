import { createSlice, current } from "@reduxjs/toolkit";

export const savedBooksSlice = createSlice({
  name: "savedBooks",
  initialState: [],
  reducers: {
    addBook: (state, action) => {
        return [action.payload, ...state]
    },

    removeBook: (state, action) => {
      const bookData = action.payload
      console.log(state, bookData)
      const arr = [...state]
      const idx = arr.findIndex((elem) => elem.key === bookData.key);
      return arr.slice(0, idx).concat(arr.slice(idx + 1))
  },
  },
});

export const { addBook, removeBook } = savedBooksSlice.actions;

export default savedBooksSlice.reducer;
