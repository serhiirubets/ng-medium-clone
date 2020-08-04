import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getPopularTagsAction} from '../../store/actions/getPopularTags.action';
import {Observable} from 'rxjs';
import {PopularTagType} from '../../../../types/popularTag.type';
import {errorSelector, isLoadingSelector, popularTagsSelector} from '../../store/selectors';

@Component({
  templateUrl: './popularTags.component.html',
  selector: 'mc-popular-tags',
})
export class PopularTagsComponent implements OnInit {
  popularTags$: Observable<PopularTagType[] | null>;
  isLoading$: Observable<boolean>;
  errors$: Observable<string | null>;

  constructor(private store: Store) {
  }

  ngOnInit():void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues() {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.errors$ = this.store.pipe(select(errorSelector));
  }

  fetchData() {
    this.store.dispatch(getPopularTagsAction())
  }
}
