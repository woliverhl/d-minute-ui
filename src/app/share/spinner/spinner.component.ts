import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpinnerService } from "app/share/spinner/spinner.service";
import { LoaderState } from './LoaderState';
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements AfterContentChecked {

  public show:boolean;
  private subscription: Subscription;
  private overlayRef: OverlayRef;
  private userProfilePortal: ComponentPortal<SpinnerComponent>;

  constructor(private loaderService: SpinnerService, private overlay: Overlay) {
    this.show = false;
    this.overlayRef = this.overlay.create({
      height: '100%',
      width: '100%',
    });
    this.userProfilePortal = new ComponentPortal(SpinnerComponent);
    
  }

  openSpinner():void{
    this.overlayRef.hasAttached() ? this.overlayRef.attach(this.userProfilePortal) : undefined;
  }

  detachSpinner():void{
    this.overlayRef.detach();
  }

  ngAfterContentChecked() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) =>{
      if (state['show'] != undefined &&  this.show !== state['show']){
        this.show = state.show;
        setTimeout(() => {
          this.show ? this.openSpinner() : this.detachSpinner();
        },0);
        
      } 
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
