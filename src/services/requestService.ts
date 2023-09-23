import INode from "../interfaces/INode"
import IRequest from "../interfaces/IRequest"
import { RequestStatusType } from "../interfaces/RequestStatus"
import { RequestType } from "../interfaces/RequestType"

function getLargestRequestId(tempNodes: INode[]): number{
    let largestRequestId = 0

    for(const item of tempNodes){
        for(const request of item.requests){
            if(request.requestId > largestRequestId){
                largestRequestId = request.requestId
            }
        }
        if(item.children.length > 0) {
            const largestChildRequestId = getLargestRequestId(item.children)
            if(largestChildRequestId > largestRequestId) {
                largestRequestId = largestChildRequestId
            }
        }
    }

    return largestRequestId
}

function changeRequestStatus(nodes: INode[], requestId: number, value: number, status: RequestStatusType): INode[]{
    let newNodes = [...nodes]

    for(const item of newNodes){
        for(const req of item.requests){
            if(req.requestId == requestId){
                switch(status){
                    case "APPROVED":
                        switch(req.type){
                            case "INCOMING":
                                item.value -= value
                                break;
                            case "OUTGOING":
                                item.value += value
                                break;
                        }
                        break;
                    default:
                        break; 
                }
                
                req.status = status
            }
        }

        if(item.children.length > 0){
            item.children = changeRequestStatus(item.children, requestId, value, status)
        }
    }

    return newNodes
}

function changeRequestDescription(nodes: INode[], requestId: number, description: string): INode[]{
    let newNodes = [...nodes]

    for(const item of newNodes){
        for(const req of item.requests){
            if(req.requestId == requestId && req.status === "REJECTED"){
                req.rejectionDescription = description
            }
        }

        if(item.children.length > 0){
            item.children = changeRequestDescription(item.children, requestId, description)
        }
    }

    return newNodes
}

export {
    getLargestRequestId,
    changeRequestStatus,
    changeRequestDescription
}