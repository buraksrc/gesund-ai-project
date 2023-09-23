import IRequest from "./IRequest";

export default interface INode{
    id: number;
    
    name: string; 
    
    value: number;
    
    children: INode[];

    requests: IRequest[];
}