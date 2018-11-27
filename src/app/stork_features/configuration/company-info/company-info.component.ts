import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CompanyInfoService } from './company-info.service'
import { PhonePipe } from '../../shared/validations/phone.pipe';
import { parseNumber, formatNumber, AsYouType } from 'libphonenumber-js'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { diff } from 'deep-diff';
import { FormCanDeactivate } from "app/stork_features/shared/can-deactivate/form-can-deactivate";
import { Observable } from 'rxjs/Observable';

import { ComponentCanDeactivate } from 'app/stork_features/shared/confirm-dialog/pending-changes.guard';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
  providers: [CompanyInfoService, PhonePipe]
})
export class CompanyInfoComponent implements ComponentCanDeactivate, OnInit {

  @ViewChild('form')
  form: NgForm;

  phone: string;
  companyform: FormGroup;
  disable: boolean;
  modalRef: BsModalRef;
  name: string;
  firstname: string;
  lastname: string;
  title: string;
  validateEmail: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  @ViewChild('confirmtemplate')
  private template: TemplateRef<any>
  currentCompany: any;
  constructor(
    private companyInfoService: CompanyInfoService,
    private formBuilder: FormBuilder,
    private phonePipe: PhonePipe,
    private modalService: BsModalService,
  ) {
   // super()
  }
  submit() {
    console.log(this.form.submitted);
  }
  ngOnInit() {
    this.loadForm();
    this.get_company_info();
  }

  ngAfterViewInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.companyform = this.formBuilder.group({
      _id: '',
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      title: '',
      phone: ['', Validators.required],
      email: ['', Validators.email],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: '',
      country: ''
    });


    this.companyform.valueChanges.subscribe(
      changeddata => {
        debugger;
        if (this.currentCompany != undefined) {
          debugger;
          let differ = diff(this.currentCompany, changeddata).find(x => x.kind == 'E');
          if (differ != undefined)
            this.disable = false;
          else
            this.disable = true;
        }
      });

  }


  //get company info
  get_company_info(): void {
    this.companyInfoService.get_company_info().subscribe(data => {
      debugger;
      if (data.ResponseDetails.ResponseStatus == '10' && data.ResponseMessage.length > 0) {
        this.currentCompany = data.ResponseMessage[0];
        this.companyform.patchValue(this.currentCompany);
      }
    })
  }

  //Create Company info
  company_info(): void {
    debugger;
    if (this.companyform.value._id == "") {
      this.companyInfoService.create_company_info(this.companyform.value).subscribe(data => {
        debugger;
        if (data.ResponseDetails.ResponseStatus != '10' && data.ResponseMessage.Company != null) {

        }
        else {
          this.currentCompany = data.ResponseMessage.Company;
          this.companyform.patchValue(this.currentCompany);
          this.disable = true;
        }
      })
    }
    else {
      this.modalRef = this.modalService.show(this.template);
    }
  }


  //update_company_info 
  update_company_info(): void {
    debugger;
    this.modalRef.hide();
    this.companyInfoService.update_company_info(this.companyform.value).subscribe(data => {
      debugger;
      if (data.ResponseDetails.ResponseStatus != '10') {
      }
      else {
        this.get_company_info();
        this.disable = true;
      }
    })
  }

  //cancel_company_info 
  cancel_company_info(): void {
    debugger;
    this.modalRef.hide();
    this.get_company_info();
    this.disable = true;
  }

  private changeModel(ev) {
    this.phone = ev;
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return !this.companyform.valid || !this.companyform.dirty || this.disable ;
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = "This message is displayed to the user in IE and Edge when they navigate without using Angular routing (type another URL/close the browser/etc)";
    }
  }

}
