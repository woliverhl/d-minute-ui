import { Injectable, ViewContainerRef, Inject } from '@angular/core';
import { HttpRequest, HttpHandler , HttpEvent, HttpInterceptor } from '@angular/common/http';
import { SessionService } from "app/session/service/session.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { HttpObserve } from '@angular/common/http/src/client';
import { HttpResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { SpinnerService } from '../share/spinner/spinner.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: SessionService, private route: Router, private spinner: SpinnerService) {

  }

  goodByeDude():void{
    this.auth.resetToken();
    this.route.navigate(['/sign-on'])
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    if (!request.url.match('/token/generate-token') && request['responseType'] === 'json'){
      this.auth.getToken() === undefined || this.auth.getToken() === "undefined"  ? this.goodByeDude() : undefined;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
    });
    }

    if (request instanceof HttpRequest && request['responseType'] === 'json') {
      this.spinner.show();
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      //Everything is cool
      if(event instanceof HttpResponse){
        this.spinner.hide();
      }
    }, (err: any) => {
        this.spinner.hide();
      //You fuck up
        if(err['status'] === 401){
          console.log('You are banished from the app');
          this.goodByeDude();
        }
      
    })
  }

}
