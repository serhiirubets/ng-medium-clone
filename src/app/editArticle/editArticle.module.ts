import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ArticleFormModule} from "../shared/articleForm/articleForm.module";
import {EditArticleService} from "./services/editArticle.service";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {ArticleService as SharedArticleService} from "../shared/services/article.service";
import {UpdateArticleEffect} from "./store/effects/updateArticle.effect";
import {GetArticleEffect} from "./store/effects/getArticle.effect";
import {EditArticleComponent} from "./components/createArticle/editArticle.component";
import {LoadingModule} from "../shared/modules/loading/loading.module";

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  }
]

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    LoadingModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers)
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService]
})
export class EditArticleModule {

}
