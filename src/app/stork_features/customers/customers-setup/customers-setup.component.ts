import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customers.services';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'app-customers-setup',
  templateUrl: './customers-setup.component.html',
  styleUrls: ['./customers-setup.component.scss'],
  providers: [CustomerService]
})
export class CustomersSetupComponent implements OnInit {

  customersetupform: FormGroup;
  regions: any = [];
  subregions: any = [];
  image: any;
  customerid: any;
  customer: any;
  confirmModalRef: BsModalRef;
  data: {};
  emailpreferenceforcommunication: boolean = false;
  phonepreferenceforcommunication: boolean = false;
  messagepreferenceforcommunication: boolean = false;
  cropperSettings: CropperSettings;
  ModalRef: BsModalRef;
  newAddress: any;
  region: any;
  subregion: any;
  address_name: any;
  street: any;
  city: any;
  state: any;
  zipcode: any;
  address_note: any;
  newcontact: any;
  contactname: any;
  primaryphone: any;
  email: any;
  secondaryphone: any;
  mobilephone: any;
  position = 'below';
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private customerService: CustomerService, private modalService: BsModalService, ) {
    this.route.params.subscribe(params => {
      this.customerid = params['id'];
    })
    this.customersetupform = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      customertype: [''],
      contactname: '',
      primaryphone: '',
      email: '',
      street: '',
      city: '',
      state: '',
      region: '',
      subregion: '',
      mobilephone: '',
      secondaryphone: '',
      emailpreferenceforcommunication: false,
      phonepreferenceforcommunication: false,
      messagepreferenceforcommunication: false

    });
    this.cropperSettings = new CropperSettings();
    this.data = {};
  }
  openConfirmModal(icontemplate: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(icontemplate);
  }
  openModal(template: TemplateRef<any>) {
    this.ModalRef = this.modalService.show(template);
  }
  ngOnInit() {

    if (!this.customer) {
      this.customer = { address: [{ 'address_name': "", city: "", region: { _id: "", name: "" }, state: "", street1: "", subregion: { id: "", name: "" }, zipcode: "" }] };
      this.customer.defaultContact = { contact_name: "", email: "", phone: { phone: "" } };
      this.customer.defaultContact.defaultphone = { phone: "" };
      this.customer.defaultContact.secondaryphone = { phone: "" };
      this.customer.defaultAddress = { 'address_name': "", city: "", region: { _id: "", name: "" }, state: "", street1: "", subregion: { id: "", name: "" }, zipcode: "" }


    }
    this.get_customer_by_Id();
  }

  get_customer_by_Id() {
    this.customerService.get_customer_by_Id(this.customerid).subscribe(Customerdata => {
      debugger;
      this.get_all_region();
      this.customer = Customerdata.ResponseMessage.customer;
      this.customer.defaultContact = this.customer.contacts.find(cust => cust.default == true);
      this.customer.defaultContact.defaultphone = this.customer.defaultContact.phone.find(phone => phone.default == true);
      let secondaryphone = this.customer.defaultContact.phone.find(phone => phone.default == false);
      if (secondaryphone != undefined)
        this.customer.defaultContact.secondaryphone = secondaryphone;
      this.customer.defaultAddress = this.customer.address.find(address => address.default == true);
      this.customer.address.region = JSON.stringify(this.customer.address.region)
      this.get_all_subregion_by_regionId(this.customer.defaultAddress.region._id);

    })
  }
  Imageupload(image) {
    debugger;
    this.image = image;
    this.customer.imagename = this.image
    this.confirmModalRef.hide();
  }
  get_all_region() {
    this.customerService.get_all_regions().subscribe(regionData => {
      this.regions = regionData.ResponseMessage.regions.map(region => ({ _id: region._id, name: region.name }));
    })
  }

  get_all_subregion_by_regionId(regionId) {
    this.customerService.get_all_subregion_by_regionId(regionId).subscribe(data => {
      this.subregions = data.ResponseMessage.subregions;
      //  this.customer.address.subregion = this.subregions[0];
    })
  }
  selectedregionRow(selectedregion) {
    debugger;
    this.get_all_subregion_by_regionId(selectedregion._id);
  }
  update_customer(customer, isUpdate) {
    debugger
    if (isUpdate) {
      this.customerService.update_customer(customer).subscribe(updatedata => {
        debugger;
        this.confirmModalRef.hide();
      })
    }
    else {
      debugger;
      this.newAddress = {
      
        region: { _id: this.subregion.regionId, name: this.region },
        subregion: { _id: this.subregion._id, name: this.subregion.name },
        address_name: this.address_name,
        street1: this.street,
        city: this.city,
        state: this.state,
        zipcode: this.zipcode,
        default: false,
        address_note: this.address_note
      }
      if (this.newAddress) {
        debugger;
        this.customer.address.push(this.newAddress)

      }
      this.customerService.update_customer(customer).subscribe(updatedata => {
        debugger;
        this.confirmModalRef.hide();
      })
    }

  }
  updatecustomer(customer, isContact) {
    debugger
    if (isContact) {
      this.customerService.update_customer(customer).subscribe(updatedata => {
     
        this.confirmModalRef.hide();
        this.ModalRef.hide();
      })
    }
    else {

      this.newcontact = {
        'contact_name': this.contactname,
        phone: [{ phone: this.primaryphone, default: true }, { phone: this.secondaryphone, default: false }],
        email: this.email,
        mobileno: this.mobilephone,
        default: false
      }
      if (this.newcontact) {
        this.customer.contacts.push(this.newcontact)

      }
      this.customerService.update_customer(customer).subscribe(updatedata => {
       
        this.confirmModalRef.hide();
        this.ModalRef.hide();
      })
    }

  }
}
