import { Component, OnInit, TemplateRef,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'app/stork_features/customers/customers.services';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import *  as env from 'environments/environment';

@Component({
  selector: 'app-customers-profile',
  templateUrl: './customers-profile.component.html',
  styleUrls: ['./customers-profile.component.scss'],
  providers: [CustomerService],
  encapsulation: ViewEncapsulation.None
})
export class CustomersProfileComponent implements OnInit {
  confirmModalRef: BsModalRef;
  customer: any;
  customerid: any;
  regions = [];
  subregions = [];
  customerform: FormGroup;

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private modalService: BsModalService, private formBuilder: FormBuilder) {
    this.customerform = this.formBuilder.group({
      contactname: '',
      primaryphone: '',
      email: ['', Validators.required],
      street: '',
      city: '',
      state: '',
      region: '',
      subregion: '',
      mobilephone: '',
      secondaryphone: '',
      addressnote: '',
      customernotes:'',
      adminnotes:''
    });
    if (!this.customer) {
      this.customer = {};
      this.customer.defaultContact = { contact_name: "", email: "", phone: { phone: "" } };
      this.customer.defaultContact.defaultphone = { phone: "" };
      this.customer.defaultContact.secondaryphone={phone:""};
      this.customer.defaultAddress = { 'address_name': "", city: "", region: { _id: "", name: "" }, state: "", street1: "", subregion: { id: "", name: "" }, zipcode: "" }
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customerid = params['id'];
    })
    this.get_customer_by_Id()

  }
  openConfirmModal(icontemplate: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(icontemplate);
  }
  get_customer_by_Id() {
    this.customerService.get_customer_by_Id(this.customerid).subscribe(Customerdata => {
      //debugger;
      this.get_all_region();
      this.customer = Customerdata.ResponseMessage.customer;
      this.customer.defaultContact = this.customer.contacts.find(cust => cust.default == true);
      this.customer.defaultContact.defaultphone = this.customer.defaultContact.phone.find(phone => phone.default == true);
      let secondaryphone = this.customer.defaultContact.phone.find(phone => phone.default == false);
      if(secondaryphone != undefined)
      this.customer.defaultContact.secondaryphone=secondaryphone;
      this.customer.defaultAddress = this.customer.address.find(address => address.default == true);
       this.get_all_subregion_by_regionId(this.customer.defaultAddress.region._id);
    })
  }
  get_all_region() {
    this.customerService.get_all_regions().subscribe(regionData => {
      this.regions = regionData.ResponseMessage.regions.map(region => ({ _id: region._id, name: region.name }));
    })
  }

  get_all_subregion_by_regionId(regionId) {
    this.customerService.get_all_subregion_by_regionId(regionId).subscribe(data => {
      this.subregions = data.ResponseMessage.subregions;
      this.customer.address.subregion = this.subregions[0];
    })
  }

  selectedregionRow(selectedregion) {
    //debugger;
    this.get_all_subregion_by_regionId(selectedregion._id);
  }
  update_customer(customer) {
    //debugger
    this.customerService.update_customer(customer).subscribe(updatedata => {
      //debugger;
      this.confirmModalRef.hide();
    })
  }
}
