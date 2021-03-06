import {UserProfileStateInterface} from "../types/userProfileState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {getUserProfileAction, getUserProfileSuccessAction} from "./actions/getUserProfile.action";
import {act} from "@ngrx/effects";

const initialState: UserProfileStateInterface = {
  isLoading: false,
  data: null,
  error: null,
}

const userProfileReducer = createReducer(
  initialState,
  on(getUserProfileAction, (state: UserProfileStateInterface): UserProfileStateInterface => ({
    ...state,
    isLoading: true,
  })),
  on(getUserProfileSuccessAction, (state: UserProfileStateInterface, action): UserProfileStateInterface => ({
    ...state,
    isLoading: false,
    data: action.userProfile
  })),
  on(getUserProfileAction, (state: UserProfileStateInterface): UserProfileStateInterface => ({
    ...state,
    isLoading: false,
  })),
);

export function reducers(state: UserProfileStateInterface, action: Action) {
  return userProfileReducer(state, action);
}
