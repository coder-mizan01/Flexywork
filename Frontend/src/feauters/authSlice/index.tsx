
//packages
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//services
import { api } from "../../services/apiService";

//types
import { authState, User, loginCredentilas } from "./authSliceType";


//define state for authslice
export const initialState: authState = {
  user: null,
  isLoading: false,
  error: null
}


//async thunk for login
export const login = createAsyncThunk("auth/login",
  async (credentials: loginCredentilas, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", credentials);
      console.log(res);
      if (res.data.success){ 
        return res.data;
      } else {
        return rejectWithValue(res.data.message || "Login failed");
      }
    } catch (error: any) {
      console.log(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

//async thunk for logout
export const logout = createAsyncThunk("auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
    } catch (error: any) {
      rejectWithValue(error.respons?.data?.message);
    }
  }
)

//async thunk to get current user
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/current-user");
      return res.data.payload.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  });


let refreshTokenTimeout: any;

// handle access token timeout
const loadAccessTokenTimeout = (dispatch: any) => {
    clearTimeout(refreshTokenTimeout);
    refreshTokenTimeout = setTimeout(() => {
        dispatch(loadAccessToken());
    }, 55000); // Refresh 5 seconds before expiration
};

//async thunk to load accessToken
export const loadAccessToken = createAsyncThunk("/auth/loadAccessToken",
  async (_, { rejectWithValue , dispatch }) => {
    try {
      await api.get("/auth/refresh-token");
      dispatch(loadAccessTokenTimeout);
    } catch (error: any) {
      rejectWithValue(error.response?.data?.message)
    }
  }
)


//create authSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //handle login states
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null

      })
      .addCase(login.fulfilled, (state) => {
          state.isLoading = false
          state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string;
      })

      //handle logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      //handle get current user states
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload as User;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string
      })

      //handle load access token states
      .addCase(loadAccessToken.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loadAccessToken.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
  }

})

export default authSlice.reducer;