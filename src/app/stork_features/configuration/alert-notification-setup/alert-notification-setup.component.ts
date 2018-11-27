
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertNotificationSetupService } from "app/stork_features/configuration/alert-notification-setup/alert-notification-setup-service";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { diff } from 'deep-diff';

@Component({
  selector: 'app-alert-notification',
  templateUrl: './alert-notification-setup.component.html',
  styleUrls: ['./alert-notification-setup.component.scss'],
  providers: [AlertNotificationSetupService]
})
export class AlertNotificationSetupComponent implements OnInit {

  isError: boolean = false;
  selectedalertnotification: any;
  confirmModalRef: BsModalRef;
  errormsg: any;
  addnewlabel: string;
  valuesec: string;
  status: boolean;
  notificationFrequency = [];
  notification_datasource = new MatTableDataSource(this.notificationFrequency);
  addAlertNotificationform: FormGroup;
  editAlertNotificationform: FormGroup;
  position = 'below';
  modalRef: BsModalRef;
  disable: boolean;
  public loading = false;
  statusArr = [{ name: 'Active', value: true }, { name: 'InActive', value: false }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('notificationsort') notificationsort: MatSort;
  displayedColumns = ['label', 'value', 'isactive', 'Action'];

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private alertNotificationSetupService: AlertNotificationSetupService, private cdRef: ChangeDetectorRef) {

    this.addAlertNotificationform = this.formBuilder.group({
      addnewlabel: ['', Validators.required],
      valuesec: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.editAlertNotificationform = this.formBuilder.group({
      addnewlabel: ['', Validators.required],
      valuesec: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {

    this.get_all();

    this.notification_datasource = new MatTableDataSource(this.notificationFrequency);
    this.editAlertNotificationform.valueChanges.subscribe(
      changeddata => {
        debugger;
        if (this.selectedalertnotification != undefined) {
          debugger;
          let alterLabel = diff(this.selectedalertnotification.label, changeddata.addnewlabel);
          let differaddnewlabel = null;
          if (alterLabel != undefined && alterLabel.length > 0) {
            differaddnewlabel = alterLabel.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }
          let alterValueInSec = diff(this.selectedalertnotification.value, changeddata.valuesec);
          let differvaluesec = null;
          if (alterValueInSec != undefined && alterValueInSec.length > 0) {
            differvaluesec = alterValueInSec.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }
          let alterActive = diff(this.selectedalertnotification.isactive, changeddata.status);
          let differActive = null;
          if (alterActive != undefined && alterActive.length > 0) {
            differvaluesec = alterActive.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          if (differaddnewlabel != undefined || differvaluesec != undefined || differActive != undefined) {
            this.disable = false;
          }
          else {
            this.disable = true;
          }
        }
      });
  }

  ngAfterViewInit() {
    this.loadForm();
    this.notification_datasource.sort = this.sort;
  }
  openModal(template: TemplateRef<any>, mode, alertNotification) {
    this.isError = false;
    if (mode == "A") {
      this.addnewlabel = "";
      this.valuesec = "";
      this.status = false;
    }
    else if (mode == "E") {
      debugger;
      this.selectedalertnotification = alertNotification;
    }
    this.modalRef = this.modalService.show(template);
  }
  openConfirmModal(template: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(template);
  }
  //get all
  get_all() {
    this.loading = true;
    this.alertNotificationSetupService.get_all().subscribe(getdata => {
      if (getdata.ResponseDetails.ResponseStatus == '10')
        this.loading = false;
      this.notificationFrequency = getdata.ResponseMessage;
      this.notification_datasource = new MatTableDataSource(this.notificationFrequency)
      this.notification_datasource.paginator = this.paginator;
      this.notification_datasource.sort = this.notificationsort;
    })
  }
  //filter
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.notification_datasource.filter = filterValue;
  }

  //create notification frequency
  create_notification_frequency() {
    this.errormsg = "";
    this.confirmModalRef.hide();

    this.alertNotificationSetupService.create_notification_frequency(this.addAlertNotificationform.value).subscribe(noticationdata => {
      if (noticationdata.ResponseDetails.ResponseStatus != '10') {
        this.isError = true
        if (noticationdata.ResponseMessage["0"].msg) {
          this.errormsg = noticationdata.ResponseMessage["0"].msg;
        }
        else {
          this.errormsg = noticationdata.ResponseMessage;
        }


      }
      else {
        this.modalRef.hide();
        this.notificationFrequency.push(noticationdata.ResponseMessage.Notification_frequency);
        this.notification_datasource = new MatTableDataSource(this.notificationFrequency)
        this.notification_datasource.paginator = this.paginator;
        this.notification_datasource.sort = this.notificationsort;
      }
    })
  }
  update_notification_frequency(id) {
    this.confirmModalRef.hide();
    this.modalRef.hide();
    this.errormsg = "";
    this.alertNotificationSetupService.update_notification_frequency(id, this.editAlertNotificationform.value).subscribe(updatenotificationdata => {
      if (updatenotificationdata.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = updatenotificationdata.ResponseMessage[0].msg;
      }
      else {
        this.get_all();

      }
    })

  }
  delete_notification_frequency_by_Id(id) {
    debugger;
    this.modalRef.hide()
    this.alertNotificationSetupService.delete_notification_frequency_by_Id(id).subscribe(deleteNotificationData => {
      if (deleteNotificationData.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = deleteNotificationData.ResponseMessage[0].msg;
      }
      else {
        this.get_all();

      }
    })
  }
}

