import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesService } from '../services/categories.service';
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from './categories.actions';

@Injectable()

export class CategoriesEffects {

  fetchCategories = createEffect(() => this.actions.pipe(
    ofType(fetchCategoriesRequest),
    mergeMap(() => this.categoriesService.getCategories().pipe(
      map(categories => fetchCategoriesSuccess({categories})),
      catchError(() => of(fetchCategoriesFailure({error: 'Something went wrong'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService
  ) {}
}
