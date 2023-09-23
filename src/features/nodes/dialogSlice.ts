import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DialogState = {
  addDialog: boolean,
  addRequestDialog: boolean,
  requestLogDialog: boolean
}

type DialogAction = {
  open: boolean
}

const initialState: DialogState = {
  addDialog: false,
  addRequestDialog: false,
  requestLogDialog: false
}

const dialogSlice = createSlice({
  name: 'addDialog',
  initialState,
  reducers:{
    handleAddDialog(state, action: PayloadAction<DialogAction>){
        state.addDialog = action.payload.open
    },
    handleAddRequestDialog(state, action: PayloadAction<DialogAction>){
        state.addRequestDialog = action.payload.open
    },
    handleRequestLogDialog(state, action: PayloadAction<DialogAction>){
        state.requestLogDialog = action.payload.open
    }
  }
})

export const { 
  handleAddDialog, 
  handleAddRequestDialog,
  handleRequestLogDialog
} = dialogSlice.actions

export default dialogSlice.reducer