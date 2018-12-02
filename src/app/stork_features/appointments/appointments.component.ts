import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AppointmentValidationService } from "app/stork_features/book-massage/appointment/appointment-servicesvalidation.service";
//import { AppointmentService } from './appointment.service';
import * as env from 'environments/environment';
import { isEmpty } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CropperSettings } from 'ng2-img-cropper';
import { AppointmentService } from './apoointments.service';
import { BookMassageService } from '../book-massage/book-massage.service';
import HelperService from '../shared/HelperService';
import { service_addons, service, therapist, manual_enteries } from '../book-massage/model/appointment.model';
//import { AppointmentseditComponent } from '../appointmentsedit/appointmentsedit.component';
//import { Constants } from './../util/constants';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { SharedService } from '@app/core/services/shared.service';

// @NgModule({

//   imports: [
//     AngularDateTimePickerModule,
//   ]

// }
declare var $: any;
@Component({
  selector: 'app-appointment',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  providers: [AppointmentService, BookMassageService],
  encapsulation: ViewEncapsulation.None,
})
export class AppointmentsComponent implements OnInit {
  public work: boolean = true;
  public private: boolean = false;
  public invoice: boolean = false;
  public summary: boolean = false;
  Notename: string = "Work order notes";
  serviceAddOnData: service_addons[];
  public loading = false;
  appointment: any;
  isCustomertype: boolean = false;
  modalRef: BsModalRef;
  position = 'after';
  appointmentform: FormGroup;
  customer: FormGroup;
  aptstatusData: any = [];
  customersData: any = [];
  start_date: Date;
  therapistsData: any = [];
  servicesData: service[];
  addTherapist = [{ value: '' }];
  addServices: any = [];
  addServiceAddon: any = [];
  //addServiceAddon = [{ serviceAddOn: '' }]
  manualItem = [{ manualItem: '' }]
  servicesArr: any = [];
  servicesAddonArr: any = [];

  //therapistArr: therapist [];
  therapistArr: any = [];
  conditionArr: {}
  appointmentStatus = {};
  therapist: any = [];
  notes: string;
  manualService: {};
  Total: any = 0.00;
  customerid: any;
  therapistId: any;
  gratuity: any = 0.00;
  serviceaddon: service_addons;
  service: service;
  filterArr = [{}]
  filter: any;

