import { Injectable } from '@angular/core';
import { SpinnerComponent } from "app/share/spinner/spinner.component";
import { LoaderState } from "app/share/spinner/LoaderState";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SpinnerService {
  
  private loaderSubject = new BehaviorSubject<LoaderState>({show:false});
  public loaderState = this.loaderSubject.asObservable();

  constructor() {

  }

  show(){
    this.loaderSubject.next(<LoaderState>{show:true});
  }

  hide(){
    this.loaderSubject.next(<LoaderState>{show:false});
  }

}
