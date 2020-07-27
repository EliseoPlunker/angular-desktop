import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AngularWindowComponent } from './angular-window/angular-window.component'
import { AngularDesktopComponent } from './angular-desktop/angular-desktop.component';
import { AdDirective } from './angular-add-host.directive'


@NgModule({
  declarations: [
    AngularWindowComponent, AngularDesktopComponent, AdDirective
  ],
  imports: [
    BrowserModule
  ],
  exports:[AngularDesktopComponent],
  entryComponents:[AngularWindowComponent],
})
export class AngularDesktopModule { }
