import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; // Import Axios
import { base_Url } from './api';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;


export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.post(`${base_Url}/login`, { email, password });

    dispatch(setUser(response.data));
    return response.data
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logOutUser = (email) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.post(`${base_Url}/logout`, { email });

    dispatch(setUser(response.data));
    return response.data
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Use Axios for signupUser action
export const signupUser = (name, email, password, type) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.post(`${base_Url}/signup`, { name, email, password, type });

    dispatch(setUser(response.data));
    return response.data
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
