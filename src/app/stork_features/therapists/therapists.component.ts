import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TherapistValidationService } from "app/stork_features/therapists/therapistvalidation.service";
import { TherapistsService } from "app/stork_features/therapists/therapists.service";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'app-therapists',
  templateUrl: './therapists.component.html',
  styleUrls: ['./therapists.component.scss'],
  providers: [TherapistsService]
})
export class TherapistsComponent implements OnInit {
  servedsubRegion: any;
  servedRegion: boolean;
  confirmModalRef: BsModalRef;
  sub_regions: any = [];
  served_region: any = [];
  gender: any;
  selectedservice: any;
  selectedregion: any;
  subregions: any = [];
  regions: any = [];
  modalRef: BsModalRef;
  position = 'below';
  therapistform: FormGroup;
  selectedAll: any;
  email: string;
  firstname: string;
  lastname: string;
  phone: any;
  region: string;
  sub_region: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  therapist = [];
  subregion: any;
  therapistDataSource = new MatTableDataSource()
  phoneArr: any = []
  data: any;
  image: any;
  cropperSettings: CropperSettings;
  selectedRowIndex: string;
  serviceData: any = [];

  // servedRegion: '',
  //servedsubRegion: ''
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['firstname', 'Region', 'SubRegion', 'City', 'Phone', 'Email'];
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private therapistsService: TherapistsService
  ) {

    this.cropperSettings = new CropperSettings();
   

    this.data = {};
  }

  ngOnInit() {
    this.therapistform = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, TherapistValidationService.emailValidator])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      region: ['', Validators.required],
      phone: '',
      sub_region: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      servedRegion: false,
      servedsubRegion: false
    });
    this.get_all();
    this.get_all_region();
    this.get_all_subregion();
    this.get_all_services();
  }

  openModal(template: TemplateRef<any>) {
    this.email = '';
    this.firstname = '';
    this.lastname = '';
    this.phone = '';
    this.region = '';
    this.sub_region = '';
    this.street = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.servedRegion = false,
      this.servedsubRegion = false,
      this.modalRef = this.modalService.show(template);
  }

  openConfirmModal(icontemplate: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(icontemplate);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.therapistDataSource.filter = filterValue;
  }

  //create_therapist
  create_therapist() {
    this.confirmModalRef.hide();
    //debugger;
    this.phoneArr = [{ 'phone': this.therapistform.value.phone, 'default': true }];
    this.therapistform.value.serviceData = this.serviceData;
    this.therapistsService.create_therapist(this.therapistform.value, this.phoneArr, this.selectedregion.name, this.gender, this.served_region, this.image).subscribe(therapisrData => {
      this.modalRef.hide();
      this.get_all();
    })
  }

  get_all() {
    this.therapistsService.get_all().subscribe(getTherapistData => {
      this.therapist = getTherapistData.ResponseMessage
      this.therapistDataSource = new MatTableDataSource(this.therapist);
      this.therapistDataSource.sort = this.sort;
    })
  }

  get_all_region() {
    this.therapistsService.get_all_regions().subscribe(regionData => {
      this.regions = regionData.ResponseMessage.regions;
    })
  }

  get_all_subregion() {
    this.therapistsService.get_all_subregion().subscribe(subregiondata => {
      this.sub_regions = subregiondata.ResponseMessage.subregions
    })
  }
  get_all_subregion_by_regionId(regionId) {
    this.therapistsService.get_all_subregion_by_regionId(regionId).subscribe(data => {
      this.subregions = data.ResponseMessage.subregions;
    })
  }

  selectedregionRow(selectedregion) {
    this.selectedregion = selectedregion;
    this.get_all_subregion_by_regionId(this.selectedregion._id);

  }

  selectGender(gender) {
    this.gender = gender;
  }

  get_all_services() {
    this.therapistsService.get_all_services().subscribe(serviceData => {
      if (serviceData.ResponseMessage.length > 0)
        this.serviceData = serviceData.ResponseMessage.map(service => ({ _id: service._id, name: service.name, region: service.region, sub_region: service.sub_region, service_location_type: service.service_location_type, cost: service.cost, duration: service.duration, notes: service.notes, selected: true }));
    })
  }

  checkIfAllSelected(region_subregion, isChecked: boolean) {
    let index;
    if (region_subregion.regionId) {
      let addedRegion = this.served_region.find(r => r._id == region_subregion.regionId);
      if (addedRegion != undefined && isChecked)
        addedRegion.sub_region.push({ '_id': region_subregion._id, 'sub_region': region_subregion.name });
      else if (addedRegion != undefined && !isChecked) {
        index = addedRegion.sub_region.findIndex(subregion => subregion._id === region_subregion._id);
        addedRegion.sub_region.splice(index, 1);
      }
      else if (addedRegion == undefined && isChecked)
        this.served_region.push({ '_id': region_subregion.regionId, 'region': region_subregion.name, 'sub_region': [{ '_id': region_subregion._id, 'sub_region': region_subregion.name }] })
    }
    else {
      if (isChecked) {
        this.served_region.push({ '_id': region_subregion._id, 'region': region_subregion.name, 'sub_region': [] })
      }
      else {
        index = this.served_region.findIndex(region => region._id == region_subregion._id);
        this.served_region.splice(index, 1);
        //this.served_region.pop({ '_id': region_subregion._id, 'region': region_subregion.name, 'sub_region': [] })
      }
    }
  }
  
  Imageupload(image) {
    //debugger;
    this.image = image;
    this.confirmModalRef.hide();
  }

  redirect(therapistId) {
    //this.selectedRowIndex = therapistId;
    this.router.navigate(['/therapist/profile/', therapistId]);
  }

}

