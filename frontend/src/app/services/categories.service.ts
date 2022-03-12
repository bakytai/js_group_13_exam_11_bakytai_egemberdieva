import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ApiCategory, Category } from '../models/category.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<ApiCategory[]>(environment.apiUrl + '/categories').pipe(
      map(response => {
        return response.map(category => {
          return new Category(category._id, category.title);
        });
      })
    );
  }
}
