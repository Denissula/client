import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {LoginRequest} from "../interfaces/login-request";
import {map, Observable} from "rxjs";
import {AuthResponse} from "../interfaces/auth-response";
import {HttpClient} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {RegisterRequest} from "../interfaces/RegisterRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';

  constructor(
    private http: HttpClient,
  ) {
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/login`, data).pipe(
      map((response) => {
        if (response.isSuccess) {
          localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      })
    )
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/register`, data)
  }

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };
    return userDetail;
  }

  private getToken = (): string | null => localStorage.getItem(this.tokenKey);

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logOut();
    return isTokenExpired;
  }

  logOut = (): void => {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };


}