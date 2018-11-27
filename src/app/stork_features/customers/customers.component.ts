import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerValidationService } from "app/stork_features/customers/customervalidation.service";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { CustomerService } from './customers.services';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [CustomerService]
})
export class CustomersComponent implements OnInit {
  homestreet: any;
  data: {};
  image: any;
  modalRef: BsModalRef;
  position = 'after';
  isCustomertype: boolean = false;
  Customertype: any;
  customer: FormGroup;
  confirmModalRef: BsModalRef;
  cropperSettings: CropperSettings;
  regions = [];
  sub_regions = [];
  subregions = [];
  selectedregion: any;
  displayedColumns = ['firstname'	, 'region',	 'subregion',	 'city',	'phone',	'email'];
  region: any;
  emailpreferenceforcommunication: boolean = false;
  phonepreferenceforcommunication: boolean = false;
  messagepreferenceforcommunication: boolean = false;
  customerdataSource = new MatTableDataSource();
  customerData:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('customersort') custsort: MatSort;

  constructor(private router: Router, private modalService: BsModalService, private formBuilder: FormBuilder, private customerService: CustomerService) {
    this.cropperSettings = new CropperSettings();
    this.data = {};
  }

  ngOnInit() {
    this.loadForm();
    
  }
  loadForm(): void {
    this.customer = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, CustomerValidationService.emailValidator])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      addressname: [''],
      companyname: [''],
      homestreet: [''],
      homecity: [''],
      homestate: [''],
      homezip: [''],
      billingstreet: [''],
      billingcity: [''],
      billingstate: [''],
      billingzip: [''],
      cellphone: [''],
      sub_region: [''],
      region: [''],
      workphone: '',
      homephone: '',
      emailpreferenceforcommunication:'',
      phonepreferenceforcommunication:'',
      messagepreferenceforcommunication:''
    });
    this.get_all();
    this.get_all_region();
    this.get_all_subregion();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openConfirmModal(imagetemplate: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(imagetemplate);
  }

  //method for selected customer
  selectcustomer(Select_customer: string) {
    debugger
    if (Select_customer == "Corporate") {
      this.isCustomertype = true;
      this.Customertype = Select_customer
      // this.customer = this.formBuilder.group({
      //   email: ['', Validators.compose([Validators.required, CustomerValidationService.emailValidator])],
      //   companyname: ['', Validators.required]

      // });
    }
    else {
      this.isCustomertype = false;
      this.Customertype = Select_customer
      // this.customer = this.formBuilder.group({
      //   email: ['', Validators.compose([Validators.required, CustomerValidationService.emailValidator])],
      //   firstname: ['', Validators.required],
      //   lastname: ['', Validators.required]

      // });
    }
  }
  applyFilter(filterValue: string) {
    debugger
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.customerdataSource.filter = filterValue;
  }
  ngAfterViewInit() {
    this.loadForm();
    if (this.customerdataSource != null)
    this.customerdataSource.sort = this.custsort;
    
  }
  Imageupload(image) {
    this.image = image;
    this.confirmModalRef.hide();
  }
  //get all
  get_all(){
    debugger;
    this.customerService.get_all().subscribe(customerData=>{
      this.customerData=customerData.ResponseMessage
     this.customerdataSource=new MatTableDataSource(this.customerData);
     this.customerdataSource.sort = this.custsort;

    
     
    })
  }
  //==========save new customer========
  create_customer() {
    debugger;
    this.customer.value.emailpreferenceforcommunication = this.emailpreferenceforcommunication;
    this.customer.value.phonepreferenceforcommunication = this.phonepreferenceforcommunication;
    this.customer.value.messagepreferenceforcommunication = this.messagepreferenceforcommunication;
    this.customerService.create_customer(this.image, this.customer.value, this.selectedregion.name, this.Customertype).subscribe(Createdata => {
     this.modalRef.hide();
     this.get_all();
    })
  }
  get_all_region() {
    this.customerService.get_all_regions().subscribe(regionData => {
      this.regions = regionData.ResponseMessage.regions.map(region => ({ _id: region._id, name: region.name, selected: false }));
    })
  }

  get_all_subregion() {
    this.customerService.get_all_subregion().subscribe(subregiondata => {
      this.sub_regions = subregiondata.ResponseMessage.subregions.map(subregion => ({ _id: subregion._id, name: subregion.name, regionId: subregion.regionId, selected: false }));
    })
  }
  get_all_subregion_by_regionId(regionId) {
    this.customerService.get_all_subregion_by_regionId(regionId).subscribe(data => {
      this.subregions = data.ResponseMessage.subregions;
    })
  }
  selectedregionRow(selectedregion) {
    this.selectedregion = selectedregion;
    this.get_all_subregion_by_regionId(this.selectedregion._id);

  }
}
