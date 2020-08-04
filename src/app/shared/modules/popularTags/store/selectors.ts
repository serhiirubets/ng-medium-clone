import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../../types/appState.interface';
import {PopularTagsStateInterface} from '../types/popularTagsState.interface';

export const popularFeatureSelector = createFeatureSelector<AppStateInterface, PopularTagsStateInterface>('popularTags');

export const popularTagsSelector = createSelector(
  popularFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.data
)

export const isLoadingSelector = createSelector(
  popularFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.loading
)

export const errorSelector = createSelector(
  popularFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.error
)
