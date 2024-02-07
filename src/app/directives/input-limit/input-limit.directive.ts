import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputLimit]'
})
export class InputLimitDirective {
  @Input() max: number = 0;
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    
    const initialValue = this.el.nativeElement.value;

    // Jika nilai input melebihi batas maksimum, atur nilainya ke batas maksimum
    if (!isNaN(initialValue) && initialValue > this.max) {
      this.el.nativeElement.value = null;
      event.stopPropagation();  
    }
  }
}
