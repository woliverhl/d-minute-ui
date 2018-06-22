import { Injectable } from '@angular/core';
import { restPath } from "app/share/constants/restPath"
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";


@Injectable()
export class SessionService {

  private token : string;
  private username : String;

  constructor(private HttpClient: HttpClient, private restPath: restPath, private router:Router) {
    this.setToken(localStorage['token']);
  }


  logIn(user: string, pass: string):Observable<Object>{
    this.setUsername(user);
    let param = { 'username': user, 'password': pass}
    return this.HttpClient.post(`${this.restPath.APP}${this.restPath.logIn}`, param);
  }

  logOut():void{
    this.resetToken();
    this.router.navigate(['sign-on']);
  }

  throwError(message: string){
    throw Observable.throw(message);
  }

  setToken(token: string):void{
    localStorage['token'] = token;
    this.token = localStorage['token'];
  }

  setUsername(user: string): void {
    localStorage['username'] = user;
    this.username = localStorage['username'];
  }

  getUsername():String{
    return this.username !== undefined ? this.username : localStorage['username'];
  }


  resetToken():void{
    delete localStorage['token'];
    this.token = undefined;
  }

  getToken():string{
    return this.token;
  }

  getUserProfile(){
    return this.HttpClient.get(`${this.restPath.APP}${this.restPath.getUser}${this.getUsername()}`);
  }

  isAuthenticate():boolean{
    return this.getToken() != undefined;
  }
}
