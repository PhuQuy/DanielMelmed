import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { AlertNotificationService } from './alert-notification.service';
import { MatTableDataSource } from '@angular/material';
import { BookMassageService } from '../book-massage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appointment_notification, notification_frequency } from '../model/appointment_notification.model';

@Component({
  selector: 'app-alert-notification',
  templateUrl: './alert-notification.component.html',
  styleUrls: ['./alert-notification.component.scss'],
  providers: []
})
export class AlertNotificationComponent implements OnInit {
  service_displayedColumns = ['sms', 'email', 'label', 'adddelete']
  labelData: notification_frequency[];

  cTherapist: appointment_notification;
  cCustomer: appointment_notification;
  rThreapist: appointment_notification;
  rCustomer: appointment_notification;


  public CfieldArrayT: Array<any> = [];
  public CfieldArrayC: Array<any> = [];
  public RfieldArrayT: Array<any> = [];
  public RfieldArrayC: Array<any> = [];
  dataSource = new MatTableDataSource(this.RfieldArrayT);

  @ViewChild('tmpalertnotification')
  private tmpalertnotification: TemplateRef<any>
  modalRef: BsModalRef;


  constructor(
    public bookMassageService: BookMassageService,
    public modalService: BsModalService,
  ) {
  }

  ngOnInit() {

  }

  show() {
    debugger;
    this.cCustomer = new appointment_notification(false, false, null, null, "ccustomer", null, true);
    this.cTherapist = new appointment_notification(false, false, null, null, "ctherapist", null, true);

    this.rThreapist = new appointment_notification(false, false, null, null, "rtherapist", null, true);
    this.rCustomer = new appointment_notification(false, false, null, null, "rcustomer", null, true);

    this.bookMassageService.get_notification_label().subscribe(labelData => {
      debugger;
      this.labelData = labelData.ResponseMessage;
      this.modalRef = this.modalService.show(this.tmpalertnotification);
    })

  }

  hide() {
    this.modalRef.hide();
  }

  //Confirmation Thrapist

  addFieldValueForTherapists(cTherapist: appointment_notification) {
    debugger;
    debugger;
    if (cTherapist.occurrence.value != undefined) {
      this.cTherapist.type = "ctherapist";
      this.CfieldArrayT.push(this.cTherapist)
      this.dataSource = new MatTableDataSource(this.CfieldArrayT);
      this.cTherapist = new appointment_notification(false, false, null, null, "ccustomer", null, true);
    }

  }

  deleteFieldValueForTherapists(index) {
    this.CfieldArrayT.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.CfieldArrayT);

  }

  //Confirmation Customer

  addFieldValueForCustomer(cCustomer: appointment_notification) {
    debugger;
    if (cCustomer.occurrence.value != undefined) {
      this.cCustomer.type = "ccustomer";
      this.CfieldArrayC.push(this.cCustomer)
      this.dataSource = new MatTableDataSource(this.CfieldArrayC);
      this.cCustomer = new appointment_notification(false, false, null, null, "ccustomer", null, true);
    }

  }

  deleteFieldValueForCustomer(index) {
    this.CfieldArrayC.splice(index, 1);
  }

  //Reminder Threapist

  addFieldValueForRTherapists(rThreapist: appointment_notification) {
    debugger;
    if (rThreapist.occurrence.value != undefined) {
      this.rThreapist.type = "rtherapist";
      this.RfieldArrayT.push(this.rThreapist)
      this.dataSource = new MatTableDataSource(this.RfieldArrayT);
      this.rThreapist = new appointment_notification(false, false, null, null, "therapist", null, true);
    }
  }

  deleteFieldValueForRTherapists(index) {
    this.RfieldArrayT.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.RfieldArrayT);
  }

  //Reminder Customer

  addFieldValueForRCustomer(rCustomer: appointment_notification) {
    debugger;
    if (rCustomer.occurrence.value != undefined) {
      this.rCustomer.type = "rcustomer";
      this.RfieldArrayC.push(this.rCustomer)
      this.dataSource = new MatTableDataSource(this.RfieldArrayC);
      this.rCustomer = new appointment_notification(false, false, null, null, "therapist", null, true);
    }
  }

  deleteFieldValueForRCustomer(index) {
    this.RfieldArrayC.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.RfieldArrayC);

  }
}
