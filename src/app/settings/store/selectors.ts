import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/appState.interface';
import {SettingsStateInterface} from "./types/settingsState.interface";


export const settingsFeatureSelector = createFeatureSelector<AppStateInterface, SettingsStateInterface>('settings');

export const isSubmittingSelector = createSelector(settingsFeatureSelector, (settings: SettingsStateInterface) => settings.isSubmitting);

export const validationErrorsSelector = createSelector(settingsFeatureSelector, (settings: SettingsStateInterface) => settings.validationErrors)
