import {Directive, ElementRef, HostListener, inject, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[changeFontColor]',
  standalone: true
})
export class ChangeColorDirective {

  @Input('color') color!: any;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight();
  }

  highlight() {
   this.renderer.setStyle(this.el.nativeElement, 'color', this.color);
  }

}