import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from "../actions/updateArticle.action";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {EditArticleService} from "../../services/editArticle.service";

@Injectable()
export class UpdateArticleEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private editArticleService: EditArticleService
  ) {
  }

  redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleSuccessAction),
    tap(({ article }) => {
      this.router.navigate(['/articles', article.slug]);
    })
  ), { dispatch: false }) // dispatch false, because we don't return action, so we should not dispatch

  updateArticleEffect$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleAction),
    switchMap(({slug, articleInput}) => {
      return this.editArticleService.updateArticle(slug, articleInput).pipe(
        map((article: ArticleInterface) => {
          return updateArticleSuccessAction({ article });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateArticleFailureAction({ errors: errorResponse.error.errors }));
        })
      );
    })
  ))
}


// Обновить сервис
// Добавить action type
// новые action
// новые effect
// обновить reducer
