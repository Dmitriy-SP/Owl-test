import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (email, thunkAPI) => {
    try {
      const response = await api.get('/persons?_quantity=10');
      const users = [ ...response.data.data, { 
        id: 11,
        firstname: "Javonte",
        lastname: "Breitenberg",
        phone: "+15205732813",
        email:"test@test.com",
        birthday: "1996-10-04",
        gender: "female",
      }];

      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (user) {
        return user;
      } else {
        return thunkAPI.rejectWithValue('Пользователь с таким email не найден');
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('Ошибка при подключении к API');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка входа';
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
