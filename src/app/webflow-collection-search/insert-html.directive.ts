import { Directive, ViewContainerRef, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appInsertHtml]'
})
export class InsertHtmlDirective implements OnInit, OnDestroy {
  private _added: ChildNode[] = [];
  @Input()
  public html: string;

  constructor(
    public elemRef: ElementRef<HTMLElement>,
    private domSanitizer: DomSanitizer,
  ) {
    console.log(elemRef);
  }

  public ngOnInit() {
    const container = document.createElement('div');

    container.innerHTML = this.html;
    container.childNodes.forEach((child) => {
      this._added.push(this.elemRef.nativeElement.parentElement.insertBefore(child, this.elemRef.nativeElement));
    });


  }
  public ngOnDestroy() {
    while (this._added.length) {
      const elm = this._added.shift();
      elm.remove();
    }
  }

}
