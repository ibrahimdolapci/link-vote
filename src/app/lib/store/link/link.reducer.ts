import { createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store";
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { LinkActions } from './link.action';
import { ILink } from '../../interfaces';

const sortByModifiedDate = (a: ILink, b: ILink) => b.id - a.id;

const adapter: EntityAdapter<ILink> = createEntityAdapter<ILink>({ sortComparer: sortByModifiedDate });

type LinkState = EntityState<ILink>;

export const linkReducer = createReducer<LinkState>(
    adapter.getInitialState(),
    on(LinkActions.upVote, (state, { id }) => {
        const link = state.entities[id];
        return adapter.updateOne({ id, changes: { vote: link.vote + 1, modifiedDate: Date.now() } }, state);
    }),
    on(LinkActions.downVote, (state, { id }) => {
        const link = state.entities[id];
        return adapter.updateOne({ id, changes: { vote: link.vote - 1, modifiedDate: Date.now() } }, state);
    }),
    on(LinkActions.add, (state, action) => adapter.addOne({ ...action, id: state.ids.length, vote: 0, modifiedDate: Date.now() }, state)),
    on(LinkActions.remove, (state, { id }) => adapter.removeOne(id, state)),
    on(LinkActions.load, (state, { links }) => adapter.setAll(links, state))
);

export const selectLinkState = createFeatureSelector<LinkState>('links');

const { selectAll } = adapter.getSelectors();

// select the array of links
export const selectAllLinks = createSelector(selectLinkState, selectAll);