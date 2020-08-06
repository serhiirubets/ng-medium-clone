import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from "../actions/createArticle.action";
import {CreateArticleService} from "../../services/createArticle.service";
import {ArticleInterface} from "../../../shared/types/article.interface";

@Injectable()
export class CreateArticleEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private createArticleService: CreateArticleService
  ) {
  }

  redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
    ofType(createArticleSuccessAction),
    tap(({ article }) => {
      this.router.navigate(['/articles', article.slug]);
    })
  ), { dispatch: false }) // dispatch false, because we don't return action, so we should not dispatch

  createArticleEffect$ = createEffect(() => this.actions$.pipe(
    ofType(createArticleAction),
    switchMap(({articleInput}) => {
      return this.createArticleService.createArticle(articleInput).pipe(
        map((article: ArticleInterface) => {
          return createArticleSuccessAction({ article });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(createArticleFailureAction({ errors: errorResponse.error.errors }));
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
