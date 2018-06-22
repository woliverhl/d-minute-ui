import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry) {
    //add custom material icons
    matIconRegistry.addSvgIcon('delete', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/delete-empty.svg'));
    matIconRegistry.addSvgIcon('email', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/email.svg'));
    matIconRegistry.addSvgIcon('password', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lock-question.svg'));
  }
}