  qty: any = [];
  cost: any;
  appointmentIdVal: any;
  aptstsNamebyId: any;
  customerNamebyId: any;
  therapistsNamebyId: any;
  serviceNamebyId: any;
  serviceAddonNamebyId: any;
  startDateById: any;
  serviceCostById: any;
  serviceQtyById: any;
  serviceAddonCostById: any;
  serviceAddonQtyById: any;
  manualNameById: any;
  manualCostById: any;
  manualQtyById: any;
  aptbyIdData: any = [];
  //aptedit: any = [];
  regions: any = [];
  appoinmentId: any;
  sub_regions: any = [];
  subregions: any = [];
  selectedregion: any = [];
  image: any;
  emailpreferenceforcommunication: boolean = false;
  phonepreferenceforcommunication: boolean = false;
  messagepreferenceforcommunication: boolean = false;
  Customertype: string;
  confirmModalRef: BsModalRef;
  data: {};
  cropperSettings: CropperSettings;
  custfilter: any
  isCustomer: boolean;
  customerAdress: any = [];
  customerContact: any = [];
  isTherapist: boolean;
  therapistAddress: any = [];
  therapistContact: any = [];
  startdate: string;
  event: any = [];
  @ViewChild('editappointmenttemplate')
  private editappointmenttemplate: TemplateRef<any>
  @ViewChild('addappointmenttemplate')
  private addappointmenttemplate: TemplateRef<any>
  addServiceName: any;
  addServiceAddOnName: any;
  addTherapistName: any;

  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'MMM-dd-yyyy hh:mm a',
    defaultOpen: false
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private AppointmentService: AppointmentService,
    public bookMassageService: BookMassageService,
    private route: Router,
    private sharedService: SharedService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      //let appointmentIdVal = params['appointmentId'];
      // if (appointmentIdVal != undefined)
      //   this.get_appointment_by_Id(this.appointmentIdVal);
    });
    if (this.appointment == null)
      this.appointment = {};
    this.appointment.start_date = new Date();
    this.cropperSettings = new CropperSettings();
    this.data = {};
  }

  ngOnInit() {
    this.get_all_appointment();
    this.loadForm();
    this.filterArr = [{
      "name": "First Name",
      "value": "firstname"
    },
    {
      "name": "Last Name",
      "value": "lastname"
    },
    {
      "name": "Company Name",
      "value": "companyname"
    },
    {
      "name": "Phone Number",
      "value": "phone"
    },
    {
      "name": "Email",
      "value": "email"
    },
    {
      "name": "Contact Name",
      "value": "contactname"
    },]

  }

  loadForm(): void {

    this.get_all_service_addon();
    this.get_all_therapist();
    //this.get_all_region();
    //this.get_all_available_services();

    this.appointmentform = this.formBuilder.group({
      start_date: ['', Validators.required],
      selectcustomer: ['', Validators.required],
      service: '',
      serviceqty: '',
      servicetotal: '',
      serviceaddonqty: '',
      serviceaddontotal: '',
      ManualItem: '',
      ManualItemtotal: '',
      ManualItemqty: '',
      worknotes: '',
      privatenotes: '',
      invoicenotes: '',
      summarynotes: '',
      total: '',
      gratuity: '',
      custfilter: '',
    });

    this.customer = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
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
      emailpreferenceforcommunication: '',
      phonepreferenceforcommunication: '',
      messagepreferenceforcommunication: ''
    });
    //  this.addTherapist=[{value:''}];
  }
  onFilterChange(filter) {
    this.filter = filter
  }
  //filter
  customer_filter() {
    let condition = {};
    if (this.filter == undefined) {
      condition = {
        firstname: this.appointmentform.value.custfilter
      };
    }
    else {
      if (this.filter.value == "firstname") {
        condition = {
          firstname: this.appointmentform.value.custfilter
        };
      }
      else if (this.filter.value == "lastname") {
        condition = {
          lastname: this.appointmentform.value.custfilter
        };
      }
    }
    this.AppointmentService.customer_filter(condition).subscribe(result => {
      this.customersData.length = 0;
      this.customersData = result.ResponseMessage;
    })
  }
  get_all_appointment() {
    //debugger;
    this.appointmentService.get_all_Availability().subscribe(result => {
      //debugger;
      const resources = [], events = [];
      if (result.ResponseDetails.ResponseStatus == '10' && result.ResponseMessage.length > 0) {
        this.appointment = result.ResponseMessage;
        for (let i = 0; i < this.appointment.length; i++) {
          // let itemresource = {
          //   id: this.appointment[i]._id,
          //   appointmentId: this.appointment[i]._id,
          //    title: "new appoinment"
          // };

          // resources.push(itemresource);
          //this.titleVal = this.appointment[i].start_date +" "+ this.appointment[i].customer.firstname +" " + this.appointment[i].customer.lastname+" " +this.appointment[i].service[0].name+" " +this.appointment[i].therapist[0].firstname +" "+ this.appointment[i].therapist[0].lastname;

          let itemevent = {
            // id: this.appointment[i]._id,
            appointmentId: this.appointment[i]._id,
            title: this.appointment[i].notes,
            start: new Date(this.appointment[i].start_date),
            end: new Date(this.appointment[i].end_date)
          };
          events.push(itemevent);
        }
        //debugger;
        this.createscheduler(resources, events);
      }
      else {
        this.createscheduler(resources, events);
      }
    })
  }
  createscheduler(resources, events) {
    $('#calendar').fullCalendar('destroy');
    let containerEl: JQuery = $('#calendar');
    $('#calendar').fullCalendar({
      editable: true,
      selectable: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: new Date(),
      defaultView: 'agendaWeek',
      eventBackgroundColor: "#90EE90",
      minTime: env.environment.fullcalender_minTime,
      maxTime: env.environment.fullcalender_maxTime,
      allDaySlot: false,
      views: {
        agendaTwoDay: {
          type: 'agenda',
          duration: { days: 2 },
          // views that are more than a day will NOT do this behavior by default
          // so, we need to explicitly enable it
          groupByResource: true,
          //// uncomment this line to group by day FIRST with resources underneath
          // groupByDateAndResource: true
        }
      },
      eventClick: (calEvent, jsEvent, view) => {
        this.appoinmentId = calEvent.appointmentId;
        this.get_appointment_by_Id(this.appoinmentId);

      },
      select: (start, end, jsEvent, view) => {
        //debugger;
        this.createnewappointment(start)
      },
      //resources: resources,
      events: events
    });

  }

  reload_appointment() {
    //debugger;
    this.route.navigate(['book-massage/appointment']);
    this.modalRef.hide();
  }

  closeClick() {
    //debugger;
    this.appoinmentId = undefined;
  }

  createnewappointment(start: any) {
    if (this.addServices != undefined && this.addServices.length > 0)
      this.addServices.splice(0, this.addServices.length);
    if (this.appointment != undefined && this.appointment.service != undefined && this.appointment.service.length > 0)
      this.appointment.service.splice(0, this.appointment.service.length);

    if (this.addServiceAddon != undefined && this.addServiceAddon.length > 0)
      this.addServiceAddon.splice(0, this.addServiceAddon.length);
    if (this.appointment != undefined && this.appointment.service_addon != undefined && this.appointment.service_addon.length > 0)
      this.appointment.service_addon.splice(0, this.appointment.service_addon.length);

    if (this.addServices != undefined && this.addServices.length > 0)
      this.addServices.splice(0, this.addServices.length);

    // if(this.manualService != undefined && this.manualService.length > 0)
    // this.manualService.splice(0, this.manualService.length);
    // if(this.appointment != undefined && this.appointment.manual_enteries != undefined && this.appointment.manual_enteries.length > 0)
    // this.appointment.manual_enteries.splice(0, this.appointment.manual_enteries.length);

    this.addMoreServices(new service(), true);
    this.addMoreServicesAddon(new service_addons(), true);
    //this.addMoreManualItem(new manual_enteries());
    this.get_all_appointment_status();
    this.get_all_customer_from_bookmassage();
    // this.get_all_available_therapists()
    this.appointment.start_date = start.toISOString().slice(0, 16);
    this.modalRef = this.modalService.show(this.addappointmenttemplate);
  }

  get_appointment_by_Id(appointmentIdVal) {
    //debugger;
    this.appointmentService.get_appoinment_by_Id(appointmentIdVal).subscribe(aptbyIdData => {
      this.appointment = aptbyIdData.ResponseMessage.Appoinment;
      // this.appointment.customer = this.appointment.customer;

      // this.appointment.therapist = this.appointment.therapist;
      this.appointment.start_date = HelperService.toDateString(new Date(this.appointment.start_date));
      // this.appointment.manual_enteries = this.appointment.manual_enteries;

      // this.appointment.service_addons = this.appointment.service_addons;
      if (!this.appointment.service_addons || this.appointment.service_addons.length == 0) {
        this.appointment.service_addons.push(new service_addons());
      }

      // this.appointment.service = this.appointment.service;
      if (!this.appointment.service || this.appointment.service.length == 0) {
        this.appointment.service.push(new service());
      }

      this.modalRef = this.modalService.show(this.editappointmenttemplate);
    })
  }
  // StartDateChange(startdate: any) {
  //   let aptDuration = env.environment.aptDuration
  //   this.appointment.start_date = startdate.value;
  //   startdate = new Date(this.appointment.start_date);
  //   let condition = {
  //     startdate: startdate,
  //     enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
  //     servedregion: [{ "regionId": this.appointment.customer.address["0"].region._id, "subregionId": this.appointment.customer.address["0"].subregion._id }]
  //   }
  //   this.conditionArr = condition;
  // }

  selectcustomer(Select_customer: string) {
    //debugger
    if (Select_customer == "Corporate") {
      this.isCustomertype = true;
      this.Customertype = Select_customer
    }
    else {
      this.isCustomertype = false;
      this.Customertype = Select_customer

    }
  }
  openModal(template: TemplateRef<any>) {
    //debugger;
    this.modalRef = this.modalService.show(template);
  }


  get_all_appointment_status() {
    this.bookMassageService.get_all_appointment_status().subscribe(aptstatusData => {
      this.aptstatusData = aptstatusData;
    })
  }

  get_all_customer_from_bookmassage(): any {
    //debugger;
    this.bookMassageService.get_all_customer_from_bookmassage().subscribe(customersData => {
      //debugger;
      console.log(customersData);
      this.customersData = customersData;
    })
  }

  public onCustomerChange(customer: any) {
    //debugger;
    this.appointment.customer = customer;
    this.customerid = this.appointment.customer._id
    this.customerAdress = this.appointment.customer.address
    this.customerContact = this.appointment.customer.contacts["0"].phone
    this.get_all_available_therapists();
    this.get_all_available_services();
    this.get_all_service_addon();

  }

  public onStartDateChange() {  // event will give you full breif of action
    this.get_all_available_therapists();
    this.get_all_available_services();
  }

  get_all_available_services(): any {
    // this.servicesData.length = 0;
    let condition = {
      regionId: this.appointment.customer.addresses["0"].region._id,
      subregionId: this.appointment.customer.addresses["0"].subregion._id

    }
    this.appointmentService.get_all_available_services(condition).subscribe(therapistsData => {
      this.servicesData = therapistsData.ResponseMessage;
    })

  }

  create_appoinment() {
    //debugger;
    console.log('hi guys');

    if (this.appointmentStatus == {}) {
      //debugger;
      this.appointmentStatus = { name: this.aptstatusData[0].name, icon: this.aptstatusData[0].icon.class_name, color: this.aptstatusData[0].icon.color, font_color: this.aptstatusData[0].fontcolor }
    }
    let aptDuration = env.environment.aptDuration
    //this.appointment.start_date =start_date.value;
    let startdate = HelperService.toStringDate(this.appointment.start_date);
    let condition = {
      startdate: startdate,
      enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
      // servedregion: [{ "regionId": this.appointment.customer.address["0"].region._id, "subregionId": this.appointment.customer.address["0"].subregion._id }]
    }
    //debugger;
    this.conditionArr = condition;

    let CfieldArrayT = this.appointment.CfieldArrayT;
    let CfieldArrayC = this.appointment.CfieldArrayC;
    let RfieldArrayT = this.appointment.RfieldArrayT;
    let RfieldArrayC = this.appointment.RfieldArrayC;
    console.log(CfieldArrayT);
    console.log(CfieldArrayC);
    console.log(RfieldArrayT);
    console.log(RfieldArrayC);

    this.notes = "";
    this.manualService = { name: this.appointmentform.value.ManualItem, qty: this.appointmentform.value.ManualItemqty, cost: this.appointmentform.value.ManualItemtotal }
    // this.bookMassageService.create_appoinment(this.appointment.customer,
    //   this.addServices,
    //   this.appointmentStatus,
    //   this.therapistArr,
    //   this.addServiceAddon,
    //  // this.servicesAddonArr,
    //   this.conditionArr,
    //   this.manualService,
    //   this.appointmentform.value,
    //   this.notes,
    //   this.Total,
    //   CfieldArrayT,
    //   CfieldArrayC,
    //   RfieldArrayT,
    //   RfieldArrayC
    // ).subscribe(data => {
    //   //debugger;
    //   alert(data);
    //   this.get_all_appointment();
    // })
  }

  onServiceChange(selectedservice: service, currentserviceid: string) {
    //debugger;
    if (this.addServices.length > 0) {
      let dummyService = this.addServices.findIndex(s => s._id == currentserviceid);
      if (dummyService >= 0)
        // this.servicesArr.splice(0, this.servicesArr.length);
        // this.addServices.splice(dummyService, 1);
        this.addServices[dummyService] = selectedservice;
    }
    else
      // this.service = service;
      // this.service.qty = service.qty;
      // this.service.cost = service.cost;
      // //this.servicesArr.push(this.service)
      // service servic = new service(service._id)
      this.addServices.push(selectedservice);
    //this.servicesArr = service
    //this.addServiceName = service.name;
    this.manualTotal()

  }

  onServiceAddonChange(serviceAddon: service_addons, currentserviceAddonid: string) {
    //debugger;
    if (this.addServiceAddon.length > 0) {
      let dummyServiceAddon = this.addServiceAddon.findIndex(s => s._id == currentserviceAddonid);
      if (dummyServiceAddon >= 0)
        this.addServiceAddon[dummyServiceAddon] = serviceAddon;
    }
    else
      this.addServiceAddon.push(serviceAddon);
    //this.servicesAddonArr = serviceAddon
    // this.addServiceAddOnName = serviceAddon.name;

    // serviceAddon.qty = this.appointmentform.value.serviceaddonqty;
    // serviceAddon.cost = this.appointmentform.value.serviceaddontotal;
    // this.servicesAddonArr.push(serviceAddon)
    this.manualTotal()
  }

  onTherapistChange(therapist: therapist) {
    //debugger;

    // this.therapistArr = therapist;
    this.therapistId = this.appointmentform.value._id
    this.therapistAddress = this.appointmentform.value.address
    this.therapistContact = this.appointmentform.value.phone
    this.addTherapistName = this.appointmentform.value.name;
    this.therapistArr.push(therapist)
  }

  onAppointmentChange(status: any) {
    this.appointmentStatus = { name: status.name, icon: status.icon.class_name, color: status.icon.color, font_color: status.fontcolor }

  }

  get_all_available_therapists(): any {
    //debugger;
    let startdate = null, enddate = null;
    // startdate = HelperService.toStringDate(this.appointment.start_date);
    let aptDuration = env.environment.aptDuration
    startdate = new Date(this.appointment.start_date);
    let condition = {
      //startdate: new Date("2018-06-21 9:00:00"),//this.start_date,
      //compare start time not end time-- giri code review 27-06-2018
      startdate: startdate,
      enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
      servedregion: [{ "regionId": this.appointment.customer.addresses["0"].region._id, "subregionId": this.appointment.customer.addresses["0"].subregion._id }]
    }
    //debugger;
    this.conditionArr = condition;
    this.loading = true;
    this.appointmentService.get_all_available_therapists(condition).subscribe(therapistsData => {
      //debugger;
      this.loading = false;
      this.therapistsData = therapistsData.ResponseMessage;
    })
  }

  get_all_therapist() {
    this.appointmentService.get_all_therapist().subscribe(getTherapistData => {
      this.therapist = getTherapistData.ResponseMessage
    })
  }

  get_all_service_addon() {

    this.appointmentService.get_all_service_addon().subscribe(serviceAddOnData => {
      this.serviceAddOnData = serviceAddOnData.ResponseMessage;
    })
  }
  addMoretherapist() {
    this.addTherapist.push({ value: '' })
  }

  removeTherapist(value) {
    let index = this.addTherapist.indexOf(value);
    this.addTherapist.splice(index, 1);

  }

  addMoreServices(service: service, flag: boolean) {
    //debugger;
    //  if (this.addServices.length > 0) {
    //    let dummyService = this.addServices.findIndex(s => s._id == "-1");
    //    if (dummyService >= 0)
    //       this.servicesArr.splice(0, this.servicesArr.length);
    //      this.addServices.splice(dummyService, this.addServices.length);
    //  }
    // service._id = "-1";
    // service.name = "please select a service";
    // service.qty = 1;
    // service.cost = "";
    if (flag)
      this.addServices.push(service);
    else
      this.appointment.service.push(service);
  }

  removeService(value) {
    //debugger;
    let index = this.addServices.indexOf(value);
    this.addServices.splice(index, 1);
    this.manualTotal()
  }

  addMoreServicesAddon(serviceaddon: service_addons, flag: boolean) {
    //debugger;
    // serviceaddon.name = "";
    // serviceaddon.qty = 1;
    // serviceaddon.cost = "";
    if (flag)
      this.addServiceAddon.push(serviceaddon);
    else
      this.appointment.service_addon.push(serviceaddon);

    //this.addServiceAddon.push({ serviceAddOn: '' })
  }

  removeServiceAddon(value) {
    let index = this.addServiceAddon.indexOf(value);
    this.addServiceAddon.splice(index, 1);

  }

  addMoreManualItem() {
    //manualItem:  manual_enteries, flag: boolean
    // if(flag)
    //   this.manualService.push(manualItem);
    //   else
    //   this.appointment.manual_enteries.push(manualItem);
    this.manualItem.push({ manualItem: '' })
  }

  removeManualItem(value) {
    let index = this.manualItem.indexOf(value);
    this.manualItem.splice(index, 1);

  }
  manualTotal() {
    //debugger;
    this.Total = 0.00;
    let addontotal: any = 0;
    this.addServices.forEach(element => {
      let servicetotal = parseFloat(element.qty) * parseFloat(element.cost);
      this.Total += servicetotal;
      console.log(this.Total)
      //$event.target.value = parseFloat($event.target.value).toFixed(2);
    });

    this.addServiceAddon.forEach(element => {
      addontotal = parseFloat(element.qty) * parseFloat(element.cost);
      this.Total += addontotal;
      console.log(this.Total)
    });

    if (this.appointmentform.value.ManualItemtotal) {
      let manualtotal = parseFloat(this.appointmentform.value.ManualItemqty) * parseFloat(this.appointmentform.value.ManualItemtotal);
      this.Total += manualtotal;
    }
    // $event.target.value = parseFloat($event.target.value).toFixed(2);



    // else {
    //   if (addontotal)
    //     this.Total = addontotal + servicetotal;
    //   else
    //     this.Total = servicetotal;
    // }
  }
  setTwoNumberDecimal($event) {
    //debugger;
    $event.target.value = parseFloat($event.target.value).toFixed(2);
  }
  calgratuity() {
    if (this.appointmentform.value.gratuity)
      this.Total += parseFloat(this.appointmentform.value.gratuity);
    else
      this.manualTotal();
  }
  redirectLoad() {
    //debugger;
    this.route.navigate(['book-massage/appointment'], { queryParams: { appointmentId: this.appoinmentId } });
  }

  update_appoinment() {
    // let appSts = this.appointme9ntStatus;
    if (this.appointmentStatus == {}) {
      this.appointmentStatus = { name: this.aptstatusData[0].name, icon: this.aptstatusData[0].icon.class_name, color: this.aptstatusData[0].icon.color, font_color: this.aptstatusData[0].fontcolor }
    }
    this.notes = "";
    this.manualService = { name: this.appointmentform.value.ManualItem, qty: this.appointmentform.value.ManualItemqty, cost: this.appointmentform.value.ManualItemtotal }
    this.appointmentService.update_appoinment(this.appoinmentId,
      this.appointment.customer,
      this.servicesArr,
      this.appointmentStatus,
      this.therapistArr,
      this.servicesAddonArr,
      this.conditionArr,
      this.manualService,
      this.appointmentform.value,
      this.notes,
      this.Total
    ).subscribe(data => {
      alert(data)
    })
  }
  //add new customer========================================================
  Imageupload(image) {
    this.image = image;
    this.confirmModalRef.hide();
  }

  openConfirmModal(imagetemplate: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(imagetemplate);
  }

  customerpop(event) {
    //debugger;
    this.isCustomer = true
    // this.appointment.customerAdress;
    //this.appointment.customerContact;

  }
  closepopup() {
    //debugger;
    this.isCustomer = false
  }
  opentherapist(event) {
    //debugger;
    this.isTherapist = true
  }
  closepopuptherapist() {
    this.isTherapist = false
  }

  openTab(event, tabname) {
    //debugger;
    if (tabname == "work") {
      this.Notename = "Work order notes";
      this.work = true;
      this.private = false;
      this.invoice = false;
      this.summary = false;
    } else if (tabname == "private") {
      this.Notename = "Private notes";
      this.private = true;
      this.work = false;
      this.invoice = false;
      this.summary = false;
    } else if (tabname == "invoice") {
      this.Notename = "Invoice notes";
      this.invoice = true;
      this.work = false;
      this.private = false;
      this.summary = false;
    } else if (tabname == "summary") {
      this.Notename = "Summary notes";
      this.summary = true;
      this.work = false;
      this.private = false;
      this.invoice = false;
    }
  }

  load_appointment() {
    //debugger;
    //this.get_appointment_by_Id(this.editappointmenttemplate);
    // this.route.navigate(['book-massage/appointment'], { queryParams: { appointmentId: this.appoinmentId } })
    this.sharedService.setAppointment(this.appointment);
    this.modalRef.hide();

  }

}

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}
export class Constants {
  static readonly DATE_FMT = 'dd/MMM/yyyy';
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm:ss`;
}

