import { Selector, StateContext } from '@ngxs/store';
import { ILoadingHandler } from './ILoadingHandler';

export class LoadingHandler<T extends ILoadingHandler> {

  startLoading(ctx: StateContext<T>): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isLoading: true
    });
  }

  stopLoading(ctx: StateContext<T>): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isLoading: false
    });
  }
}
