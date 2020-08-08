import {Component, OnInit} from "@angular/core";
import {ArticleInputInterface} from "../../../shared/types/articleInput.interface";
import {Observable} from "rxjs";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {select, Store} from "@ngrx/store";
import {articleSelector, isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";
import {updateArticleAction} from "../../store/actions/updateArticle.action";
import {ActivatedRoute} from "@angular/router";
import {getArticleAction} from "../../store/actions/getArticle.action";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html'
})
export class EditArticleComponent implements OnInit {
  // initialValues: ArticleInputInterface = {
  //   title: '',
  //   body: '',
  //   tagList: [],
  //   description: ''
  // }

  initialValues$: Observable<ArticleInputInterface>
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>
  isLoading$: Observable<boolean>
  slug: string;


  constructor(private store: Store, private route: ActivatedRoute) {
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({ slug: this.slug, articleInput }));
  }

  ngOnInit() {
    this.initializeValues();
    this.fetchData()

  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(select(articleSelector), filter(Boolean), map((article: ArticleInputInterface) => ({
        title: article.title,
        body: article.body,
        tagList: article.tagList,
        description: article.description,
    })))
  }

  private fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }
}
