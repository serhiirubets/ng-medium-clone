import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from "../actions/addToFavorites.action";
import {AddToFavoritesService} from "../../services/addToFavorites.service";
import {ArticleInterface} from "../../../../types/article.interface";

@Injectable()
export class AddToFavoriteEffect {
  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService,
  ) {}

  addToFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(addToFavoritesAction),
    switchMap(({ isFavorite, slug }) => {
      const article$ = isFavorite ? this.addToFavoritesService.removeFromFavorites(slug) : this.addToFavoritesService.addToFavorites(slug);
      return article$
        .pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({ article });
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction());
          })
        )
    })
  ))
}


// Обновить сервис
// Добавить action type
// новые action
// новые effect
// обновить reducer
