import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedJob: {},
  listJob: [],
};

const JobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setListJob: (state, action) => {
      state.listJob = action.payload;
    },
  },
});

export const { setSelectedJob, setListJob } = JobSlice.actions;

const GetSelectedJob = (state) => {
  return state.job.selectedJob;
};

const GetListJob = (state) => {
  return state.job.listJob;
};

export { GetSelectedJob, GetListJob };

export default JobSlice.reducer;
