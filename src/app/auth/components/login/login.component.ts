import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {select, Store} from '@ngrx/store';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {loginAction} from '../../store/actions/login.action';
import {LoginRequestInterface} from '../../types/loginRequest.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface>;

  constructor(private fb: FormBuilder, private store: Store) {
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));

    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  ngOnInit() {
    this.initializeForm();
    this.initializeValues();
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value
    };

    this.store.dispatch(loginAction({ request }));
  }
}
