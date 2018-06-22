import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Materials Stuff
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_LABEL_GLOBAL_OPTIONS, MatIconRegistry } from "@angular/material";
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

//CDK
import { OverlayModule, OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from 'app/app.component';
import { SessionComponent } from 'app/session/toolbar/session.component';
import { SignOnComponent } from 'app/session/sign-on/sign-on.component';
import { SignInComponent } from 'app/session/sign-in/sign-in.component';
import { ProjectListComponent, AddProjectDialog } from 'app/projects/project-list/project-list.component';
import { ProjectDetailsComponent, Atendants } from 'app/projects/project-details/project-details.component';
import { SpinnerComponent } from './share/spinner/spinner.component';

//Modelos
import { restPath } from "app/share/constants/restPath";
import { Project } from "app/models/project";
import { User } from "app/models/user";
import { Reunion } from "app/models/reunion";
import { Usuario } from "app/models/usuario";

//Services
import { SessionService } from "app/session/service/session.service";
import { ProjectsService } from "app/projects/service/projects-service.service";
import { UsersService } from "app/user/service/users.service";
import { SpinnerService } from "app/share/spinner/spinner.service";

//Interceptors
import { AuthInterceptorService } from "app/interceptors/auth-interceptor.service";

//Guards
import { authGuard } from "app/share/guards/authenticate-guard";
import { UsersListComponent } from './user/users-list/users-list.component';
import { CreateUserComponent } from './user/create-user/create-user.component';


const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-on', component: SignOnComponent },
  { path: '', redirectTo: '/sign-on', pathMatch: 'full' },
  { path: 'project-list', component: ProjectListComponent, canActivate: [authGuard] },
  { path: 'project/:id', component: ProjectDetailsComponent, canActivate: [authGuard] }
];


@NgModule({
  entryComponents: [AddProjectDialog, Atendants, SpinnerComponent,CreateUserComponent],
  declarations: [
    AppComponent,
    SessionComponent,
    SignOnComponent,
    SignInComponent,
    ProjectListComponent,
    AddProjectDialog,
    SpinnerComponent,
    ProjectDetailsComponent,
    Atendants,
    UsersListComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    OverlayModule,
    PortalModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  providers: [
        {
          provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } 
        },{ 
          provide: OverlayContainer, useClass: FullscreenOverlayContainer 
        },{
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        },
          SessionService,
          restPath,
          Project,
          User,
          Usuario,
          Reunion,
          ProjectsService,
          UsersService,
          authGuard,
          SpinnerService
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
