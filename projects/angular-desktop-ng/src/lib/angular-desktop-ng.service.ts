import { Injectable, ComponentFactoryResolver, ViewContainerRef,NgModule } from '@angular/core';
import { AngularWindowComponent } from './angular-window/angular-window.component';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AngularDesktopService {
  windows: any[] = []
  countWindows: number = 0;
  viewContainerRef: ViewContainerRef
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  open(url: string, component: any, snapShot: ActivatedRouteSnapshot) {
      let newWindow = true;
      this.windows.forEach((x: any) => {
          if (x.params.url == url) {
              x.app.toTop()
              newWindow = false;
          }
      })
      if (newWindow) {

          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AngularWindowComponent);
          const componentRef = this.viewContainerRef.createComponent(componentFactory);

          const instance = <AngularWindowComponent>componentRef.instance
          instance.close = this.close(instance)
          instance.toTop = this.toTop(instance)
          instance.minimize = this.minimize(instance)
          instance.index = this.countWindows++;
          const params = {
              title: snapShot.data.title,
              icon: snapShot.data.icon ? snapShot.data.icon : null,
              url:url,
          }
          Object.keys(snapShot.data).filter(x=>x!="title" && x!="icon").forEach(x=>{
              params[x]=snapShot.data[x]
          })
          
          snapShot.paramMap.keys.forEach(x => {
              params[x] = snapShot.paramMap.get(x)
          })
          instance.component = component;
          instance.params = params;
          this.windows.forEach(x => x.active = false)
          this.windows.push({ app: instance, view: componentRef.hostView, params: params, active: true })
      }

  }

  close(app: AngularWindowComponent): () => void {
      return () => {
          let index = -1;
          this.windows.forEach((x: any, i: number) => {
              if (x.app == app) {
                  this.viewContainerRef.remove(this.viewContainerRef.indexOf(x.view))
                  index = i;
              }
          })
          this.windows.splice(index, 1)
      }
  }
  minimize(app: AngularWindowComponent): () => void {
      return () => {
          const window = this.windows.find(x => x.app == app)
          if (window) {
              window.app.isMinimized = true;
              window.active = false;
              const topWindow = this.windows.find(x => x != window && !x.app.isMinimized)
              if (topWindow)
                  topWindow.app.toTop()
          }
      }
  }
  toTop(app: AngularWindowComponent): () => void {
      return () => {
          this.windows.forEach((x: any, i: number) => {
              if (x.app == app) {
                  this.viewContainerRef.move(x.view, this.windows.length - 1)
                  x.active = true;
                  x.app.isMinimized = false;
              }
              else
                  x.active = false
          })
      }
  }

}
