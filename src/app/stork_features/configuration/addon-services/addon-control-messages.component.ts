import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AddonServiceValidationService } from "app/stork_features/configuration/addon-services/addon-appointment-servicesvalidation.service";


@Component({
  selector: 'control-messages',
  template: `<div style="margin-left: 155px;" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return  AddonServiceValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}