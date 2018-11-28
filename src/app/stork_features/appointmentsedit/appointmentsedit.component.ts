// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-appointmentsedit',
//   templateUrl: './appointmentsedit.component.html',
//   styleUrls: ['./appointmentsedit.component.scss']
// })
// export class AppointmentseditComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AppointmentseditValidationService } from "app/stork_features/appointmentsedit/appointmentsedit-servicesvalidation.service";
import { AppointmentseditService } from './appointmentedit.service';
import * as env from 'environments/environment';
import { isEmpty } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointmentsedit.component.html',
  styleUrls: ['./appointmentsedit.component.scss'],
  providers: [AppointmentseditService],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentseditComponent implements OnInit {
  serviceAddOnData: any;

  appointment: any;
  isCustomertype: boolean = false;
  modalRef: BsModalRef;
  position = 'after';
  appointmentform: FormGroup;
  customerform: FormGroup;
  aptbyIdData: any = [];
  aptstatusData: any = [];
  customersData: any = [];
  start_date: Date;
  therapistsData:  any = [];
  servicesData:  any = [];
  addTherapist = [{ value: '' }];
  addServices = [{ service: '' }];
  addServiceAddon = [{ serviceAddOn: '' }]
  manualItem = [{ manualItem: '' }]
  servicesArr: any=[];
  servicesAddonArr: any=[];
  therapistArr:any=[];
  conditionArr:{}
  appointmentStatus={};
  therapist: any=[];
  notes:string;
  appointmentIdVal:any;

  aptstsNamebyId:any;  
  customerNamebyId:any;
  therapistsNamebyId:any;
  serviceNamebyId:any;
  serviceAddonNamebyId:any;
  startDateById:any;
  serviceCostById:any;
  serviceQtyById:any;
  serviceAddonCostById:any;
  serviceAddonQtyById:any;
  manualNameById:any;
  manualCostById:any;
  manualQtyById:any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentseditService,
    private router: Router,
    
  ) {
//debugger;
this.activatedRoute.queryParams.subscribe((params) => {
  this.appointmentIdVal = params['appointmentId'];
  this.get_appointment_by_Id(this.appointmentIdVal);
});
    if (this.appointment == null)
      this.appointment = {};
    //this.appointment.start_date = new Date();
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.get_all_appointment_status();
    this.get_all_customer_from_bookmassage();
    this.get_all_service_addon();
    this.get_all_therapist();
   // this.get_all_available_services();

    this.appointmentform = this.formBuilder.group({
      start_date: ['', Validators.required],
      selectcustomer: ['', Validators.required],
      serviceqty:'',
      servicetotal:'',
      serviceaddonqty:'',
      serviceaddontotal:'',
      ManualItem:'',
      ManualItemtotal:'',
      ManualItemqty:'',
      worknotes:'',
      privatenotes:'',
      invoicenotes:'',
      summarynotes:'',
    });

    this.customerform = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, AppointmentseditValidationService.emailValidator])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
    //  this.addTherapist=[{value:''}];
  }

  StartDateChange(startdate:any){
    //debugger;
    let aptDuration = env.environment.aptDuration    
    this.appointment.start_date = startdate.value;
    startdate = new Date(this.appointment.start_date);
    let condition = {
      startdate: startdate,
      enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
      servedregion: [{ "regionId": this.appointment.customer.address["0"].region._id, "subregionId": this.appointment.customer.address["0"].subregion._id }]
    }
    this.conditionArr=condition;
  }

  selectcustomer(Select_customer: string) {
    if (Select_customer == "Corporate") {
      this.isCustomertype = true;
      this.customerform = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, AppointmentseditValidationService.emailValidator])],
        companyname: ['', Validators.required]

      });
    }
    else {
      this.isCustomertype = false;
      this.customerform = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, AppointmentseditValidationService.emailValidator])],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required]

      });
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  redirectToAppoin()
  {
      this.router.navigateByUrl('/appointments');    
  }
  redirectToBookMassAppoin()
  {
    //debugger;
    //this.router.navigateByUrl('/book-massage/appointment'); 
    this.router.navigate(['book-massage/appointment'], {queryParams: {appointmentId: this.appointmentIdVal}});       
  }
  //get all
  get_appointment_by_Id(appointmentIdVal) {
    //debugger;
    this.appointmentService.get_appoinment_by_Id(appointmentIdVal).subscribe(aptbyIdData => {
      this.aptbyIdData = aptbyIdData.ResponseMessage;
      this.startDateById=this.aptbyIdData.Appoinment;
      this.startDateById=this.startDateById.start_date;
      //this.appointment.start_date = this.datePipe.transform(this.startDateById, 'dd/MM/yyyy hh:mm a');
      this.appointment.start_date = new Date(this.startDateById);
      
      this.customerNamebyId=this.aptbyIdData.Appoinment;
      this.customerNamebyId=this.customerNamebyId.customer.firstname+' '+
                            this.customerNamebyId.customer.lastname;
      this.therapistsNamebyId=this.aptbyIdData.Appoinment;
      this.therapistsNamebyId=this.therapistsNamebyId.therapist[0].firstname+' '+
                            this.therapistsNamebyId.therapist[0].lastname;      
      this.serviceNamebyId=this.aptbyIdData.Appoinment;
      this.serviceNamebyId=this.serviceNamebyId.service[0].name;
      
      this.serviceCostById=this.aptbyIdData.Appoinment;
      this.serviceCostById=this.serviceCostById.service[0].cost;

      this.serviceQtyById=this.aptbyIdData.Appoinment;
      this.serviceQtyById=this.serviceQtyById.service[0].qty;


      this.serviceAddonNamebyId=this.aptbyIdData.Appoinment;
      this.serviceAddonNamebyId=this.serviceAddonNamebyId.service_addons[0].name;

      this.serviceAddonCostById=this.aptbyIdData.Appoinment;
      this.serviceAddonCostById=this.serviceAddonCostById.service_addons[0].cost;

      this.serviceAddonQtyById=this.aptbyIdData.Appoinment;
      this.serviceAddonQtyById=this.serviceAddonQtyById.service_addons[0].qty;

      this.manualCostById=this.aptbyIdData.Appoinment;
      this.manualCostById=this.manualCostById.manual_enteries[0].cost;

      this.manualQtyById=this.aptbyIdData.Appoinment;
      this.manualQtyById=this.manualQtyById.manual_enteries[0].qty;

      this.manualNameById=this.aptbyIdData.Appoinment;
      this.manualNameById=this.manualNameById.manual_enteries[0].name;

      this.aptstsNamebyId=this.aptbyIdData.Appoinment;
      this.aptstsNamebyId=this.aptstsNamebyId.appointment_statuses.name;
    
    })
  }

  get_all_appointment_status() {
    this.appointmentService.get_all_appointment_status().subscribe(aptstatusData => {
      this.aptstatusData = aptstatusData.ResponseMessage;
    })
  }

  get_all_customer_from_bookmassage(): any {
    this.appointmentService.get_all_customer_from_bookmassage().subscribe(customersData => {
      this.customersData = customersData.ResponseMessage;
    })
  }

  public onCustomerChange(customer: any) { 
    //debugger // event will give you full breif of action
    this.appointment.customer = customer;
    this.get_all_available_therapists();
     this.get_all_available_services();
  }

  public onStartDateChange() {  // event will give you full breif of action
    this.get_all_available_therapists();
    this.get_all_available_services();
  }

  get_all_available_services(): any {
    this.servicesData.length=0;
    let condition = {
      regionId: this.appointment.customer.address["0"].region._id,
      subregionId: this.appointment.customer.address["0"].subregion._id
      
    }
    this.appointmentService.get_all_available_services(condition).subscribe(therapistsData => {
      this.servicesData = therapistsData.ResponseMessage;
    })

  }
  onServiceChange(service:any){
    this.servicesArr=service

  }
  onServiceAddonChange(serviceAddon:any){
  this.servicesAddonArr=serviceAddon
  }
  onTherapistChange(therapist:any){
    this.therapistArr=therapist;
  }
  onAppointmentChange(status:any){
   this.appointmentStatus={name:status.name,icon:status.icon.class_name,color:status.icon.color,font_color:status.fontcolor }
   
  }
  get_all_available_therapists(): any {
    //debugger;
    let startdate = null, enddate = null;
    let aptDuration = env.environment.aptDuration
    startdate = new Date(this.appointment.start_date);
    let condition = {
      //startdate: new Date("2018-06-21 9:00:00"),//this.start_date,
      //compare start time not end time-- giri code review 27-06-2018
      startdate: startdate,
      enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
      servedregion: [{ "regionId": this.appointment.customer.address["0"].region._id, "subregionId": this.appointment.customer.address["0"].subregion._id }]
    }
    this.conditionArr=condition;
    this.appointmentService.get_all_available_therapists(condition).subscribe(therapistsData => {
      //debugger;
      this.therapistsData = therapistsData.ResponseMessage;
    })
  }
  get_all_therapist() {
    this.appointmentService.get_all_therapist().subscribe(getTherapistData => {
      //debugger;
      this.therapist = getTherapistData.ResponseMessage
    })
  }
  get_all_service_addon() {
    //debugger
    this.appointmentService.get_all_service_addon().subscribe(serviceAddOnData => {
      //debugger;
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
  addMoreServices() {
    this.addServices.push({ service: '' })
  }
  removeService(value) {
    let index = this.addServices.indexOf(value);
    this.addServices.splice(index, 1);

  }
  addMoreServicesAddon() {
    this.addServiceAddon.push({ serviceAddOn: '' })
  }
  removeServiceAddon(value) {
    //debugger;
    let index = this.addServiceAddon.indexOf(value);
    this.addServiceAddon.splice(index, 1);

  }
  addMoreManualItem() {
    this.manualItem.push({ manualItem: '' })
  }
  removeManualItem(value) {
    let index = this.manualItem.indexOf(value);
    this.manualItem.splice(index, 1);

  }
  create_appoinment(){
  //debugger;
 // let appSts = this.appointme9ntStatus;
  if(this.appointmentStatus=={})
    {
      this.appointmentStatus={name:this.aptstatusData[0].name,icon:this.aptstatusData[0].icon.class_name,color:this.aptstatusData[0].icon.color,font_color:this.aptstatusData[0].fontcolor }
    }
   this.notes= "start_date:"+this.appointment.start_date +","
   +"firstname:"+ this.appointment.customer.firstname +","
  +"lastname:"+this.appointment.customer.lastname+"," 
  +"serviceaddon:"+this.servicesAddonArr.name+"," 
  +"therapistname:"+this.therapistArr.name;

  this.appointmentService.create_appoinment(this.appointment.customer,
    this.servicesArr,
    this.appointmentStatus,
    this.therapistArr,
    this.therapist,
    this.servicesAddonArr,
    this.conditionArr,
    this.appointmentform.value,
    this.notes
  ).subscribe(data=>{
   alert(data)
  })
  }
}

