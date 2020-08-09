import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AddToFavoritesComponent} from "./components/addToFavorities/addToFavorites.component";
import {AddToFavoritesService} from "./services/addToFavorites.service";
import {EffectsModule} from "@ngrx/effects";
import {AddToFavoriteEffect} from "./store/effects/addToFavorite.effect";

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoriteEffect])],
  declarations: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
  exports: [AddToFavoritesComponent]
})
export class AddToFavoritesModule {

}
