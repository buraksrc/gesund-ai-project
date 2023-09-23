import { Dialog } from '@headlessui/react'
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { handleAddDialog } from '../features/nodes/dialogSlice';
import { useState } from 'react';
import { setId, incrementId } from '../features/nodes/idSlice';
import { addNode } from '../features/nodes/nodeSlice';
import { flattenNodes, getLargestNodeId } from '../services/nodeService';

export const AddNodeDialogComponent = () => {
    const dispatch = useAppDispatch();
    
    const nodes = useAppSelector(state => state.nodes);
    const { addDialog: isOpen } = useAppSelector(state => state.dialog);
    const { id: largestId } = useAppSelector(state => state.id);

    const [selectedId, setSelectedId] = useState(-1)
    const [name, setName] = useState("")
    const [value, setValue] = useState(0)

    function closeDialog(){
        dispatch(handleAddDialog({ open: false }))
    }

    function addNewNode(){
        const largestIdInNodes = getLargestNodeId(nodes)
        let tempId = largestIdInNodes

        if(largestId > largestIdInNodes){
            dispatch(incrementId())
            tempId = largestId
        } else {
            dispatch(setId({ value: largestIdInNodes + 1 }))
            tempId++
        }

        dispatch(addNode({ id: tempId, parentId: selectedId, name: name, value: value }))
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
                        Add Node
                    </Dialog.Title>

                    <div className="flex flex-col px-3 transition-colors focus-within:text-blue-700">
                        <label>Parent Node</label>
                        <select 
                            name="nodes"
                            onChange={(e) => setSelectedId(Number(e.target.value))}
                            className="grow border-[1px] border-black bg-white rounded-xl px-2 transition-colors focus:outline-none focus:border-blue-700 focus:text-blue-700 hover:border-blue-700 hover:text-blue-700"
                        >
                            <option value="-1" key="-1">--No Parent--</option>
                            {flattenNodes(nodes).map((item, index) => {
                                return <option value={item.id} key={item.id}>{item.name}</option>
                            })}
                        </select>                       
                    </div>                    
                    <div className="flex flex-col px-3 transition-colors  focus-within:text-blue-700">
                        <label>Name</label>
                        <input 
                            type="text"
                            onChange={(e) => setName(e.target.value)} 
                            value={name} 
                            className="grow border-[1px] border-black bg-white rounded-xl px-2 transition-colors focus:outline-none focus:border-blue-700 focus:text-blue-700 hover:border-blue-700 hover:text-blue-700"
                        />                       
                    </div>
                    <div className="flex flex-col px-3 transition-colors focus-within:text-blue-700">
                        <label>Value</label>
                        <input
                            type="number" 
                            onChange={(e) => setValue(e.target.valueAsNumber)} 
                            value={value} 
                            className="grow border-[1px] border-black bg-white rounded-xl px-2 transition-colors focus:outline-none focus:border-blue-700 focus:text-blue-700 hover:border-blue-700 hover:text-blue-700"
                        />                   
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-white px-3 py-2">
                        <button
                            disabled={!name}
                            className="col-span-1 p-1 rounded-xl bg-green-600 transition-colors hover:bg-green-800 disabled:bg-gray-500 disabled:cursor-not-allowed" 
                            onClick={addNewNode}
                        >
                            Add
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