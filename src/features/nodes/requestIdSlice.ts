import { createSlice } from "@reduxjs/toolkit";

type RequestNodeId = {
  requestNodeId: number
}

const initialState: RequestNodeId = {
  requestNodeId: -1
}

const requestNodeIdSlice = createSlice({
  name: 'requestNodeId',
  initialState,
  reducers:{
    set(state, action){
        state.requestNodeId = action.payload.id
    },
    clear: state => {
        state.requestNodeId = -1
    }
  }
})

export const { 
  set,
  clear
} = requestNodeIdSlice.actions

export default requestNodeIdSlice.reducer