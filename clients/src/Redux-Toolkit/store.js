import authReducer from "./authSlice";
import authorsSlice from "./authortableSlice";
import authorsReducer from "./authortableSlice";
import { configureStore } from '@reduxjs/toolkit';
import projectSlice from "./projecttableSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        authors: authorsReducer,
        projects:projectSlice
    }
})

export default store;
