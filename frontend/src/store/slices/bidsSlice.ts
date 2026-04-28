import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

export interface Bid {
  _id: string;
  gigId: { _id: string; title: string; budget: number; status: string } | string;
  message: string;
  amount: number;
  status: "pending" | "hired" | "rejected";
  createdAt: string;
}

interface BidsState {
  myBids: Bid[];
  gigBids: Bid[]; // bids for a specific gig (viewed by owner)
  loading: boolean;
  error: string | null;
}

const initialState: BidsState = {
  myBids: [],
  gigBids: [],
  loading: false,
  error: null,
};

export const fetchMyBids = createAsyncThunk(
  "bids/fetchMyBids",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/bids/my");
      return res.data.bids;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to load bids");
    }
  }
);

export const fetchBidsForGig = createAsyncThunk(
  "bids/fetchBidsForGig",
  async (gigId: string, { rejectWithValue }) => {
    try {
      const res = await API.get(`/bids/${gigId}`);
      return res.data.bids;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to load bids");
    }
  }
);

export const submitBid = createAsyncThunk(
  "bids/submitBid",
  async (bidData: { gigId: string; message: string; amount: number }, { rejectWithValue }) => {
    try {
      const res = await API.post("/bids", bidData);
      return res.data.bid;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to submit bid");
    }
  }
);

export const hireBid = createAsyncThunk(
  "bids/hireBid",
  async (bidId: string, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/bids/${bidId}/hire`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to hire freelancer");
    }
  }
);

const bidsSlice = createSlice({
  name: "bids",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids = action.payload;
      })
      .addCase(fetchMyBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBidsForGig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBidsForGig.fulfilled, (state, action) => {
        state.loading = false;
        state.gigBids = action.payload;
      })
      .addCase(fetchBidsForGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBid.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids.unshift(action.payload);
      })
      .addCase(submitBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(hireBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hireBid.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(hireBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bidsSlice.reducer;
