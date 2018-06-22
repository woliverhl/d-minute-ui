import { Component, OnInit } from '@angular/core';
import { Usuario } from "app/models/usuario";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from "app/user/service/users.service";
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(public fb:FormBuilder,private user: Usuario, private userService:UsersService, public dialogRef: MatDialogRef<CreateUserComponent>) { }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm() {
    this.addUserForm = this.fb.group({
      username: [this.user.username, Validators.required],
      nombre: [this.user.nombre, Validators.required],
      apellido: [this.user.apellido, Validators.required],
      password: [this.user.password, Validators.required]
    });
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  postUsuario():void{
    if(this.addUserForm.valid){
      this.userService.postUser(this.user)
        .subscribe((data) => {
        this.closeDialog();
      }, (error) => {
        console.log(error)
      });
    }
  }


}
