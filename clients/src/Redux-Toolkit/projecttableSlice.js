import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_Url } from './api';
import Cookies from 'js-cookie';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

export const getProjectdata = createAsyncThunk('projects/fetchProjects', async () => {
  const getToken = Cookies.get("Token");
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
  const getToken = Cookies.get("Token");
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
  const getToken = Cookies.get("Token");
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
  const getToken = Cookies.get("Token");
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
    deleteProjectSuccess(state, action) {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    updateProjectSuccess(state, action) {
      const updatedProjectIndex = state.projects.findIndex(project => project.id === action.payload.id);
      if (updatedProjectIndex !== -1) {
        state.projects[updatedProjectIndex] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProjectdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectdata.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getProjectdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProjectdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProjectdata.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(addProjectdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProject = action.payload;
        state.projects = state.projects.map(project =>
          project.id === updatedProject.id ? updatedProject : project
        );
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearError, deleteProjectSuccess, updateProjectSuccess } = projectSlice.actions;

export default projectSlice.reducer;
