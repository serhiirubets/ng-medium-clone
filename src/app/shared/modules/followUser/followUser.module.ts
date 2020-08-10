import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FollowUserComponent} from "./components/followUser/followUser.component";
import {FollowUserService} from "./services/followUser.service";
import {EffectsModule} from "@ngrx/effects";
import {AddToFollowingEffect} from "./store/effects/addToFollowing.effect";

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFollowingEffect])],
  declarations: [FollowUserComponent],
  providers: [FollowUserService],
  exports: [FollowUserComponent],
})
export class FollowUserModule {}
