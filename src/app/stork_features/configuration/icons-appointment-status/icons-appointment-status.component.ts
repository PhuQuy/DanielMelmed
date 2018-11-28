import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IconAppointmentService } from "app/stork_features/configuration/icons-appointment-status/icon-appointment-services.service";
import { LoadingModule } from 'ngx-loading';
import { diff } from 'deep-diff';

@Component({
  selector: 'app-icons-appointment-status',
  templateUrl: './icons-appointment-status.component.html',
  styleUrls: ['./icons-appointment-status.component.scss'],
  providers: [IconAppointmentService]
})
export class IconsAppointmentStatusComponent implements OnInit {
  [x: string]: any;
  isError: boolean = false;
  selectedicon: any;
  selectedicon_fontcolor: string;
  selectedicon_backgroundcolor: string;
  selectedicon_icon_color: string;
  backgroundcolor: string;
  fontcolor: string;
  statusname: any;
  iconcolor: any;
  iconclass: string;
  appStatus_dataSource: MatTableDataSource<{}>;
  appStatus: any = [];
  errormsg: any;
  position = 'below';
  modalRef: BsModalRef;
  confirmModalRef: BsModalRef;
  iconappform: FormGroup;
  iconStatus: boolean
  disable: boolean;
  public loading = false;
  constructor(private cdRef: ChangeDetectorRef, private modalService: BsModalService, private formBuilder: FormBuilder, private iconAppointmentService: IconAppointmentService) {
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.iconappform = this.formBuilder.group({
      iconclass: ['', Validators.required],
      iconcolor: ['', Validators.required],
      statusname: '',
      fontcolor: '',
      backgroundcolor: '',
      iconimage: ''
    });
    this.get_all();
    this.iconappform.valueChanges.subscribe(
      changeddata => {
        //debugger;
        if (this.selectedicon != undefined) {
          //debugger;
          let statusname = diff(this.selectedicon.name, changeddata.statusname);
          let differstatusname = null;
          if (statusname != undefined && statusname.length > 0) {
            differstatusname = statusname.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }
          let iconclass = diff(this.selectedicon.icon.class_name, changeddata.iconclass);
          let differiconclass = null;
          if (iconclass != undefined && iconclass.length > 0) {
            differiconclass = iconclass.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let iconcolor = diff(this.selectedicon_icon_color, changeddata.iconcolor);
          let differiconcolor = null;
          if (iconcolor != undefined && iconcolor.length > 0) {
            differiconcolor = iconcolor.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let fontcolor = diff(this.selectedicon_fontcolor, changeddata.fontcolor);
          let differfontcolor = null;
          if (fontcolor != undefined && fontcolor.length > 0) {
            differfontcolor = fontcolor.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let backgroundcolor = diff(this.selectedicon_backgroundcolor, changeddata.backgroundcolor);
          let differbackgroundcolor = null;
          if (backgroundcolor != undefined && backgroundcolor.length > 0) {
            differbackgroundcolor = backgroundcolor.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          if (differstatusname != undefined || differiconclass != undefined
            || differiconcolor != undefined || differfontcolor != undefined || differbackgroundcolor != undefined) {
            this.disable = false;
          }
          else {
            this.disable = true;
          }
        }
      });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('iconsort') iconsort: MatSort;
  displayedColumns = ['name', 'color', 'class_name', 'Actions'];
  dataSource = new MatTableDataSource();

  ngAfterViewInit() {
    this.loadForm();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openModal(icontemplate: TemplateRef<any>, mode, icon) {
    this.isError = false;
    if (mode == 'A') {
      this.iconcolor = "";
      this.fontcolor = "";
      this.backgroundcolor = "";
      this.cdRef.detectChanges();
      this.modalRef = this.modalService.show(icontemplate);
    }
    else if (mode == 'E') {
      //debugger;
      this.selectedicon = icon;
      this.selectedicon_fontcolor = icon.fontcolor;
      this.selectedicon_backgroundcolor = icon.backgroundcolor;
      this.selectedicon_icon_color = icon.icon.color;
      this.cdRef.detectChanges();
      this.modalRef = this.modalService.show(icontemplate);
    }
    else {
      this.modalRef = this.modalService.show(icontemplate);
    }
  }
  openConfirmModal(icontemplate: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(icontemplate);
  }
  //filter
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.appStatus_dataSource.filter = filterValue;
  }

  //get all
  get_all() {
    this.loading = true;

    this.iconAppointmentService.get_all().subscribe(appStatusData => {
      //debugger;

      this.appStatus = appStatusData.ResponseMessage;
      this.appStatus_dataSource = new MatTableDataSource(this.appStatus);
      this.appStatus_dataSource.paginator = this.paginator;
      this.appStatus_dataSource.sort = this.iconsort;
      this.loading = false;
    })
  }
  //create appointment status
  create_appointment_status() {
    //debugger;
    this.errormsg = ""
    this.confirmModalRef.hide();

    this.iconAppointmentService.create_appointment_status(this.iconappform.value).subscribe(appStatusData => {
      if (appStatusData.ResponseDetails.ResponseStatus != '10') {
        this.isError = true
        if (appStatusData.ResponseMessage["0"].msg) {
          this.errormsg = appStatusData.ResponseMessage["0"].msg;
        }
        else {
          this.errormsg = appStatusData.ResponseMessage;
        }
      }
      else {
        this.modalRef.hide();
        this.appStatus.push(appStatusData.ResponseMessage.Appointment_Status);
        if (this.appStatus.length > 0) {
          this.appStatus_dataSource = new MatTableDataSource(this.appStatus);
          this.appStatus_dataSource.paginator = this.paginator;
          this.appStatus_dataSource.sort = this.iconsort;
        }
      }
    })
  }
  //update_appointment_status
  update_appointment_status(id) {
    //debugger;
    this.confirmModalRef.hide();
    this.modalRef.hide();
    this.iconAppointmentService.update_appointment_status(id, this.iconappform.value).subscribe(updateStatusData => {
      if (updateStatusData.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = updateStatusData.ResponseMessage[0].msg;
      }
      else {
        this.get_all();
      }
    })

  }
  //delete_appointment_status_by_Id
  delete_appointment_status_by_Id(id) {
    this.modalRef.hide();
    this.iconAppointmentService.delete_appointment_status_by_Id(id).subscribe(deleteStatusData => {
      if (deleteStatusData.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = deleteStatusData.ResponseMessage[0].msg;
      }
      else {
        this.get_all();

      }
    })
  }
}

