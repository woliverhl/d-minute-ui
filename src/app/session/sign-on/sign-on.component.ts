import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/session/service/session.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from "app/models/user";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.scss']
})
export class SignOnComponent implements OnInit {


  public loginForm : FormGroup;
  private token:  string;


  constructor(private SessionService: SessionService, public User: User, private fb: FormBuilder, private route: Router) { 
    this.createLoginForm();
    this.User.userName = "ohidalgoleal@gmail.com";
    this.User.userPass = "dinero123";
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      userName: [this.User.userName, Validators.required ],
      userPass: [this.User.userPass, Validators.required]
    });
  }

  ngOnInit() {
  }

  logIn(){
    this.SessionService.logIn(this.User.userName, this.User.userPass).subscribe( 
      (response) => {
      response['token'] ? this.token = response['token'] : this.SessionService.throwError('We did not get a token');
      if (this.token != undefined) {
        this.SessionService.setToken(this.token);
        this.route.navigate(['project-list'])
      }
    },(err) => {
      console.log(err);
    });
  }

  onSubmit(){
    this.logIn();
  }



}
