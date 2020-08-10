import {Component, Input, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {addToFollowingAction} from "../../store/actions/addToFollowing.action";

@Component({
  selector: 'mc-follow-user',
  templateUrl: './followUser.component.html'
})
export class FollowUserComponent implements OnInit {
  @Input('slug') slugProps: string;
  @Input('isFollowing') isFollowingProps: boolean;

  isFollowing: boolean;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.isFollowing = this.isFollowingProps;
  }

  toggleFollow() {
    this.store.dispatch(addToFollowingAction({
      slug: this.slugProps,
      isFollowing: this.isFollowing,
    }));
    this.isFollowing = !this.isFollowing;
  }
}
