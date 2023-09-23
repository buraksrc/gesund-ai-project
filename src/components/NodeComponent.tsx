import INode from "../interfaces/INode"
import { useAppDispatch } from "../app/hooks";
import { updateNode } from "../features/nodes/nodeSlice";
import Xarrow, {useXarrow} from "react-xarrows";
import { NodeContextMenu } from "./NodeContextMenuComponent";

//Renders nodes with recursion
//React flow is better in real scenarios but this will do
export const NodeComponent = ({data, parentId = -1}: {data: INode[], parentId?: number}) => {
    const dispatch = useAppDispatch();

    //Re-renders when a node is added or deleted, don't delete this
    const updateXarrow = useXarrow();
    
    function onValueChanged(value: number, id: number){
        dispatch(updateNode({ id: id, value: value, type: "VALUE" }))
    }

    function onNameChanged(name: string, id: number){
        dispatch(updateNode({ id: id, name: name, type: "NAME" }))
    }

    //Gets total values of children by recursion
    function getTotal(data: INode[]): number{
        return data.reduce((accumulator, node) => {
            let childrenTotal = node.children.length > 0 ? getTotal(node.children) : 0; 
            return accumulator + childrenTotal + node.value;
        }, 0);
    }

    return(
        <div className="flex flex-row gap-5 text-center">
        {data.map((item, index) => (
            <div key={`${index + item.id}`} className="flex flex-col p-3 gap-5 h-max">
                <div className="flex flex-col grow"> 
                    <div id={`${item.id}`} className="min-h-[100px] gap-3 shadow-xl self-center flex flex-row justify-center border-solid border-2 border-gray rounded-xl p-3 bg-white"> 
                        <div className="grid gap-3">
                            <div className="flex gap-1 items-center">
                                <label>Name:</label>
                                <div>
                                    <input 
                                        type="text"
                                        onChange={(e) => onNameChanged(e.target.value, item.id)} 
                                        value={item.name} 
                                        className="w-[100px] grow focus:outline-none transition-colors border-black border-solid border-[1px] rounded-xl px-2 hover:border-blue-700 hover:text-blue-700 focus:border-blue-700 focus:text-blue-700"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <label>Value:</label>
                                <div>
                                    <input 
                                        type="number" 
                                        onChange={(e) => onValueChanged(e.target.valueAsNumber, item.id)} 
                                        value={item.value} 
                                        className="w-[100px] grow focus:outline-none transition-colors border-black border-solid border-[1px] rounded-xl px-2 hover:border-blue-700 hover:text-blue-700 focus:border-blue-700 focus:text-blue-700"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <label>Total:</label>
                                <span className="px-2 text-red-600 font-bold">{item.value + getTotal(item.children)}</span>
                            </div>
                        </div>
                        <div className="self-center">
                            <NodeContextMenu id={item.id} parentId={parentId} /> 
                        </div>
                    </div>
                </div>  
                {parentId > -1 && (
                    <Xarrow
                        showHead={false}
                        lineColor={"#000000"}
                        path="grid"
                        gridBreak="90%"
                        strokeWidth={1}
                        start={`${parentId}`}
                        end={`${item.id}`}
                    />
                )}
                {item.children.length > 0 && (
                    <NodeComponent 
                        data={item.children} 
                        parentId={item.id}
                    />
                )}
            </div>
        ))}
    </div>
    )
}