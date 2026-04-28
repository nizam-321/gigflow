import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/services/api";

export interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  category?: string;
  skills?: string[];
  deadline?: string;
  status: string;
  postedByName?: string;
  ownerId?: string;
  createdAt: string;
}

interface GigsState {
  myGigs: Gig[];
  browseGigs: Gig[];
  currentGig: Gig | null;
  loading: boolean;
  error: string | null;
}

const initialState: GigsState = {
  myGigs: [],
  browseGigs: [],
  currentGig: null,
  loading: false,
  error: null,
};

// Fetch gigs posted by logged-in user
export const fetchMyGigs = createAsyncThunk(
  "gigs/fetchMyGigs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/gigs/my");
      return res.data.gigs;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to load gigs");
    }
  }
);

// Fetch all open gigs (Browse page)
export const fetchOpenGigs = createAsyncThunk(
  "gigs/fetchOpenGigs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/gigs");
      return res.data.gigs;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to load gigs");
    }
  }
);

// Search Gigs (Public)
export const searchGigs = createAsyncThunk(
  "gigs/searchGigs",
  async (query: string, { rejectWithValue }) => {
    try {
      const res = await API.get(`/gigs?search=${encodeURIComponent(query)}`);
      return res.data.gigs;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to search gigs");
    }
  }
);

export const createGig = createAsyncThunk(
  "gigs/createGig",
  async (gigData: Partial<Gig>, { rejectWithValue }) => {
    try {
      const res = await API.post("/gigs", gigData);
      return res.data.gig;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to create gig");
    }
  }
);

export const fetchGigById = createAsyncThunk(
  "gigs/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await API.get(`/gigs/${id}`);
      return res.data.gig;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to fetch gig");
    }
  }
);

const gigsSlice = createSlice({
  name: "gigs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMyGigs
      .addCase(fetchMyGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.myGigs = action.payload;
      })
      .addCase(fetchMyGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetchOpenGigs
      .addCase(fetchOpenGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpenGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.browseGigs = action.payload;
      })
      .addCase(fetchOpenGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // searchGigs
      .addCase(searchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.browseGigs = action.payload;
      })
      .addCase(searchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // createGig
      .addCase(createGig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.loading = false;
        state.myGigs.unshift(action.payload);
      })
      .addCase(createGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetchGigById
      .addCase(fetchGigById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGig = action.payload;
      })
      .addCase(fetchGigById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gigsSlice.reducer;
