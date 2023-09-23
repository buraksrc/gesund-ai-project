import { RequestStatusType } from "./RequestStatus";
import { RequestType } from "./RequestType";

export default interface IRequest{
    requestId: number,

    requestNodeId: number,

    value: number,
    
    type: RequestType,
    
    status: RequestStatusType,
    
    rejectionDescription?: string
}