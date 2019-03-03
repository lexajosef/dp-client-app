import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from '../_models/comment';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/posts`, comment);
  }

  delete(id: number): Observable<any> {
    // TODO: map catch errors and success string
    return this.http.delete(`${this.apiUrl}/posts/${id}`);
  }
}