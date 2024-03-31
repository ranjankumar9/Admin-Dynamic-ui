import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_Url } from './api';
import Cookies from 'js-cookie';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

let getToken =  Cookies.get("Token")
export const getProjectdata = createAsyncThunk('projects/fetchProjects', async () => {
  try {
    const response = await axios.get(`${base_Url}/api/project`, {
      headers: { Authorization: `Bearer ${getToken}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addProjectdata = createAsyncThunk('projects/addProject', async (projectData) => {
  try {
    const response = await axios.post(`${base_Url}/api/project/add`, projectData, {
      headers: { Authorization: `Bearer ${getToken}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateProject = createAsyncThunk('projects/updateProject', async ({ projectId, projectData }) => {
  try {
    const response = await axios.patch(`${base_Url}/api/project/update/${projectId}`, projectData, {
      headers: { Authorization: `Bearer ${getToken}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId) => {
  try {
    await axios.delete(`${base_Url}/api/project/delete/${projectId}`, {
      headers: { Authorization: `Bearer ${getToken}` }
    });
    return projectId;
  } catch (error) {
    throw error;
  }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    deleteProjectSuccess: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    updateProjectSuccess: (state, action) => {
      const updatedProjectIndex = state.projects.findIndex(project => project.id === action.payload.id);
      if (updatedProjectIndex !== -1) {
        state.projects[updatedProjectIndex] = action.payload;
      }
    },
  },
  extraReducers: {}

})

export const { clearError, deleteProjectSuccess } = projectSlice.actions;

export default projectSlice;
