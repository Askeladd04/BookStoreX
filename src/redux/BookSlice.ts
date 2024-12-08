import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../project_data/IBook";

type initialStateType = {
  basket: Array<IBook>;
};

const initialState: initialStateType = {
  basket: JSON.parse(sessionStorage.getItem("books") || "[]") as Array<IBook>,
};

export const bookSlice = createSlice({
  name: "BookReducer",
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<IBook>) {
      const existingBook = state.basket.find(
        (book) => book.title === action.payload.title
      );

      if (existingBook) {
        existingBook.quantity = (existingBook.quantity || 1) + 1;
      } else {
        state.basket.push({ ...action.payload, quantity: 1 });
      }

      sessionStorage.setItem("books", JSON.stringify(state.basket));
    },
    removeBook(state, action: PayloadAction<IBook>) {
      if (action.payload.quantity === 1)
        state.basket = state.basket.filter((el) => el.title !== action.payload.title);
      else {
        const existingBook = state.basket.find(el => el.title === action.payload.title)!;
        existingBook.quantity =  existingBook.quantity!  - 1  
      }
      sessionStorage.setItem("books", JSON.stringify(state.basket));

    },
  },
});

export const actionsBookReducer = bookSlice.actions;
