import INode from "../interfaces/INode"

function findNodeElementById(data: INode[], id: number): INode | null{
  for(const item of data){
    if (item.id == id){
      return item
    }
    if(item.children.length > 0) {
      const result = findNodeElementById(item.children, id)
      if(result) {
        return result
      }
    }
  }

  return null
}

//Returns nodes as a 1D array
function flattenNodes(nodes: INode[]): INode[]{
    let nodesList: INode[] = []

    for(const item of nodes){
        nodesList.push(item)

        if(item.children.length > 0) {
            nodesList.push(...flattenNodes(item.children))
        }
    }

    return nodesList
}

function getLargestNodeId(tempNodes: INode[]): number{
    let largestNodeId = 0

    for(const item of tempNodes){
        if (item.id > largestNodeId){
            largestNodeId = item.id
        }
        if(item.children.length > 0) {
            const largestChildId = getLargestNodeId(item.children)
            if(largestChildId > largestNodeId) {
                largestNodeId = largestChildId
            }
        }
    }

    return largestNodeId
}

export {
    findNodeElementById,
    getLargestNodeId,
    flattenNodes
}