import { Component, Input,AfterViewInit } from '@angular/core';

@Component({
  selector: 'component-one',
  template: `<h1>Hello component one</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class ComponentOne implements AfterViewInit {
  params:any;
ngAfterViewInit()
{
  if (this.params.id)
     this.params.title="Component one:"+this.params.id
}
}
