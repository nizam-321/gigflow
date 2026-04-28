//path: frontend/src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getMe, logoutUser as logoutApi } from "@/services/authApi";
import { socket } from "@/socket";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true, // Start with loading true while we check auth
  error: null,
};

// Helper to handle socket connection
const connectSocket = (userId: string) => {
  if (!socket.connected) {
    socket.connect();
    socket.emit("join", userId);
  }
};

const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// Check if user is logged in
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMe();
      if (data.user) {
        connectSocket(data.user.id);
      }
      return data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Not authenticated");
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      disconnectSocket();
      return null;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login / Signup Start
    authStart(state) {
      state.loading = true;
      state.error = null;
    },

    // Login / Signup Success
    authSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      connectSocket(action.payload.id);
    },

    // Login / Signup Failure
    authFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      disconnectSocket();
    },
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        disconnectSocket();
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { authStart, authSuccess, authFailure } = authSlice.actions;

export default authSlice.reducer;
