import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedComponent} from './components/feed/feed.component';
import {FeedService} from './service/feed.service';
import {EffectsModule} from '@ngrx/effects';
import {GetFeedEffect} from './store/effects/getFeed.effect';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {RouterModule} from '@angular/router';
import {ErrorMessageModule} from '../errorMessage/errorMessage.module';
import {LoadingModule} from '../loading/loading.module';
import {PaginationModule} from '../pagination/pagination.module';
import {TagListModule} from '../tagList/tagList.module';
import {AddToFavoritesModule} from "../addToFavorites/addToFavorites.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    AddToFavoritesModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers)
  ],
  declarations: [FeedComponent],
  providers: [FeedService],
  exports: [FeedComponent]
})
export class FeedModule {

}
