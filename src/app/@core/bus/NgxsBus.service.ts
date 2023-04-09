import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IBus } from '@shared/state-bus/IBus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgxsBusService implements IBus {
  constructor(private store: Store) {}
  getStateOnce<TRespose>(selector: any): Observable<TRespose> {
    return this.store.selectOnce(selector);
  }
  excuteAction<T = never>(action: T): Observable<any> {
    return this.store.dispatch(action);
  }
  getState<TRespose>(selector: any): Observable<TRespose> {
    return this.store.select(selector);
  }
  getSnapshot<TRespose>(selector: (state: any, ...states: any[]) => TRespose): TRespose {
    return this.store.selectSnapshot(selector);
  }
}
