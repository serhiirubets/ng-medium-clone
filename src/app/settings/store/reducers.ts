import {SettingsStateInterface} from "./types/settingsState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  updateCurrentUserAction, updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from "../../auth/store/actions/updateCurrentUser.action";

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
}

const settingsReducer = createReducer(
  initialState,
  on(updateCurrentUserAction, (state) => ({
    ...state,
    isSubmitting: true,
  })),
  on(updateCurrentUserSuccessAction, (state) => ({
    ...state,
    isSubmitting: false,
  })),
  on(updateCurrentUserFailureAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
  })),
)

export function reducers(state: SettingsStateInterface, action: Action) {
  return settingsReducer(state, action)
}
