import { Component, OnInit, Input, ElementRef, ViewChild,  ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { fromEvent } from 'rxjs'
import { filter, take, tap } from 'rxjs/operators'
import { AdDirective } from '../angular-add-host.directive';

export enum Position { Default, Left, Right, Maximized }
export enum TypeDrag { Move, Top, Bottom, Left, Right, TopRight, BottomRight, TopLeft, BottomLeft }

@Component({
  selector: 'angular-window',
  templateUrl: './angular-window.component.html',
  styleUrls: ['./angular-window.component.css']
})
export class AngularWindowComponent implements OnInit {

  @ViewChild('window') modal: ElementRef
  get style() { return { ...this._style, position: 'absolute' } }
  @Input() title: string;
  _style: any
  rect: any;
  rectOld: any;
  incr: number[] = [0, 0, 0, 0]
  position: Position = Position.Default
  nativeElement: any;
  typeDrag: TypeDrag;
  origin: any;
  onDrag: boolean = false;
  moveSubscription: any;
  IPosition = Position;
  classNames = [
    "cell-top",
    "cell-border-top",
    "cell-border-bottom",
    "cell-border-left",
    "cell-border-right",
    "cell-top-right",
    "cell-bottom-right",
    "cell-top-left",
    "cell-bottom-left"]

  data: any;
  desktop: any;
  index: number = 0;
  params: any;
  component: any;
  isMinimized: boolean = false;
  close: () => void;
  toTop: () => void;
  minimize: () => void;

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;
  constructor(private elementRef: ElementRef, private cfr: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
//    const rect = this.nativeElement.getBoundingClientRect();

    this.nativeElement = this.modal.nativeElement
    if (this.elementRef.nativeElement.parentElement.className == "desktop")
        this.desktop = this.elementRef.nativeElement.parentElement;

    const rectDesktop = this.desktop ? this.desktop.getBoundingClientRect() : null

        this.rectOld = { top: rectDesktop.width/4 * Math.random(), left: rectDesktop.height/4 * Math.random(), width: rectDesktop.width/2, height: rectDesktop.height/2 };

/*    this.nativeElement.style.top = 100 * Math.random() + "px"
    this.nativeElement.style.left = 100 * Math.random() + "px"
    this.nativeElement.style.height = "260px"
    this.nativeElement.style.width = "500px"
  */
   this.position=Position.Maximized;

  

    if (this.component) {
      const ref = this.loadComponent(this.adHost.viewContainerRef, this.component);
      (ref.instance as any).params = this.params
      const height = this.elementRef.nativeElement.offsetParent.getBoundingClientRect().height
      this.setPosition({ top: 0, height: rectDesktop ? rectDesktop.height : 100, left: 0, width: window.innerWidth }, Position.Maximized)
      }
  }
  ngOnInit(): void {
    fromEvent(this.elementRef.nativeElement, 'mousedown').pipe(
      tap((event) => {
        this.toTop()
      }),
      filter((event: MouseEvent) => {
        this.toTop();
        const classs = (event.target as any).className
        if (classs && typeof classs === 'string') {
          const className = classs.split(' ');
          return className.length > 1 ? this.classNames.indexOf(className[1]) >= 0 : this.classNames.indexOf(className[0]) >= 0
        }
        return false
      }),
    ).subscribe((event: MouseEvent) => {
      const rect = this.nativeElement.getBoundingClientRect();
      const rectDesktop = this.desktop ? this.desktop.getBoundingClientRect() : null

      this.rect = { top: rect.top - (rectDesktop ? rectDesktop.y : 0), left: rect.left, width: rect.width, height: rect.height };
      if (this.position == Position.Default) {
        this.rectOld = { top: rect.top - (rectDesktop ? rectDesktop.y : 0), left: rect.left, width: rect.width, height: rect.height };

      }
      this.onDrag = true;
      const className = (event.target as any).className.split(' ');
      this.typeDrag = (className.length > 1 ? this.classNames.indexOf(className[1]) : this.classNames.indexOf(className[0])) as TypeDrag
      this.incr = this.typeDrag == TypeDrag.Move ? [1, 0, 1, 0] :
        this.typeDrag == TypeDrag.Top ? [1, -1, 0, 0] :
          this.typeDrag == TypeDrag.Bottom ? [0, 1, 0, 0] :
            this.typeDrag == TypeDrag.Right ? [0, 0, 0, 1] :
              this.typeDrag == TypeDrag.Left ? [0, 0, 1, -1] :
                this.typeDrag == TypeDrag.TopRight ? [1, -1, 0, 1] :
                  this.typeDrag == TypeDrag.TopLeft ? [1, -1, 1, -1] :
                    this.typeDrag == TypeDrag.BottomRight ? [0, 1, 0, 1] :
                      [0, 1, 1, -1]

      this.origin = { x: event.screenX, y: event.screenY }
      this.onDrag = true;
      fromEvent(document, "mouseup").pipe(take(1)).subscribe(() => {
        if (this.moveSubscription) {
          this.moveSubscription.unsubscribe();
          this.moveSubscription = undefined;
          this.onDrag = false
        }
        const rect = this.nativeElement.getBoundingClientRect();
        const rectDesktop = this.desktop ? this.desktop.getBoundingClientRect() : null
        if (this.typeDrag == TypeDrag.Move) {
          if (rect.x < 0) {
            this.setPosition({ top: 0, height: rectDesktop ? rectDesktop.height : window.innerHeight, left: 0, width: window.innerWidth / 2 }, Position.Left)

          }
          else {
            if (rect.x + rect.width > window.innerWidth) {
              this.setPosition({
                top: 0,
                height: rectDesktop ? rectDesktop.height : window.innerHeight,
                left: window.innerWidth / 2,
                width: window.innerWidth / 2
              }, Position.Right)

            }
          }

        }
        if (this.position == Position.Default) {
          this.rect = { top: rect.top - (rectDesktop ? rectDesktop.y : 0), left: rect.left, width: rect.width, height: rect.height };
          this.rectOld = { top: rect.top - (rectDesktop ? rectDesktop.y : 0), left: rect.left, width: rect.width, height: rect.height };
        }

      })

      if (!this.moveSubscription) {
        this.moveSubscription = fromEvent(document, 'mousemove').subscribe((moveEvent: MouseEvent) => {
          this.position != Position.Default && this.typeDrag == TypeDrag.Move && this.restore(this.origin);
          const incrTop = moveEvent.screenY - this.origin.y
          const incrLeft = moveEvent.screenX - this.origin.x
          const width = this.rect.width + this.incr[3] * incrLeft
          const heigth = this.rect.height + this.incr[1] * incrTop
          this.nativeElement.style.top = this.rect.top + this.incr[0] * incrTop + 'px'
          this.nativeElement.style.height = (heigth < 75 ? 75 : heigth) + 'px'
          this.nativeElement.style.left = this.rect.left + this.incr[2] * incrLeft + 'px'
          this.nativeElement.style.width = (width < 50 ? 50 : width) + 'px'

        })
      }
    })



  }
  loadComponent(vcr: ViewContainerRef, component: any) {
    return vcr.createComponent(
      this.cfr.resolveComponentFactory(component)
    );
  }
  show(mostrar: boolean) {
    this.isMinimized = !mostrar;
  }
  restore(point: any = null) {
    const rect = { ...this.rectOld }
    if (point) {
      rect.left = point.x - rect.width / 2
      rect.top = 0
    }
    this.setPosition(rect, Position.Default)

  }
  maximize() {
    if (this.position == Position.Default) {
      const rect = this.nativeElement.getBoundingClientRect();
      this.rectOld = { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
    }
    const rectDesktop = this.desktop ? this.desktop.getBoundingClientRect() : null
    const height = this.elementRef.nativeElement.offsetParent.getBoundingClientRect().height
    this.setPosition({ top: 0, height: rectDesktop ? rectDesktop.height : 100, left: 0, width: window.innerWidth }, Position.Maximized)

  }
  setPosition(rect: any, position: Position) {
    this.rect = rect;
    this.position = position
    this.nativeElement.style.top = this.rect.top + 'px'
    this.nativeElement.style.height = this.rect.height + 'px'
    this.nativeElement.style.left = this.rect.left + 'px'
    this.nativeElement.style.width = this.rect.width + 'px'

  }

}
