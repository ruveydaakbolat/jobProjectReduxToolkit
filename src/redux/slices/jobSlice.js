import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [],
  isLoading: false,
  jobs: [],
  isError: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.mainJobs = action.payload;
    },
    setError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    filterBySearch: (state, action) => {
      const query = action.payload.text.toLowerCase();

      const filtred = state.mainJobs.filter((job) =>
        job[action.payload.field].toLowerCase().includes(query)
      );

      state.jobs = filtred;
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "z-a":
          state.jobs.sort((a, b) => b.company.localeCompare(action.company));
          break;
        case "En Yeni":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "En Eski":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          break;
      }
    },
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload)
    },
  },
});

export const {
  setLoading,
  setJobs,
  setError,
  createJob,
  filterBySearch,
  sortJobs,
  clearFilters,
  deleteJob,
} = jobSlice.actions;

export default jobSlice.reducer;
