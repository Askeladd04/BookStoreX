import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./BookSlice";
import { useDispatch, useSelector } from "react-redux";
import { biography } from "../project_data/biography";
import { fantasy } from "../project_data/fantasy";
import { gifts } from "../project_data/gifts";
import { magazines } from "../project_data/magazines";
import { IBook } from "../project_data/IBook";
import { popular } from "../project_data/popular";
import { trending } from "../project_data/trending";
import {newBooks} from '../project_data/new'
const rootReducer = combineReducers({
    [bookSlice.name]: bookSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})


export const allBooks: Array<IBook> = [
    ...biography,
    ...fantasy,
    ...gifts,
    ...magazines,
    ...popular,
    ...trending,
    ...newBooks,
  ];

export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppSelector = useSelector.withTypes<AppStore>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

