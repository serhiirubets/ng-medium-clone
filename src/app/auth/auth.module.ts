import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {RegisterComponent} from './components/register/register.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {RegisterEffect} from './store/effects/register.effect';
import {AuthService} from './services/auth.service';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect])
  ],
  providers: [AuthService],
  declarations: [RegisterComponent]
})
export class AuthModule {

}
