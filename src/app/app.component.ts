import { Component, VERSION } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
 title = 'App-desktop';
  constructor(private router: Router) { }

  open(path: string, data: any = null) {
    this.router.navigate([path], { skipLocationChange: true })
  }
}
