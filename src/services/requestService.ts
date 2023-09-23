import INode from "../interfaces/INode"

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

export {
    getLargestRequestId
}