import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EffectsModule} from '@ngrx/effects';

import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {RouterModule} from '@angular/router';
import {LoadingModule} from "../shared/modules/loading/loading.module";
import {ErrorMessageModule} from "../shared/modules/errorMessage/errorMessage.module";
import {ArticleComponent} from "./components/article/article.component";
import {ArticleService as SharedArticleService} from "../shared/services/article.service";
import {GetArticleEffect} from "./store/effects/getArticle.effect";
import {TagListModule} from "../shared/modules/tagList/tagList.module";
import {ArticleService} from "./services/article.service";
import {DeleteArticleEffect} from "./store/effects/deleteArticle.effect";

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ErrorMessageModule,
    LoadingModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    TagListModule
  ],
  declarations: [ArticleComponent],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {

}
