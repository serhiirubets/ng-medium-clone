import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/appState.interface';
import {EditArticleStateInterface} from "../types/editArticleState.interface";

export const editArticleSelector = createFeatureSelector<AppStateInterface, EditArticleStateInterface>('editArticle');

export const isSubmittingSelector = createSelector(
  editArticleSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isSubmitting
);

export const isLoadingSelector = createSelector(
  editArticleSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isLoading
);

export const validationErrorsSelector = createSelector(
  editArticleSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.validationErrors
)

export const articleSelector = createSelector(
  editArticleSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.article
);
