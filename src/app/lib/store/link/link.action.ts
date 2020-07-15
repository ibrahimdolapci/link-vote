import { createAction, props } from '@ngrx/store';
import { ILink } from '../../interfaces';

export namespace LinkActions {
    export enum Types {
        UpVote = '[Link] Up Vote',
        DownVote = '[Link] Down Vote',
        Add = '[Link] Add',
        Remove = '[Link] Remove',
        Load = '[Link] Load'
    }
    export const upVote = createAction(
        Types.UpVote,
        props<{ id: number }>()
    );

    export const downVote = createAction(
        Types.DownVote,
        props<{ id: number }>()
    );

    export const add = createAction(
        Types.Add,
        props<{ name: string, url: string }>()
    );

    export const remove = createAction(
        Types.Remove,
        props<{ id: number }>()
    );

    export const load = createAction(
        Types.Load,
        props<{ links: ILink[] }>()
    );
}