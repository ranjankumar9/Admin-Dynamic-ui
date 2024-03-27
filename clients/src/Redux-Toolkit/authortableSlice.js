import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_Url } from './api';

const initialState = {
  authors: [],
  loading: false,
  error: null,
};
const getToken = localStorage.getItem("Token");
export const getAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
  try {
    const response = await axios.get(`${base_Url}/api/author`, {
      headers: { Authorization: `Bearer ${getToken}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addAuthor = createAsyncThunk('authors/addAuthor', async (authorData) => {
  try {
    const response = await axios.post(`${base_Url}/api/author/add`, authorData, {
      headers: { Authorization: `Bearer ${getToken}`}
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateAuthor = createAsyncThunk('authors/updateAuthor', async ({ authorId, authorData }) => {
  try {
    const response = await axios.patch(`${base_Url}/api/author/update/${authorId}`, authorData, {
      headers: { Authorization: `Bearer ${getToken}`}
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteAuthor = createAsyncThunk('authors/deleteAuthor', async (authorId) => {
  try {
    await axios.delete(`${base_Url}/api/author/delete/${authorId}`, {
      headers: { Authorization: `Bearer ${getToken}`}
    });
    return authorId;
  } catch (error) {
    throw error;
  }
});

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    deleteAuthorSuccess: (state, action) => {
      state.authors = state.authors.filter(author => author.id !== action.payload);
    },
  },
  extraReducers: {}
});

export const { clearError,deleteAuthorSuccess  } = authorsSlice.actions;

export default authorsSlice;
