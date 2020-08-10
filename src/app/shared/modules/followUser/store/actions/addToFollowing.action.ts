import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {ProfileInterface} from "../../../../types/profile.interface";

export const addToFollowingAction = createAction(
  ActionTypes.ADD_TO_FOLLOWING,
  props<{ isFollowing: boolean, slug: string}>()
)

export const addToFollowingSuccessAction = createAction(
  ActionTypes.ADD_TO_FOLLOWING_SUCCESS,
  props<{ userProfile: ProfileInterface }>()
)

export const addToFollowingFailureAction = createAction(
  ActionTypes.ADD_TO_FOLLOWING_FAILURE
)
