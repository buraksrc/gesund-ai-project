import { createSlice } from "@reduxjs/toolkit";

type IdCounter = {
  id: number,
  requestId: number
}

const initialState: IdCounter = {
  id: 0,
  requestId: 1
}

//Acts like an identity column in T-SQL databases, never decrements
const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers:{
    setId(state, action){
      state.id = action.payload.id
    },
    incrementId: state => {
      state.id += 1
    },
    setRequestId(state, action){
      state.requestId = action.payload.requestId
    },
    incrementRequestId: state => {
      state.requestId += 1
    }
  }
})

export const { 
  setId, 
  incrementId,
  setRequestId,
  incrementRequestId 
} = idSlice.actions

export default idSlice.reducer