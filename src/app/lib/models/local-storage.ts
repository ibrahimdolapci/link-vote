import { ILocalStorageState } from '../interfaces';

export const LOCAL_STORAGE_PREFIX = "hepsi-burada";

export enum LOCAL_STORAGE_KEYS {
    links = 'links',
}

export const localStorageInitialState: ILocalStorageState = {
    links: []
}