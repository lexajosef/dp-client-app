import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../_models/post'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }
  
  getAllWithoutUserId(withoutUserId: number, orderDesc: boolean): Observable<Post[]> {
    let url = `${this.apiUrl}/posts?withoutUser=${withoutUserId}`;
    if (orderDesc) {
      url = `${url}&order=desc`;
    }
    
    return this.http.get<Post[]>(url);
  }

  getAllByUserId(userId: number, orderDesc: boolean): Observable<Post[]> {
    let url = `${this.apiUrl}/users/${userId}/posts`;
    if (orderDesc) {
      url = `${url}?order=desc`;
    }

    return this.http.get<Post[]>(url);
  }

  getLatestPosts(limit: number, offset: number, withoutUser?: number): Observable<Post[]> {
    let url = `${this.apiUrl}/posts?limit=${limit}&offset=${offset}&order=desc`;
    if (withoutUser) {
      url = `${url}&withoutUser=${withoutUser}`;
    }

    return this.http.get<Post[]>(url);
  }

  

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  update(post: Post): Observable<Post> {
    // API allow only these two parameters
    const body = {
      'title': post.title,
      'html': post.html
    };

    return this.http.put<Post>(`${this.apiUrl}/posts/${post.id}`, body);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`, {responseType: 'text'});
  }
}
