import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'https://gorest.co.in/public/v2/';
  postUrl: string =
    'https://gorest.co.in/public/v2/users?access-token=e8f9ef76f80978b8d498c15895bc047cb0e16c097e3ecf98ba1145aca307baaf';
  constructor(private http: HttpClient) {}

  listUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + 'users');
  }

  viewUsers(id: string) {
    return this.http.get(this.baseUrl + 'users/' + id);
  }

  addUsers(userObj: any) {
    return this.http.post(this.postUrl, userObj);
  }

  deleteUser(id: any) {
    return this.http.delete(
      this.baseUrl +
        'users/' +
        id +
        '?access-token=e8f9ef76f80978b8d498c15895bc047cb0e16c097e3ecf98ba1145aca307baaf'
    );
  }

  updateUsers(id: string, userObj: object) {
    return this.http.put(
      this.baseUrl +
        'users/' +
        id +
        '?access-token=e8f9ef76f80978b8d498c15895bc047cb0e16c097e3ecf98ba1145aca307baaf',
      userObj
    );
  }
}
