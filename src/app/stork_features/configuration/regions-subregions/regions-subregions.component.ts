import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { RegionsSubregionService } from './regions-subregions.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { diff } from 'deep-diff';

@Component({
  selector: 'app-regions-subregions',
  templateUrl: './regions-subregions.component.html',
  styleUrls: ['./regions-subregions.component.scss'],
  providers: [RegionsSubregionService]
})

export class RegionsSubregionsComponent implements OnInit {
  isError: boolean;
  region_dataSource: MatTableDataSource<any>;
  subregion_dataSource: MatTableDataSource<any>;
  position = 'after';
  modalRef: BsModalRef;
  confirmModalRef: BsModalRef
  region: string;
  regionId: string;
  name: string;
  regionerrormsg: string;
  regions = [];
  subregions = [];
  regionform: FormGroup;
  subregionform: FormGroup;
  errormsg: string;
  selectedregion: any;
  selectedsubregion: any;
  selectedsubregion_name: string;
  selectedsubregion_regionId: string;
  selectedregionname: string;
  selectedRowIndex: string;
  subregion:string;
  disable: boolean;
  public loading = false;
  @ViewChild(MatPaginator) regionpaginator: MatPaginator;
  @ViewChild(MatPaginator) subregionpaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('regionsort') regionsort: MatSort;
  @ViewChild('subregionsort') subregionsort: MatSort;
  
