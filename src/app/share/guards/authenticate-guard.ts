import { Injectable } from "@angular/core";
import { CanActivate  } from "@angular/router";
import { SessionService } from "app/session/service/session.service";


@Injectable()
export class authGuard implements CanActivate {
    constructor(private sessionService : SessionService){

    }

    canActivate(){
        return this.sessionService.isAuthenticate();
    }
}
