import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { PhonePipe } from './phone.pipe';

@Directive({ selector: "[phoneFormatter]" })
export class MyCurrencyFormatterDirective implements OnInit {

    private el: any;

    constructor(
        private elementRef: ElementRef,
        private phonePipe: PhonePipe
    ) {
        this.el = this.elementRef.nativeElement;

    }

    ngOnInit() {
        this.el.value = this.phonePipe.transform(this.el.value);
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        this.el.value = this.phonePipe.transform(value); // opossite of transform
    }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        this.el.value = this.phonePipe.transform(value);
    }

}