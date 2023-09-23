import { Dialog } from '@headlessui/react'
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { handleAddRequestDialog } from '../features/nodes/dialogSlice';
import { useState } from 'react';
import { flattenNodes } from '../services/nodeService';
import { getLargestRequestId } from '../services/requestService';
import { incrementRequestId, setRequestId } from '../features/nodes/idSlice';
import { addRequest } from '../features/nodes/nodeSlice';

export const AddRequestDialogComponent = () => {
    const dispatch = useAppDispatch();
    
    const nodes = useAppSelector(state => state.nodes);
    const { requestId }  = useAppSelector(state => state.id);
    const { requestNodeId: id }  = useAppSelector(state => state.requestNodeId);
    const { addRequestDialog: isOpen } = useAppSelector(state => state.dialog);

    const flattenedNodes = flattenNodes(nodes).filter(e => e.id != id);

    const [selectedId, setSelectedId] = useState(1)
    const [value, setValue] = useState(1)
    const [selectedNodeValue, setSelectedNodeValue] = useState<number | null>(flattenedNodes[0].value)

    function closeDialog(){
        dispatch(handleAddRequestDialog({ open: false }))
    }

    function checkRequest(id: number){
        const requestNode = flattenedNodes.find(e => e.id == id)
        
        if(requestNode){
            Number.isNaN(requestNode.value) ? setSelectedNodeValue(null) : setSelectedNodeValue(requestNode.value)
        }       
    }

    function selectRequestNode(id: number){
        checkRequest(id)
        setSelectedId(id)
    }

    function setRequestValue(val: number){
        checkRequest(selectedId)
        setValue(val)
    }

    function addNewRequest(){
        const largestRequestId = getLargestRequestId(nodes)

        if(requestId > largestRequestId){
            dispatch(incrementRequestId())
        } else {
            dispatch(setRequestId({ value: largestRequestId + 1 }))
        }

        dispatch(addRequest({ requestId: requestId, from: id, to: selectedId, value: value }))
        closeDialog()
    }

    return (
        <Dialog 
            open={isOpen} 
            onClose={closeDialog}
            className="relative z-50"
        >
            <div className="fixed inset-0 backdrop-blur-lg bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-2 grid gap-3">
                    <Dialog.Title className="text-center">
                        Create Request
                    </Dialog.Title>

                    <div className="flex flex-col px-3 transition-colors focus-within:text-blue-700">
                        <label>Request From</label>
                        <select 
                            name="nodes"
                            value={selectedId}
                            onChange={(e) => selectRequestNode(Number(e.target.value))}
                            className="grow border-[1px] border-black bg-white rounded-xl px-2 transition-colors focus:outline-none focus:border-blue-700 focus:text-blue-700 hover:border-blue-700 hover:text-blue-700"
                        >
                            {flattenedNodes.map((item, index) => {
                                return <option value={item.id} key={item.id}>{item.name}</option>
                            })}
                        </select>                       
                    </div>                     
                    <div className="flex flex-col px-3 transition-colors focus-within:text-blue-700">
                        <label>Request Value</label>
                        <input
                            min="1"
                            type="number" 
                            onChange={(e) => setRequestValue(e.target.valueAsNumber)} 
                            value={value} 
                            className="grow border-[1px] border-black bg-white rounded-xl px-2 transition-colors focus:outline-none focus:border-blue-700 focus:text-blue-700 hover:border-blue-700 hover:text-blue-700"
                        />                   
                    </div> 
                    {selectedNodeValue !== null && selectedNodeValue < value && (
                        <span className="text-red-700 text-bold text-center">
                            Selected node has insufficient ({selectedNodeValue}) funds!
                        </span>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-white px-3 py-2">
                        <button
                            disabled={value <= 0 || !(selectedNodeValue !== null && selectedNodeValue >= value)}
                            className="col-span-1 p-1 rounded-xl bg-green-600 transition-colors hover:bg-green-800 disabled:bg-gray-500 disabled:cursor-not-allowed" 
                            onClick={addNewRequest}
                        >
                            Create Request
                        </button>
                        <button 
                            className="col-span-1 p-1 rounded-xl bg-red-600 transition-colors hover:bg-red-800" 
                            onClick={closeDialog}
                        >
                            Cancel
                        </button>                       
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}