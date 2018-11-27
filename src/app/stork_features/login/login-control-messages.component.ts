import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginValidationService } from './loginvalidation.service';

@Component({
  selector: 'control-messages',
  template: `<div style="    margin-top: -10px;" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return LoginValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}