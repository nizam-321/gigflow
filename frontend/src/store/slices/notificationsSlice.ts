import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

export interface Notification {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/notifications");
      return res.data.notifications;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load notifications"
      );
    }
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/notifications/${id}/read`);
      return res.data.notification;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to mark notification as read"
      );
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.unreadCount = action.payload.filter((n: any) => !n.isRead).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const index = state.items.findIndex((n) => n._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.unreadCount = state.items.filter((n) => !n.isRead).length;
        }
      });
  },
});

export default notificationsSlice.reducer;
