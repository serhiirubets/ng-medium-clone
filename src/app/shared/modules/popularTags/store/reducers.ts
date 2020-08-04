import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from './actions/getPopularTags.action';

const initialState: PopularTagsStateInterface = {
  data: null,
  error: null,
  loading: false,
}

const popularTagsReducer = createReducer(
  initialState,
  on(getPopularTagsAction, (state: PopularTagsStateInterface): PopularTagsStateInterface => ({
    ...state,
    loading: true,
  })),

  on(getPopularTagsSuccessAction, (state: PopularTagsStateInterface, action): PopularTagsStateInterface => ({
    loading: false,
    error: null,
    data: action.popularTags,
  })),

  on(getPopularTagsFailureAction, (state: PopularTagsStateInterface): PopularTagsStateInterface => ({
    ...state,
    loading: false,
    data: null,
    error: 'Something get wrong'
  })),
);

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action);
}
