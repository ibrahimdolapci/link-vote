import { Injectable } from '@angular/core';
import { ILocalStorageState } from '../interfaces';
import { Observable, Subject } from 'rxjs';
import { startWith, filter, map } from 'rxjs/operators';
import { LOCAL_STORAGE_PREFIX, localStorageInitialState, isDefined } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _registry = new Map<string, any>();
  private _registrySubject$ = new Subject<keyof ILocalStorageState>();

  constructor() {
    let i = 0;
    let key;
    while (key = localStorage.key(i++)) {
      let value = localStorage.getItem(key);
      try {
        value = JSON.parse(value)
      } catch (error) { }
      this._registry.set(key, value);
    }
  }

  private getInitialStateOf(key) {
    return localStorageInitialState[key];
  }

  get<K extends keyof ILocalStorageState>(key: K): ILocalStorageState[K] {
    const fullKey = this.getFullKey(key);

    const value = this._registry.get(fullKey);
    return isDefined(value) ? value : this.getInitialStateOf(key)
  }

  set<K extends keyof ILocalStorageState>(key: K, value: ILocalStorageState[K]) {
    const fullKey = this.getFullKey(key);

    this._registry.set(fullKey, value);
    this._registrySubject$.next(key);
    try {
      localStorage.setItem(fullKey, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  observe<K extends keyof ILocalStorageState, T extends ILocalStorageState[K]>(key: K): Observable<T> {

    return this._registrySubject$.asObservable().pipe(
      startWith(key),
      filter(changedKey => key == changedKey),
      map((changedKey) => this.get(changedKey) as T)
    )
  }

  private getFullKey = (key) => `${LOCAL_STORAGE_PREFIX}_${key}`;
}

