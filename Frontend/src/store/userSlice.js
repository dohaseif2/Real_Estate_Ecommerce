import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserDetails,
  updateUserDetails,
  updateUserPassword,
  deleteUserAccount,
} from 'services/userService';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await getUserDetails();
  return response.data;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData) => {
    const response = await updateUserDetails(userData);
    return response.data;
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (passwordData) => {
    const response = await updateUserPassword(passwordData);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
  await deleteUserAccount();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
