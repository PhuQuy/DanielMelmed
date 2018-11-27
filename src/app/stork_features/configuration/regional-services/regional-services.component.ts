import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegionalServicesService } from "app/stork_features/configuration/regional-services/regional-services.service";
import { diff } from 'deep-diff';

@Component({
  selector: 'app-regional-services',
  templateUrl: './regional-services.component.html',
  styleUrls: ['./regional-services.component.scss'],
  providers: [RegionalServicesService]
})
export class RegionalServicesComponent implements OnInit {
  isError: boolean;
  selectedservice: any;
  selectedregionName: void;
  confirmModalRef: BsModalRef;
  serviceDatasource: MatTableDataSource<{}>;
  serviceData: any = [];
  errormsg: any;
  subregions: any = [];
  selectedregion: any;
  regions: any = [];
  position = 'below';
  modalRef: BsModalRef;
  serviceform: FormGroup;
  sub_region: any;
  name: string;
  service_location_type: string;
  serviceImage: any;
  duration: any;
  cost: any;
  currency: any;
  notes: string;
  region: any;
  selectedsubregion: any;
  disable: boolean;
  public loading = false;
  @ViewChild(MatPaginator) servicespaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('servicessort') servicessort: MatSort;
  service_displayedColumns = ['region', 'sub_region', 'name', 'service_location_type', 'duration', 'cost', 'Actions']
  regiondataSource = new MatTableDataSource();
  locationType = [
    { name: 'Home', value: 'Home' },
    { name: 'Office', value: 'Office' },
    { name: 'Hotel', value: 'Hotel' }
  ];
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private regionalServicesService: RegionalServicesService) {
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.serviceform = this.formBuilder.group({
      region: ['', Validators.required],
      sub_region: ['', Validators.required],
      service_location_type: '',
      name: ['', Validators.required],
      duration: '',
      cost: '0.00',
      notes: ''
    });
    this.get_all_region();
    this.get_all();

    this.serviceform.valueChanges.subscribe(
      changeddata => {
        debugger;
        if (this.selectedservice != undefined) {
          debugger;
          let region = diff(this.selectedservice.region.region, changeddata.region.name);
          let differregion = null;
          if (region != undefined && region.length > 0) {
            differregion = region.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let subregion = diff(this.selectedservice.sub_region.sub_region, changeddata.sub_region.name);
          let differsubregion = null;
          if (subregion != undefined && subregion.length > 0) {
            differsubregion = subregion.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let service_location_type = diff(this.selectedservice.service_location_type, changeddata.service_location_type);
          let differservice_location_type = null;
          if (service_location_type != undefined && service_location_type.length > 0) {
            differservice_location_type = service_location_type.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let name = diff(this.selectedservice.name, changeddata.name);
          let differname = null;
          if (name != undefined && name.length > 0) {
            differname = name.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let duration = diff(this.selectedservice.duration, changeddata.duration);
          let differduration = null;
          if (duration != undefined && duration.length > 0) {
            differduration = duration.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let differcost = undefined;
          if (Number(this.selectedservice.cost) != Number(changeddata.cost)) {
            differcost = 'true';
          }

          let notes = diff(this.selectedservice.notes, changeddata.notes);
          let differnotes = null;
          if (notes != undefined && notes.length > 0) {
            differnotes = notes.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          if (differregion != undefined || differsubregion != undefined || differservice_location_type != undefined
            || differname != undefined || differduration != undefined || differcost != undefined || differnotes != undefined)
            this.disable = false;
          else
            this.disable = true;
        }
      });
      
  }

  openModal(template: TemplateRef<any>, mode, service) {
    this.isError = false;
    this.selectedregion = "";
    this.selectedsubregion = "";

    if (mode == 'A') {
      this.region = '';
      this.sub_region = '';
      this.service_location_type = '';
      this.name = '';
      this.duration = '';
      this.cost = " 0.00";
      this.notes = '';
      this.modalRef = this.modalService.show(template);
    }
    else if (mode == 'E') {
      this.selectedservice = service;
      let selectedregion = service.region;
      let selectedsubregion = service.sub_region;
      this.regionalServicesService.get_all_subregions(selectedregion._id).subscribe(data => {
        this.subregions = data.ResponseMessage.subregions;
        this.selectedregion = this.regions.find(r => r._id == selectedregion._id);
        this.selectedsubregion = this.subregions.find(r => r._id == selectedsubregion._id);
        this.modalRef = this.modalService.show(template);
      })
    }
    else
      this.modalRef = this.modalService.show(template);
  }
  openConfirmModal(icontemplate: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(icontemplate);
  }
  //filter
  applyFilter(filterValue: string) {
    debugger
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.serviceDatasource.filter = filterValue;
  }
  ngAfterViewInit() {
    this.loadForm();
    if (this.serviceDatasource != null) {
      this.serviceDatasource.sort = this.sort;
      this.serviceDatasource.sortingDataAccessor = (data, header) => data[header];
    }
  }
  get_all_region() {
    this.regionalServicesService.get_all_regions().subscribe(regionData => {
      this.regions = regionData.ResponseMessage.regions;
      //this.regiondataSource = new MatTableDataSource(this.regions );
    })
  }
  get_all_subregion_by_regionId(regionId) {
    this.regionalServicesService.get_all_subregions(regionId).subscribe(data => {
      this.subregions = data.ResponseMessage.subregions;
      this.selectedsubregion = this.subregions[0];
    })
  }
  selectedregionRow(selectedregion) {
    this.selectedregion = selectedregion;
    this.get_all_subregion_by_regionId(this.selectedregion._id);
  }
  //get_all 
  get_all() {
    this.loading = true;
    this.regionalServicesService.get_all().subscribe(serviceData => {
      this.loading = false;
      this.serviceData = serviceData.ResponseMessage;
      this.serviceDatasource = new MatTableDataSource(this.serviceData)
      this.serviceDatasource.paginator = this.servicespaginator;
      this.serviceDatasource.sort = this.servicessort;
    })
  }
  //create_service
  create_service() {
    this.confirmModalRef.hide();

    debugger;
    this.regionalServicesService.create_service(this.serviceform.value, this.selectedregion).subscribe(serviceData => {
      debugger;
      if (serviceData.ResponseDetails.ResponseStatus != '10') {
        this.isError = true
        if (serviceData.ResponseMessage["0"].msg) {
          this.errormsg = serviceData.ResponseMessage["0"].msg;
        }
        else {
          this.errormsg = serviceData.ResponseMessage;
        }
      }
      else {
        this.modalRef.hide();
        this.serviceData.push(serviceData.ResponseMessage.service)
        this.serviceDatasource = new MatTableDataSource(this.serviceData)
        this.serviceDatasource.paginator = this.servicespaginator;
        this.serviceDatasource.sort = this.servicessort;
      }
    })
  }
  update_service(id) {
    debugger;
    this.regionalServicesService.update_service(this.serviceform.value, this.selectedregion, id).subscribe(updateServiceData => {
      debugger;
      if (updateServiceData.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = updateServiceData.ResponseMessage[0].msg;
      }
      else {
        debugger;
        this.confirmModalRef.hide();
        this.modalRef.hide();
        this.get_all();
      }
    })
  }
  delete_service_by_Id(id) {
    this.modalRef.hide();
    this.regionalServicesService.delete_service_by_Id(id).subscribe(deleteservicedata => {
      this.get_all();
    })
  }
  setTwoNumberDecimal($event) {
    debugger;
    $event.target.value = parseFloat($event.target.value).toFixed(2);
  }
}

