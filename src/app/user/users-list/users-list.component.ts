import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from "app/user/service/users.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  listOfUsers: Array<Object>;
  public selectedMember: Object;
  listOfSelectedUsers: Array<Object>;
  listOfUsersForm: FormGroup;
  @Output() onSubmit = new EventEmitter<boolean>();

  constructor(private UsersService: UsersService, private fb: FormBuilder,) {

  }

  ngOnInit() {
    this.createListForm();
    this.listOfSelectedUsers = [];
    this.getListOfUsers();
  }

  getListOfUsers(): void{
    setTimeout(() => {
      this.UsersService.getListUsers().subscribe(
        (response: Array<Object>) => {
          this.listOfUsers = response.map((cv) => {
            return Object.assign({ fullName: `${cv['nombre']} ${cv['apellido']}` }, cv);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }, 0);
  }

  createListForm(){
    this.listOfUsersForm = this.fb.group({
      selectedMember: [this.selectedMember],
      listOfSelectedUsers: [this.listOfSelectedUsers]
    });
  }

  submitList():void {
    this.onSubmit.emit(true);
    
  }

  addMember(): void {
    if (this.selectedMember != undefined && !this.listOfSelectedUsers.includes(this.selectedMember)) {
      this.listOfSelectedUsers.push(this.selectedMember);
      let index = this.listOfUsers.indexOf(this.selectedMember);
      this.listOfUsers.splice(index, 1)
      this.selectedMember = undefined;
    }
  }

  deleteMember(miembro: Object): void {
    let index = this.listOfSelectedUsers.indexOf(miembro);
    index > -1 ? this.listOfSelectedUsers.splice(index, 1) : console.log('Member Not Found');
  }

}
