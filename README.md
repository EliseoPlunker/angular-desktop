# AngularDesktop

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.
The aim is create a "style window" desktop in an Angular Application

## Use
Include in your module

```
import { AngularDesktopModule } from 'angular-desktop-ng'
@NgModule({
  declarations: [...],
  imports: [
    ...
    AngularDesktopModule,
  ],
  entryComponents:[...]
  ...
})
```

This library use bootstrap.css, donwload from Bootstrap, put in a folder, e.g. in `./css` and include in your angular.json

```
            "styles": [
              "css/bootstrap.min.css",
              "src/styles.css"
            ],
 ```

Your main.app is like
```
<app-desktop background-image='url("https://picsum.photos/3840/2160?random=1")' toolbar-background='#004172'>
  <!-- use a menu of your choose, e.g. a ngbDropDown from ng-bootstrap -->
  <div ngbDropdown class="float-left mr-2 pt-1 pb-1">
    <div ngbDropdownToggle>
      <img src="assets/home.png">
    </div>

    <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
      <button ngbDropdownItem (click)="open('one')">Component One</button>
      <button ngbDropdownItem (click)="open('two')">Component Two</button>
      <button ngbDropdownItem (click)="open('one/2')">Component One/2</button>
      <button ngbDropdownItem (click)="open('lazy/one')">Lazy One Component</button>
    </div>
  </div>
</app-desktop>
```

Althougth it's possible use navigate as ussuall, it's better look if you use `{ skipLocationChange: true }`

The routes can has a data a title, an icon, e.g.
```
{ path: 'myComponent', component: MyComponent,data:{title:"My Component",icon:"assets/img3.png"} },
```

And you need **include** in entryComponents of your modules the Components.

### routes with parameters

A path like
```
    { path: 'MyComponent/:id', component: MyComponent,data:{title:"One"} },
 
```
need declare as variable params
```
params:any
```

And you get in `params.id` the parameter. Really params is an object that store also the properties
* url
* title
* icon
* any params from the route
* any property of data futhermore title and icon

(this allow us, e.g. change the title of the window)

