import { Injectable } from '@angular/core';
import { restPath } from "app/share/constants/restPath"
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private HttpClient: HttpClient, private restPath: restPath) { }

  getListUsers(){
    return this.HttpClient.get(`${this.restPath.APP}${this.restPath.listUsers}`);
  }

  postUser(user){
    return this.HttpClient.post(`${this.restPath.APP}${this.restPath.usuarioGuardar}`, user);
  }
}
