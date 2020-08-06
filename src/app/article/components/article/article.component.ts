import {Component, OnDestroy, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {getArticleAction} from "../../store/actions/getArticleAction";
import {ActivatedRoute} from "@angular/router";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {combineLatest, Observable, Subscription} from "rxjs";
import {articleSelector, errorSelector, isLoadingSelector} from "../../store/selectors";
import {currentUserSelector} from "../../../auth/store/selectors";
import {map} from "rxjs/operators";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {deleteArticleAction} from "../../store/actions/deleteArticle.action";

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  article: ArticleInterface | null;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {
  }


  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector)),
    ]).pipe(
      map(([article, user]: [ArticleInterface | null, CurrentUserInterface | null]) => {
        if (!article || !user) {
          return false;
        }

        return user.username === article.author.username;
      })
    )
  }

  initializeListeners(): void {
    this.articleSubscription = this.store.pipe(select(articleSelector)).subscribe((article: ArticleInterface | null) => {
      this.article = article;
    });
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    // Pls, don't forget to unsubscribe from all subscribers, it's memory leak fix
    this.articleSubscription.unsubscribe();
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
