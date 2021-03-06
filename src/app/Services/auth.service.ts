import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AuthDTO } from "../Models/auth.dto";
import { LocalStorageService } from "./local-storage.service";

interface AuthToken {
  user_id: string;
  access_token: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.controller = "auth";
    this.urlBlogUocApi = "http://localhost:3000/" + this.controller;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    //return this.http.post<AuthToken>(this.urlBlogUocApi, auth).toPromise();
    return this.http.post<AuthToken>(this.urlBlogUocApi, auth);
  }
}
