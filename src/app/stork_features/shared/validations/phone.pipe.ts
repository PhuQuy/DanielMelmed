import { Pipe, PipeTransform } from '@angular/core';
import { format, ParsedNumber,AsYouType } from 'libphonenumber-js';


@Pipe({ name: "phoneformat" })
export class PhonePipe implements PipeTransform {

    transform(value: string, args?: string): any {
        if (!value) {
            return value;
        }
        return new AsYouType('US').input(value);
    }

}