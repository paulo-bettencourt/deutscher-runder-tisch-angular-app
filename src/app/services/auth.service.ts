import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.baseUrl;
  private isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {}

  login(data: User) {
    return this.http.post<User>(this.apiUrl + `login`, data);
  }

  signup(data: User) {
    return this.http.post<User>(this.apiUrl + `signup`, data);
  }

  otp(data: any) {
    return this.http.post<User>(this.apiUrl + `otp`, data);
  }

  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true')
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    .set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    .set('Access-Control-Allow-Methods', '*');

  uploadImage(data: File) {
    const formData: FormData = new FormData();
    formData.append('image', data);
    return this.http.post(this.apiUrl + `upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }

  uploadImage64(data: any) {
    return this.http.post(this.apiUrl + `post-image`, { image: data });
  }

  uploadText(data: any) {
    return this.http.post(this.apiUrl + `upload-text`, data);
  }

  getClasses() {
    return this.http.get(this.apiUrl + `classes`);
  }

  getImages() {
    return this.http.get(this.apiUrl + `get-images`);
  }

  set isLogged(value: boolean) {
    this.isLogged$.next(value);
  }

  get isLoggedGetter() {
    return this.isLogged$;
  }

  getJwtToken(token: any) {
    return this.http.post(this.apiUrl + `get-jwt-token`, { token: token });
  }

  logout() {
    return this.http.get(this.apiUrl + `logout`);
  }

  deleteClass(id: any) {
    return this.http.delete(this.apiUrl + `delete/` + id);
  }

  authGuard = (next: ActivatedRouteSnapshot) => {
    const isLogged = localStorage.getItem('jwtBringGlobalToken');

    return isLogged ? true : createUrlTreeFromSnapshot(next, ['/', 'login']);
  };

  timeLoggedIn(id: string, timeLoggedIn: number) {
    return this.http.post(this.apiUrl + 'time-logged-in', {
      id: id,
      timeLoggedIn: timeLoggedIn,
    });
  }

  getTimeLoggedIn(id: string) {
    return this.http.post(this.apiUrl + 'get-time-logged-in', { id: id });
  }
}
