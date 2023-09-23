import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { DocumentMagnifyingGlassIcon, EllipsisVerticalIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useAppDispatch } from '../app/hooks'
import { deleteNode } from '../features/nodes/nodeSlice'
import { handleAddRequestDialog } from '../features/nodes/dialogSlice'
import { set } from '../features/nodes/requestIdSlice'

export const NodeContextMenu = ({ id, parentId } : { id: number, parentId: number }) => {
    const dispatch = useAppDispatch();
    
    function deleteNodeFromNodes(){
      dispatch(deleteNode({ id: id, parentId: parentId }))
    }

    function openRequestDialog(){
      dispatch(set({ id: id }))
      dispatch(handleAddRequestDialog({ open: true }))     
    }
    
    return (
        <div className="text-right">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button>
                <EllipsisVerticalIcon
                    className="w-5 h-5 transition-colors hover:text-blue-700 cursor-pointer"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 p-1 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 grid gap-1">                  
                  <Menu.Item>
                    <button
                        className="hover:bg-green-700 bg-green-600 text-white transition-colors group flex w-full items-center rounded-xl px-2 py-2 text-sm gap-1"
                        onClick={openRequestDialog}
                    >
                        <PlusIcon className="w-4 h-4"/>
                        Create Request
                    </button>
                  </Menu.Item>                  
                  <Menu.Item>
                    <button
                        className="hover:bg-purple-700 bg-purple-600 text-white transition-colors group flex w-full items-center rounded-xl px-2 py-2 text-sm gap-1"
                        onClick={openRequestDialog}
                    >
                        <DocumentMagnifyingGlassIcon className="w-4 h-4"/>
                        Request Log
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                      <button
                        className="hover:bg-red-700 bg-red-600 text-white transition-colors group flex w-full items-center rounded-xl px-2 py-2 text-sm gap-1"
                        onClick={deleteNodeFromNodes}
                      >
                        <TrashIcon className="w-4 h-4"/>
                        Delete
                      </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )
}