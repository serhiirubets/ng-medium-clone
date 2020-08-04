import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {isLoggedInSelector} from '../../../../../auth/store/selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps: string | null;

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store) {
  }

  ngOnInit():void {
    this.initializeValues();
  }

  private initializeValues():void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
