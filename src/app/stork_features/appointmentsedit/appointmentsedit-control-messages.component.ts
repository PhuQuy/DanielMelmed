import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppointmentseditValidationService } from "app/stork_features/appointmentsedit/appointmentsedit-servicesvalidation.service";

@Component({
  selector: 'control-messages',
  template: `<div style="margin-left: 20px;" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return AppointmentseditValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}