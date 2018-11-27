import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegionServiceValidationService } from "app/stork_features/configuration/regional-services/region-servicesvalidation.service";

@Component({
  selector: 'control-messages',
  template: `<div style="margin-left: 136px;" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return RegionServiceValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}