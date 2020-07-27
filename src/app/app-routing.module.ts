import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentOne } from './components/component.one';
import { ComponentTwo } from './components/component.two';
import { ComponentThree } from './components/component.three';

export const routes: Routes = [
    { path: 'one/:id', component: ComponentOne,data:{title:"One",icon:"assets/img1.png" }},
    { path: 'one', component: ComponentOne,data:{title:"One",icon:"assets/img1.png",some:"hi"} },
    { path: 'two', component: ComponentTwo,data:{title:"Two"} },
    { path: 'three', component: ComponentThree,data:{title:"three",icon:"assets/img3.png"} },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }