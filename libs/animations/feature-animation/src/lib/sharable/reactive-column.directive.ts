import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[jzReactiveColumn]',
})
export class ReactiveColumnDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {
    //this.el.nativeElement.style.backgroundColor = 'red';
  }

  ngOnInit() {
    const el = this.el.nativeElement;
    const renderer = this.renderer;
    renderer.addClass(el, 'p-col-12');
    renderer.addClass(el, 'p-md-6');
    renderer.addClass(el, 'p-lg-4');
    renderer.addClass(el, 'p-xl-2');
    //renderer.addClass(el,'p-justify-even');
    //renderer.addClass(el,'p-justify-center');
    //el.nativeElement.style.backgroundColor = 'yellow';
  }
}
