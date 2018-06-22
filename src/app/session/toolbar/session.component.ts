import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/session/service/session.service';
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  userName : String 

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    this.sessionService.getUserProfile().subscribe(
      (response: String) => {
        this.userName = `${response['nombre']} ${response['apellido']}`;
      }, (err) => {
        console.log(err);
      });
  }

  closeSession(){
    this.sessionService.logOut();
  }

}
