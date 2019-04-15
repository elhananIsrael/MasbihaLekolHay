import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { BaseService } from '../shared/services';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: "root"
})
export class PostService {


  private getUrl = '/api/posts';
  private saveUrl = '/api/post';
  public selectedPost;

  // private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  // private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private baseService: BaseService) { }


  getPosts(): Observable<any> {
    return this.baseService.getAll(this.getUrl);
  }

  getPost(post: any): Observable<any> {
    return this.http.get(this.saveUrl + `/${post._id}`).map(res => res.json());
  }
  createPost(post): Observable<any> {
    return this.baseService.add(this.saveUrl, post);
  }
  // createPost(title: string, imagePath: string, body: string) {
  //   return this.http.post(
  //     this.url,
  //     { title: title, imagePath: imagePath, body: body },
  //     this.options
  //   );
  // }
  

  // getPost(post): Observable<any> {
  //   return this.baseService.getById(this.saveUrl, product);
  // }

  // createComment(id: string, comment: string) {
  //   return this.http.post(
  //     "http://localhost:3000/comment/" + id,
  //     { comment: comment },
  //     this.options
  //   );
  // }

  // getAllPosts() {
  //   return this.http.get(this.url, this.options);
  // }

  // getPostById(id: string) {
  //   return this.http.get(this.url + id, this.options);
  // }
}
