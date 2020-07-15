import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/appState.interface';
import {AuthStateInterface} from '../types/authState.interface';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';

export const authFeatureSelector = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector(authFeatureSelector, (auth: AuthStateInterface) => auth.isSubmitting);

export const validationErrorsSelector = createSelector(authFeatureSelector, (auth: AuthStateInterface) => auth.validationErrors)

export const isLoggedInSelector = createSelector(authFeatureSelector, (auth: AuthStateInterface) => auth.isLoggedIn)

export const isAnonymousSelector = createSelector(authFeatureSelector, (auth: AuthStateInterface) => auth.isLoggedIn === false)

export const currentUserSelector = createSelector(authFeatureSelector, (auth: AuthStateInterface) => auth.currentUser)


