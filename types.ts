import { KeystoneGraphQLAPI, KeystoneListsAPI, KeystoneContext } from '@keystone-next/types';
import type {Permission} from './permissionTypes'
export type Session = {
    itemId: string,
    listKey: string,
    data:{
        name:string,
        role?: {
            id:string,
            name:string
        } & {[key in Permission] : boolean;}
    }
}

export type ListsAPI = KeystoneListsAPI<any>
export type GraphqlAPI = KeystoneGraphQLAPI<any>
export type ContextAPI = KeystoneContext


export type AccessArgs = {
    session?:Session;
    item?:any
}

export type AccessControl = {
    [key: string]: (args: AccessArgs) => any
}

export type ListAccessArgs = {
    itemId?: string;
    session?: Session
}