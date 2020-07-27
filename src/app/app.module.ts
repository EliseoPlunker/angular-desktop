import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AngularDesktopModule} from '../../projects/angular-desktop-ng/src/lib/angular-desktop-ng.module'

import { AppComponent } from './app.component';
import { ComponentOne } from './components/component.one';
import { ComponentTwo } from './components/component.two';
import { ComponentThree } from './components/component.three';

@NgModule({
  imports:      [ BrowserModule, FormsModule,AngularDesktopModule,NgbModule,AppRoutingModule ],
  declarations: [ AppComponent, ComponentOne,ComponentThree,ComponentTwo ],
  bootstrap:    [ AppComponent ],
  entryComponents:[ComponentOne,ComponentThree,ComponentTwo]
})
export class AppModule { }
