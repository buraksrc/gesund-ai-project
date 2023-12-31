import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import INode from "../../interfaces/INode";
import { findNodeElementById } from "../../services/nodeService";
import { RequestStatusType } from "../../interfaces/RequestStatus";
import { changeRequestDescription, changeRequestStatus, removeUnusedRequests } from "../../services/requestService";

const localStorageJSON = localStorage.getItem("nodes")

const tempNodes: INode[] = [
    { 
      id: 1,
      name: "Name 1",
      value: 1,
      children: [],
      requests: []
    },    
    {  
      id: 2,
      name: "Name 2",
      value: 999,
      children: [],
      requests: []
    },
    {
      id: 3,
      name: "Name 3",
      value: 300,
      children: [
        {
          id: 4,
          name: "Name 4",
          value: 500,
          children: [],
          requests: []
        },
        {
          id: 5,
          name: "Name 5",
          value: 200,
          children: [],
          requests: []
        },
        {
          id: 6,
          name: "Name 6",
          value: 400,
          children: [
            {
              id: 7,
              name: "Name 7",
              value: 100,
              children: [],
              requests: []
            },
            {
              id: 8,
              name: "Name 8",
              value: 200,
              children: [],
              requests: []
            },
            {
              id: 9,
              name: "Name 9",
              value: 200,
              children: [],
              requests: []
            }
          ],
          requests: []
        }
      ],
      requests: []
    }
]

const initialState: INode[] = localStorageJSON ? JSON.parse(localStorageJSON) : tempNodes 

type AddAction = {
  id: number,
  parentId: number,
  name: string,
  value: number
}

type DeleteAction = {
  id: number,
  parentId: number
}

type AddRequestAction = {
  requestId: number,
  from: number, //id
  to: number, //id
  value: number
}

type UpdateRequestAction = {
  requestId: number,
  value: number,
  status: RequestStatusType,
}

type UpdateRequestDescription = {
  requestId: number,
  description: string
}

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    updateNode(state, action){
      const element = findNodeElementById(state, action.payload.id);
      
      if(element){
        switch(action.payload.type){
          case "NAME":
            element.name = action.payload.name
            break;
          case "VALUE":
            element.value = action.payload.value
            break;
        }       
      }
    },
    addNode(state, action: PayloadAction<AddAction>){
      const { id, parentId, name, value} = action.payload

      const parentElement = findNodeElementById(state, parentId)

      if(parentElement){
        parentElement.children.push({
          id: id,
          name: name,
          value: value,
          children: [],
          requests: []
        })
      }
      else{
        state.push({
          id: id,
          name: name,
          value: value,
          children: [],
          requests: []
        })
      }
    },
    deleteNode(state, action: PayloadAction<DeleteAction>){
      const { id, parentId } = action.payload

      //If element has no parent
      if(parentId < 0){
        const element = state.findIndex(e => e.id == id)

        state.splice(element, 1)

        state = [...removeUnusedRequests(state, id)]

        return
      }

      const parentElement = findNodeElementById(state, parentId)

      if(parentElement){
        const child = parentElement.children.findIndex(c => c.id == id)

        parentElement.children.splice(child, 1)
        
        state = [...removeUnusedRequests(state, id)]
      }
    },
    addRequest(state, action: PayloadAction<AddRequestAction>){
      const { requestId, from, to, value } = action.payload

      const requestorNode = findNodeElementById(state, from)
      const requestedNode = findNodeElementById(state, to)

      if(requestorNode && requestedNode){
        requestorNode.requests.push({
          requestId: requestId,
          requestNodeId: requestedNode.id,
          value: value,
          type: "OUTGOING",
          status: "PENDING"
        })

        requestedNode.requests.push({
          requestId: requestId,
          requestNodeId: requestorNode.id,
          value: value,
          type: "INCOMING",
          status: "PENDING"
        })
      }
    },
    updateRequest(state, action: PayloadAction<UpdateRequestAction>){
      const { requestId, value, status } = action.payload

      state = [...changeRequestStatus(state, requestId, value, status)]
    },
    updateRequestDescription(state, action: PayloadAction<UpdateRequestDescription>){
      const { requestId, description } = action.payload

      state = [...changeRequestDescription(state, requestId, description)]
    }
  }
})

export const { 
  updateNode,
  addNode,
  deleteNode,
  addRequest,
  updateRequest,
  updateRequestDescription
} = nodesSlice.actions

export default nodesSlice.reducer