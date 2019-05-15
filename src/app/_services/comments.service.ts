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

  create(postId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/posts/${postId}/comments`, comment);
  }

  delete(commentId: number, postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${postId}/comments/${commentId}`);
  }
}
