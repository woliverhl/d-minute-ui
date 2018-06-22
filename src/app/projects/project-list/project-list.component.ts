import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { ProjectsService } from "app/projects/service/projects-service.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from "app/user/service/users.service";
import { SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from "app/models/project";
import { CreateUserComponent } from "app/user/create-user/create-user.component";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  public listArray:Object;

  constructor(private projectsService: ProjectsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.listAllProjects();
  }

  public listAllProjects(){
    this.projectsService.listProjects().subscribe(
      (response) => {
        this.listArray = response;
      }, (err) => {
        console.log(err);
      });
  }

  openProyectDialog(): void{
    let dialogRef = this.dialog.open(AddProjectDialog, {
      width: '80%',
      height: '60%',
      data: {}
    });

    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openUserDialog(): void{
    let userDialogRef = this.dialog.open(CreateUserComponent, {
      width: '80%',
      height: '60%',
      data: {}
    });

    // dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  reloadList(isPosted:boolean):void{
    isPosted ? this.listAllProjects(): undefined;
  }

}


@Component({
  selector: 'add-project-dialog',
  templateUrl: './add-project-dialog.html',
  styleUrls: ['./add-project-dialog.scss']
})
export class AddProjectDialog implements OnInit {

  public listOfUsers: any;
  public addProjectForm: FormGroup;
  public selectedMember: Object;
  public saved: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialog>, private UsersService: UsersService, 
    private fb: FormBuilder, public Project: Project, private projectsService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.createProjectForm();
      this.Project.usuariosNuevoProyecto = [];
    }


  ngOnInit() {
    setTimeout(() => {
      this.UsersService.getListUsers().subscribe(
        (response:Array<Object>) => {
          this.listOfUsers = response.map((cv) => {
            return Object.assign({ fullName: `${cv['nombre']} ${cv['apellido']}` }, cv);
          });
        },
        (err) => {
          console.log(err)
        }
      );
    }, 0);
  }

  createProjectForm() {
    this.addProjectForm = this.fb.group({
      name: [this.Project.nombre, Validators.required],
      description: [this.Project.descripcion],
      startDate: [this.Project.fechaInicio, Validators.required],
      deathLine: [this.Project.fechaFin, Validators.required],
      usuariosNuevoProyecto: [this.Project.usuariosNuevoProyecto],
      selectedMember: [this.selectedMember]
    });
  }

  addMember():void{
    if (this.selectedMember != undefined && !this.Project.usuariosNuevoProyecto.includes(this.selectedMember)){
      this.Project.usuariosNuevoProyecto.push(this.selectedMember);
      let index = this.listOfUsers.indexOf(this.selectedMember);
      this.listOfUsers.splice(index, 1) 
      this.selectedMember = undefined;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteMember(miembro: Object): void{
    let index = this.Project.usuariosNuevoProyecto.indexOf(miembro);
    index > -1 ? this.Project.usuariosNuevoProyecto.splice(index, 1) : console.log('Member Not Found');
  }

  postProject(){
    if(this.addProjectForm.valid){
      let postObject = Object.assign({}, this.Project);
      this.Project.usuariosNuevoProyecto = this.Project.usuariosNuevoProyecto.map((cv, i) => {
        return {username: cv['username']};
      });
      this.projectsService.addProject(this.Project).subscribe((response) => {
        this.onNoClick();
        this.saved.emit(true);
        console.log(response);
      }, (err) => {
        console.log(err);
      });
    }
    
  }

}
