import { Dialog } from '@headlessui/react'
import { 
    useAppSelector, 
    useAppDispatch 
} from "../app/hooks";
import { handleRequestLogDialog } from '../features/nodes/dialogSlice';
import { findNodeElementById } from '../services/nodeService';
import { 
    updateRequest, 
    updateRequestDescription 
} from '../features/nodes/nodeSlice';

export const RequestLogDialogComponent = () => {
    const dispatch = useAppDispatch();

    const nodes = useAppSelector(state => state.nodes);
    const { requestNodeId: id }  = useAppSelector(state => state.requestNodeId);
    const { requestLogDialog: isOpen } = useAppSelector(state => state.dialog);

    const requests = findNodeElementById(nodes, id)?.requests
    
    function closeDialog(){
        dispatch(handleRequestLogDialog({ open: false }))
    }

    function rejectRequest(requestId: number, value: number){
        dispatch(updateRequest({ requestId: requestId, value: value, status: "REJECTED" }))
    }

    function approveRequest(requestId: number, value: number){
        dispatch(updateRequest({ requestId: requestId, value: value, status: "APPROVED" }))
    }

    function updateDescription(requestId: number, description: string){
        dispatch(updateRequestDescription({ requestId: requestId, description: description }))
    }
    
    return(
        <Dialog 
            open={isOpen} 
            onClose={closeDialog}
            className="relative z-50"
        >
            <div className="fixed inset-0 backdrop-blur-lg bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white p-2 grid gap-3">                    
                    <Dialog.Title className="text-center font-bold text-lg">
                        Request Log
                    </Dialog.Title>
                    {(requests == null || requests.length == 0) && (
                        <div className="grid gap-3">
                            <span className="text-red-600 text-bold text-center">
                                No requests have been found
                            </span> 
                        </div>
                    )}
                    {(requests != null && requests.length > 0) && (
                        <>
                            {requests.filter(e => e.type == "INCOMING").length > 0 && (
                                <div className="p-3 grid gap-2">
                                    <label className="text-bold text-gray-600 underline">Incoming Requests</label>
                                    <div className="grid border-2 border-orange-800 rounded-xl max-h-64 overflow-auto">
                                        <table>
                                            <thead className="top-0 sticky bg-white border-b-[1px] border-orange-800">
                                                <tr className="border-b-[1px] text-orange-800 border-orange-800">
                                                    <th className="py-2 border-r-[1px] border-orange-800">Requester Node</th>
                                                    <th className="py-2 border-r-[1px] border-orange-800">Requested Value</th>
                                                    <th className="py-2 border-r-[1px] border-orange-800">Status</th>
                                                    <th className="py-2"></th>                                     
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {requests.filter(e => e.type == "INCOMING").map(req => {
                                                    return (
                                                        <tr key={req.requestId} className="text-center">
                                                            <td className="py-1 border-r-[1px] border-orange-800">{findNodeElementById(nodes, req.requestNodeId)?.name}</td>
                                                            <td className="py-1 border-r-[1px] border-orange-800">{req.value}</td>
                                                            <td className="py-1 border-r-[1px] border-orange-800">{req.status}</td>
                                                            <td className="py-1 px-1 grid gap-1">
                                                                <div className="grid grid-cols-2 gap-1">
                                                                    <button
                                                                        disabled={req.status !== "PENDING"}
                                                                        className="col-span-1 text-white p-1 rounded-xl bg-green-600 transition-colors hover:bg-green-800 disabled:bg-gray-500 disabled:cursor-not-allowed" 
                                                                        onClick={() => approveRequest(req.requestId, req.value)}
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                    <button 
                                                                        disabled={req.status !== "PENDING"}
                                                                        className="col-span-1 text-white p-1 rounded-xl bg-red-600 transition-colors hover:bg-red-800 disabled:bg-gray-500 disabled:cursor-not-allowed" 
                                                                        onClick={() => rejectRequest(req.requestId, req.value)}
                                                                    >
                                                                        Reject
                                                                    </button>    
                                                                </div>
                                                                {req.status == "REJECTED" && ( 
                                                                    <textarea
                                                                        onChange={(e) => updateDescription(req.requestId, e.target.value)}
                                                                        placeholder="Enter rejection description"
                                                                        className="border-[1px] border-black hover:border-blue-500 focus:border-blue-500 focus:outline-none rounded-lg p-2 transition-colors disabled:border-gray-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                                                                    >
                                                                        {req.rejectionDescription}
                                                                    </textarea>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )                                        
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )} 
                            {requests.filter(e => e.type == "OUTGOING").length > 0 && (
                                <div className="p-3 grid gap-2">
                                    <label className="text-bold text-gray-600 underline">Outgoing Requests</label>
                                    <div className="grid border-2 border-orange-800 rounded-xl max-h-64 overflow-auto">
                                        <table>
                                            <thead className="top-0 sticky bg-white border-b-[1px] border-orange-800">
                                                <tr className="border-b-[1px] text-orange-800 border-orange-800">
                                                    <th className="py-2 border-r-[1px] border-orange-800">Requested Node</th>
                                                    <th className="py-2 border-r-[1px] border-orange-800">Requested Value</th>
                                                    <th className="py-2 border-r-[1px] border-orange-800">Status</th>  
                                                    <th className="py-2">Description</th>  
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {requests.filter(e => e.type == "OUTGOING").map(req => {
                                                    return (
                                                        <tr className="text-center" key={req.requestId}>
                                                            <td className="py-1 border-r-[1px] border-orange-800">{findNodeElementById(nodes, req.requestNodeId)?.name}</td>
                                                            <td className="py-1 border-r-[1px] border-orange-800">{req.value}</td>
                                                            <td className="py-1 border-r-[1px] border-orange-800">{req.status}</td>
                                                            <td className="py-1">{req.rejectionDescription}</td>
                                                        </tr>
                                                    )                                        
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )} 
                        </>
                    )}
                    <button 
                        className="text-white p-1 rounded-xl bg-red-600 transition-colors hover:bg-red-800" 
                        onClick={closeDialog}
                    >
                        Close
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}