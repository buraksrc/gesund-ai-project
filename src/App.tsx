import { useAppSelector, useAppDispatch } from "./app/hooks";
import { AddNodeDialogComponent } from "./components/AddNodeDialogComponent";
import { AddRequestDialogComponent } from "./components/AddRequestDialogComponent";
import { RequestLogDialogComponent } from "./components/RequestLogDialogComponent";
import { NodeComponent } from "./components/NodeComponent";
import { handleAddDialog } from "./features/nodes/dialogSlice";
import { Xwrapper } from "react-xarrows";

function App() {
  const dispatch = useAppDispatch();

  //Maybe instead of sending it as a prop child component can utilize redux store
  const nodes = useAppSelector(state => state.nodes);
  const { 
    addDialog: isAddDialogOpen, 
    addRequestDialog: isAddRequestDialogOpen,
    requestLogDialog: isRequestLogDialogOpen
  } = useAppSelector(state => state.dialog)

  return (
    <div className="grow">
      <nav className="flex min-h-[5vh] px-5 py-3 gap-10 bg-black text-white sticky top-0">
        <button onClick={() => dispatch(handleAddDialog({ open: true }))} className="bg-green-600 px-3 w-20 rounded-xl sticky left-0 transition-colors hover:bg-green-800">Add</button>
        <button className="bg-blue-600 px-3 w-20 rounded-xl sticky left-32 transition-colors hover:bg-blue-800">Save</button>
      </nav>
      <div className="h-auto w-auto p-10">
        <Xwrapper>
          <NodeComponent data={nodes}/>
        </Xwrapper>
      </div>
      {isAddDialogOpen && <AddNodeDialogComponent/>}
      {isAddRequestDialogOpen && <AddRequestDialogComponent/>}
      {isRequestLogDialogOpen && <RequestLogDialogComponent/>}
    </div>
  )
}

export default App
