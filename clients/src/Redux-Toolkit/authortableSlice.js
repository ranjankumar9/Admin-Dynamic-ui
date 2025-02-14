import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_Url } from './api';
import Cookies from 'js-cookie';

const initialState = {
  authors: [],
  loading: false,
  error: null,
};

export const getAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
  const getToken = Cookies.get("Token");
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
  const getToken = Cookies.get("Token");
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
  const getToken = Cookies.get("Token");
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
  const getToken = Cookies.get("Token");
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
  extraReducers(builder) {
    builder
      .addCase(getAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload;
      })
      .addCase(getAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.authors.push(action.payload);
      })
      .addCase(addAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // Similarly, handle other async action creators' pending, fulfilled, and rejected states
  }
});

export const { clearError, deleteAuthorSuccess } = authorsSlice.actions;

export default authorsSlice.reducer;
