import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction
} from "../actions/deleteArticle.action";
import {ArticleService} from "../../services/article.service";
import {Router} from "@angular/router";

@Injectable()
export class DeleteArticleEffect {
  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router,
  ) {}

  deleteArticle$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleAction),
    switchMap(({ slug }) => {
      return this.articleService.deleteArticle(slug)
        .pipe(
          map(() => {
            return deleteArticleSuccessAction();
          }),
          catchError(() => {
            return of(deleteArticleFailureAction());
          })
        )
    })
  ))

  redirectAfterDelete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleSuccessAction),
    tap(() => {
      this.router.navigate(['/']);
    })
  ), { dispatch: false });
}


// Обновить сервис
// Добавить action type
// новые action
// новые effect
// обновить reducer
