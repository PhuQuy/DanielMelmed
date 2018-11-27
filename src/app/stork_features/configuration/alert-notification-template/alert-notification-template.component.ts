import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertNotificationTemplateService } from "app/stork_features/configuration/alert-notification-template/alert-notification-template.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { diff } from 'deep-diff';

@Component({
  selector: 'app-alert-notification-template',
  templateUrl: './alert-notification-template.component.html',
  styleUrls: ['./alert-notification-template.component.scss'],
  providers: [AlertNotificationTemplateService]

})
export class AlertNotificationTemplateComponent implements OnInit {
  errormsg: any;
  selectednotificationtempalte: any;
  templateform: FormGroup;
  smstemplateform: FormGroup;
  isError: boolean;
  temp: any;
  addTemplate = [];
  notifType: any;
  position = 'below';
  modalRef: BsModalRef;
  confirmModalRef: BsModalRef;
  smsBody: string;
  subject: string;
  emailBody: string;
  userstatus: string;
  usertype: string;
  selectedsmsbody: string;
  selectedsubject: string;
  selectedemailbody: string;
  disable: boolean;

  userType = [
    { name: 'Customer', value: 'Customer' },
    { name: 'Therapist', value: 'Therapist' }
  ];
  userStaus = [
    { name: 'Created', value: 'appointment_created' },
    { name: 'Confirmed', value: 'appointment_confirmed' },
    { name: 'Reminder', value: 'appointment_reminder' }
  ];

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private alertNotificationTemplateService: AlertNotificationTemplateService) {
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.templateform = this.formBuilder.group({
      usertype: '',
      userstatus: '',
      smsBody: '',
      subject: '',
      emailBody: ''
    });

    this.smstemplateform = this.formBuilder.group({
      smsBody: ''
    });

    this.templateform.valueChanges.subscribe(
      changeddata => {
        let differsubject = undefined;
        if (this.selectedsubject != undefined) {
          let subject = diff(this.selectedsubject, changeddata.subject);
          if (subject != undefined && subject.length > 0) {
            differsubject = subject.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }
        }

        let differemailbody = undefined;
        if (this.selectedemailbody != undefined) {
          let emailbody = diff(this.selectedemailbody, changeddata.emailBody);
          if (emailbody != undefined && emailbody.length > 0) {
            differemailbody = emailbody.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }
        }

        if (differsubject != undefined || differemailbody != undefined) {
          this.disable = false;
        }
        else {
          this.disable = true;
        }

      });

    this.smstemplateform.valueChanges.subscribe(
      changeddata => {
        debugger;
        if (this.selectedsmsbody != undefined) {
          debugger;
          let smsBody = diff(this.selectedsmsbody, changeddata.smsBody);
          let differsmsBody = null;
          if (smsBody != undefined && smsBody.length > 0) {
            differsmsBody = smsBody.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          if (differsmsBody != undefined) {
            this.disable = false;
          }
          else {
            this.disable = true;
          }
        }
      });

    this.smstemplateform.valueChanges.subscribe(
      changeddata => {
        debugger;
        if (this.selectedsmsbody != undefined) {
          debugger;
          let smsBody = diff(this.selectedsmsbody, changeddata.smsBody);
          let differsmsBody = null;
          if (smsBody != undefined && smsBody.length > 0) {
            differsmsBody = smsBody.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          if (differsmsBody != undefined) {
            this.disable = false;
          }
          else {
            this.disable = true;
          }
        }
      });

    this.get_all();
  }

  openModal(editTemplate: TemplateRef<any>, mode, selectedtemplate) {
    if (mode == "A") {
      this.isError = false;
      this.smsBody = "";
      this.subject = "";
      this.emailBody = "";
      this.modalRef = this.modalService.show(editTemplate);
    }
    else if (mode == "E") {
      if (selectedtemplate.smsBody != undefined)
        this.selectedsmsbody = selectedtemplate.smsBody;
      if (selectedtemplate.subject != undefined)
        this.selectedsubject = selectedtemplate.subject;
      if (selectedtemplate.emailBody != undefined)
        this.selectedemailbody = selectedtemplate.emailBody;
      this.modalRef = this.modalService.show(editTemplate);
    }
    else {
      this.modalRef = this.modalService.show(editTemplate);
    }
  }

  openConfirmModal(template: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(template);
  }

  get_all() {
    this.alertNotificationTemplateService.get_all().subscribe(templatedata => {
      if (templatedata.ResponseDetails.ResponseStatus != '10') {
      }
      else {
        debugger;
        this.addTemplate = templatedata.ResponseMessage;

      }

    })
  }

  ngAfterViewInit() {
    this.loadForm();
  }

  create_template() {
    this.errormsg = ""
    this.confirmModalRef.hide()

    if (this.userstatus == "appointment_reminder") {
      this.notifType = this.userstatus + '_for_' + this.usertype
    }
    else {
      this.notifType = this.userstatus + '_for_' + this.usertype
    }
    this.alertNotificationTemplateService.create_template(this.smsBody, this.emailBody, this.subject, this.usertype, this.notifType)
      .subscribe(addTemplateData => {
        if (addTemplateData.ResponseDetails.ResponseStatus != '10') {
          this.isError = true
          if (addTemplateData.ResponseMessage["0"].msg) {
            this.errormsg = addTemplateData.ResponseMessage["0"].msg;
          }
          else {
            this.errormsg = addTemplateData.ResponseMessage;
          }
        }
        else {
          this.modalRef.hide();
          this.addTemplate.push(addTemplateData.ResponseMessage.Template);

        }
      })
  }

  update_template_for_sms(id, smsBody, subject, type, notifType, emailBody, appBody) {
    // this.confirmModalRef.hide()
    this.modalRef.hide()
    this.alertNotificationTemplateService.update_template_for_sms(id, smsBody, subject, type, notifType, emailBody, appBody).subscribe(updateTemplateData => {
      if (updateTemplateData.ResponseDetails.ResponseStatus != '10') {

      }
      else {

        this.get_all;
      }
    })

  }

  update_template_for_email(id, smsBody, subject, type, notifType, emailBody, appBody) {
    this.modalRef.hide()
    this.alertNotificationTemplateService.update_template_for_email(id, smsBody, subject, type, notifType, emailBody, appBody).subscribe(updateTemplateData => {
      if (updateTemplateData.ResponseDetails.ResponseStatus != '10') {

      }
      else {

        this.get_all;
      }
    })

  }

  delete_template_by_Id(id) {
    debugger;
    this.modalRef.hide();
    this.alertNotificationTemplateService.delete_template_by_Id(id).subscribe(deleteTemplateData => {
      if (deleteTemplateData.ResponseDetails.ResponseStatus != '10') {
        //   this.errormsg = deleteTemplateData.ResponseMessage[0].msg;
      }
      else {
        this.get_all();
      }
    })

  }
}
