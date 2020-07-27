import {
  Component, OnInit, ViewChild,  ElementRef, Attribute
} from '@angular/core';
import { AdDirective } from '../angular-add-host.directive';
import { AngularDesktopService } from '../angular-desktop-ng.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { filter, tap,  map } from 'rxjs/operators'

@Component({
  selector: 'angular-desktop',
  templateUrl: './angular-desktop.component.html',
  styleUrls: ['./angular-desktop.component.css'],
  providers:[AngularDesktopService]
})
export class AngularDesktopComponent implements OnInit {

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;
  path: string = null;
  constructor(@Attribute('background-image') public backgroundImage: string,
    @Attribute('toolbar-background') public toolbarBackground: string,
    public desktopService: AngularDesktopService,
    private elementRef: ElementRef, private router: Router, private activatedRoute: ActivatedRoute ) { }
  getBoundingClientRect() {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }
  ngOnInit(): void {
    let path = "";
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      tap((res: any) => path = res.url),
      map(() => this.rootRoute(this.activatedRoute)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
    ).subscribe((route: ActivatedRoute) => {
      if (path != "/") {
        if (!this.desktopService.viewContainerRef)
          this.desktopService.viewContainerRef = this.adHost.viewContainerRef

        this.desktopService.open(path, route.component, route.snapshot)
      }
    });
  }
  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
