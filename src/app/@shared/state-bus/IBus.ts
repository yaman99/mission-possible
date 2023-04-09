import { Observable } from 'rxjs';
export abstract class IBus {
  public abstract excuteAction<T>(action: T | any[]): Observable<any>;
  public abstract getState<TRespose>(selector: (state: any, ...states: any[]) => TRespose): Observable<TRespose>;
  public abstract getSnapshot<TRespose>(selector: (state: any, ...states: any[]) => TRespose): TRespose;
  public abstract getStateOnce<TRespose>(selector: (state: any, ...states: any[]) => TRespose): Observable<TRespose>;
}
