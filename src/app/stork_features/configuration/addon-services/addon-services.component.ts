import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddonService } from "app/stork_features/configuration/addon-services/addon-services.service";
import { diff } from 'deep-diff';

@Component({
  selector: 'app-addon-services',
  templateUrl: './addon-services.component.html',
  styleUrls: ['./addon-services.component.scss'],
  providers: [AddonService]
})
export class AddonServicesComponent implements OnInit {
  isError: boolean = false;
  errormsg: any;
  position = 'below';
  modalRef: BsModalRef;
  addonform: FormGroup;
  addon = [];
  name: string;
  cost: string;
  duration: string;
  confirmModalRef: BsModalRef;
  disable: boolean;
  selectedaddon: any;
  public loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('addonsort') addonsort: MatSort;
  displayedColumns = ['name', 'duration', 'cost', 'notes', 'Actions'];
  addon_dataSource = new MatTableDataSource<any>(this.addon)
  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private addonService: AddonService) {
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.addonform = this.formBuilder.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      duration: [''],
      notes: [''],
    });

    this.get_all();
    this.addonform.valueChanges.subscribe(
      changeddata => {
        debugger;
        if (this.selectedaddon != undefined) {

          let name = diff(this.selectedaddon.name, changeddata.name);
          let differname = null;
          if (name != undefined && name.length > 0) {
            differname = name.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let duration = diff(this.selectedaddon.duration, changeddata.duration);
          let differduration = null;
          if (duration != undefined && duration.length > 0) {
            differduration = duration.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let differcost = undefined;
          if (Number(this.selectedaddon.cost) != Number(changeddata.cost)) {
            differcost = 'true';
          }

          let notes = diff(this.selectedaddon.notes, changeddata.notes);
          let differnotes = null;
          if (notes != undefined && notes.length > 0) {
            differnotes = notes.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          if (differname != undefined || differduration != undefined || differcost != undefined || differnotes != undefined) {
            this.disable = false;
          }
          else
            this.disable = true;
        }
      });
  }

  //open modal window
  openModal(template: TemplateRef<any>, mode, addon) {
    this.isError = false;
    if (mode == "A") {
      this.name = "";
      this.cost = "";
      this.duration = "";
    }
    else if (mode == "E") {
      this.selectedaddon = addon;
    }
    this.modalRef = this.modalService.show(template);

  }
  openConfirmModal(template: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(template);
  }

  //filter
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.addon_dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.loadForm();
    this.addon_dataSource.paginator = this.paginator;
    this.addon_dataSource.sort = this.sort;
  }

  //Create Service Addon
  create_service_addon() {
    this.errormsg = "";
    this.confirmModalRef.hide();
    debugger;
    this.addonService.create_service_addon(this.addonform.value.name, this.addonform.value.cost, this.addonform.value.duration, this.addonform.value.notes)
      .subscribe(serviceaddondata => {
        debugger;
        if (serviceaddondata.ResponseDetails.ResponseStatus != '10') {
          this.isError = true
          if (serviceaddondata.ResponseMessage["0"].msg) {
            this.errormsg = serviceaddondata.ResponseMessage["0"].msg;
          }
          else {
            this.errormsg = serviceaddondata.ResponseMessage;
          }
        }
        else {
          this.modalRef.hide();
          this.addon.push(serviceaddondata.ResponseMessage["Service Addon"]);
          if (this.addon.length > 0) {
            this.addon_dataSource = new MatTableDataSource(this.addon);
            this.addon_dataSource.paginator = this.paginator;
            this.addon_dataSource.sort = this.addonsort;
          }
        }
      })
  }
  //Get all Service Addon
  get_all() {
    this.loading = true;
    this.addonService.get_all().subscribe(addondata => {
      this.loading = false;
      this.addon = addondata.ResponseMessage;
      this.addon_dataSource = new MatTableDataSource(this.addon);
      this.addon_dataSource.paginator = this.paginator;
      this.addon_dataSource.sort = this.addonsort;
    })
  }
  update_service_addon(Id: string) {
    this.confirmModalRef.hide();

    this.addonService.update_service_addon(Id, this.addonform.value.name, this.addonform.value.cost, this.addonform.value.duration, this.addonform.value.notes).subscribe(updateaddon => {
      if (updateaddon.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = updateaddon.ResponseMessage[0].msg;
      }
      else {
        this.get_all();
        this.modalRef.hide();
      }
    })
  }

  delete_service_addon_by_Id(Id: string, Arr) {
    this.modalRef.hide();
    this.addonService.delete_service_addon_by_Id(Id).subscribe(deletedata => {
      if (deletedata.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = deletedata.ResponseMessage[0].msg;
      }
      else {
        this.get_all();

      }
    })
  }
  setTwoNumberDecimal($event) {
    debugger;
    $event.target.value = parseFloat($event.target.value).toFixed(2);
  }
}