  region_displayedColumns = ['name', 'action'];
  subregion_displayedColumns = ['name', 'action'];
  constructor(private modalService: BsModalService, private regionsSubregionService: RegionsSubregionService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.regionform = this.formBuilder.group({
      region: ['', Validators.required]
    });
    this.subregionform = this.formBuilder.group({
      regionId: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.get_all_regions();

    this.regionform.valueChanges.subscribe(
      changeddata => {
        //debugger;
        if (this.selectedregionname != undefined) {
          //debugger;
          let differ = diff(this.selectedregionname, changeddata.region);
          if (differ != undefined && differ.find(x => x.kind == 'E' && x.lhs != x.rhs) != undefined)
            this.disable = false;
          else
            this.disable = true;
        }
      });

    this.subregionform.valueChanges.subscribe(
      changeddata => {
        //debugger;
        if (this.selectedsubregion != undefined) {

          let subregion_name = diff(this.selectedsubregion_name, changeddata.name);
          let differsubregion_name = null;
          if (subregion_name != undefined && subregion_name.length > 0) {
            differsubregion_name = subregion_name.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }

          let subregion_regionId = diff(this.selectedsubregion_regionId, changeddata.regionId);
          let differsubregion_regionId = null;
          if (subregion_regionId != undefined && subregion_regionId.length > 0) {
            differsubregion_regionId = subregion_regionId.find(x => x.kind == 'E' && x.lhs != x.rhs);
          }
          if (differsubregion_name != undefined || differsubregion_regionId != undefined)
            this.disable = false;
          else
            this.disable = true;
        }
      });
  }

  //open Modal window
  openregionModal(template: TemplateRef<any>, mode, region) {
    this.isError = false;
    if (mode == "A") {
      this.region = "";

      this.modalRef = this.modalService.show(template);
    }
    else if (mode == "E") {
      this.selectedregionname = region;
      this.modalRef = this.modalService.show(template);
    }
    else {
      this.modalRef = this.modalService.show(template);
    }
  }

  opensubregionModal(template: TemplateRef<any>, mode, subregion) {
    if (mode == "A") {
      this.regionId = null;
      this.name = "";
      this.subregion = "";
      this.modalRef = this.modalService.show(template);
    }
    else if (mode == "E") {
      this.selectedsubregion = subregion.name;
      this.selectedsubregion_name = subregion.name;
      this.selectedsubregion_regionId = subregion.regionId;
      this.modalRef = this.modalService.show(template);
    }
    else {
      this.modalRef = this.modalService.show(template);
    }
  }

  openConfirmModal(template: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(template);
  }

  ngAfterViewInit() {
    this.loadForm();
    if (this.region_dataSource != null)
      this.region_dataSource.sort = this.sort;
    if (this.subregion_dataSource != null)
      this.subregion_dataSource.sort = this.sort;
  }

  //get all regions
  get_all_regions() {
    this.loading = true;
    this.regionsSubregionService.get_all_regions().subscribe(data => {
      this.loading = false;
      this.regions = data.ResponseMessage.regions;
      if (this.regions.length > 0) {
        this.region_dataSource = new MatTableDataSource(this.regions);
        this.region_dataSource.paginator = this.regionpaginator;
        this.region_dataSource.sort = this.regionsort;
        this.get_all_subregion_by_regionId(this.regions[0]._id);
      }
      else {
        this.region_dataSource = null;
      }
    })
  }

  //add new region
  create_region() {
    this.errormsg = "";
    this.confirmModalRef.hide();
    this.regionsSubregionService.create_region(this.regionform.value.region).subscribe(data => {
      if (data.ResponseDetails.ResponseStatus != '10') {
        this.isError = true
        if (data.ResponseMessage["0"].msg) {
          this.errormsg = data.ResponseMessage["0"].msg;
        }
        else {
          this.errormsg = data.ResponseMessage;
        }
      }
      else {
        this.modalRef.hide();
        this.regions.push(data.ResponseMessage.region);
        if (this.regions.length > 0) {
          this.region_dataSource = new MatTableDataSource(this.regions);
          this.region_dataSource.paginator = this.regionpaginator;
          this.subregion_dataSource = null;
          this.region_dataSource.sort = this.regionsort;
        }
      }
    })
  }

  //edit region

  update_region(id) {
    this.errormsg = "";
    this.confirmModalRef.hide();
    this.regionsSubregionService.update_region(id, this.regionform.value.region).subscribe(data => {
      if (data.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = data.ResponseMessage[0].msg;
      }
      else {
        this.get_all_regions();
        this.modalRef.hide();
      }
    })
  }

  //delete region by id
  delete_region_by_Id(id) {
    this.regionsSubregionService.delete_region_by_Id(id).subscribe(data => {
      //debugger;
      if (data.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = data.ResponseMessage[0].msg;
        this.modalRef.hide();
      }
      else {
        this.modalRef.hide();
        this.get_all_regions();
      }
    })
  }

  //cancelregion
  cancel_region() {
    this.get_all_regions();
    this.modalRef.hide();
  }

  //select subregion by region

  selectedregionRow(selectedregion) {
    this.selectedregion = selectedregion;
    this.get_all_subregion_by_regionId(selectedregion);
  }

  //get all subregion by region id
  get_all_subregion_by_regionId(regionId) {
    this.loading = true;
    this.regionsSubregionService.get_all_subregions(regionId).subscribe(data => {
      this.loading = false;
      this.subregions = data.ResponseMessage.subregions;
      if (this.subregions.length > 0) {
        this.subregion_dataSource = new MatTableDataSource(this.subregions);
        this.subregion_dataSource.paginator = this.subregionpaginator;
        this.subregion_dataSource.sort = this.subregionsort;
      }
      else {
        this.subregion_dataSource = null;
      }
    })
  }

  //add new subregion
  create_subregion() {
    this.errormsg = "";
    this.confirmModalRef.hide();
    this.regionsSubregionService.create_subregion(this.subregionform.value.regionId, this.subregionform.value.name).subscribe(data => {
      if (data.ResponseDetails.ResponseStatus != '10') {
        this.isError = true
        if (data.ResponseMessage["0"].msg) {
          this.errormsg = data.ResponseMessage["0"].msg;
        }
        else {
          this.errormsg = data.ResponseMessage;
        }
      }
      else {
        this.selectedregionRow(this.subregionform.value.regionId);
        this.modalRef.hide();
      }
    })
  }

  //edit region

  update_subregion(id) {
    //debugger;
    this.errormsg = "";
    this.confirmModalRef.hide();
    this.regionsSubregionService.update_subregion(id, this.subregionform.value.regionId, this.subregionform.value.name).subscribe(data => {
      //debugger
      if (data.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = data.ResponseMessage[0].msg;
      }
      else {
        this.get_all_regions();
        this.modalRef.hide();
      }
    })
  }

  //delete subregion by id
  delete_subregion_by_Id(id) {
    this.regionsSubregionService.delete_subregion_by_Id(id).subscribe(data => {
      if (data.ResponseDetails.ResponseStatus != '10') {
        this.errormsg = data.ResponseMessage[0].msg;
        this.modalRef.hide();
      }
      else {
        this.modalRef.hide();
        this.get_all_regions();
      }
    })
  }

  //cancelsubregion
  cancel_subregion() {
    this.selectedregionRow(this.subregionform.value.regionId);
    this.modalRef.hide();
  }

  // subregion filter
  applyFilter(filterValue: string) {
    //debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.subregion_dataSource.filter = filterValue;
  }

}
