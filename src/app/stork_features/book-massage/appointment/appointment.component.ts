import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AppointmentValidationService } from "app/stork_features/book-massage/appointment/appointment-servicesvalidation.service";
import { AppointmentService } from './appointment.service';
import * as env from 'environments/environment';
import { isEmpty } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CropperSettings } from 'ng2-img-cropper';
import { BookMassageService } from '../book-massage.service';
import { MatTableDataSource } from '@angular/material';
import { AlertNotificationComponent } from '../alert-notification/alert-notification.component';
import { appointment_statuses, customer, service_addons, therapist, Region, Subregion, appointment, service, manual_enteries } from '../model/appointment.model';
import { utc } from 'moment';
import HelperService from '../../shared/HelperService';
//import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
//import { NgControl, Directive, Input } from '@angular/forms';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss'],
    providers: [AppointmentService, BookMassageService],
    encapsulation: ViewEncapsulation.None,
})
export class AppointmentComponent implements OnInit {
    marginset: any = "-5px";
    serviceAddOnData: [service_addons];
    public loading = false;
    appointment: appointment;
    isCustomertype: boolean = false;
    modalRef: BsModalRef;
    position = 'after';
    appointmentform: FormGroup;
    customer: FormGroup;
    aptstatusData: appointment_statuses[];
    customersData: customer[];
    // customersData: any = [];
    start_date: Date;
    therapistsData: therapist[];
    servicesData: service[];
   // addTherapist = [{ value: '' }];
    addTherapist: therapist[];
    addServices = [{ service: '' }];
    addServiceAddon = [{ serviceAddOn: '' }];
    manualItem: manual_enteries[];
    servicesArr: any = [];
    servicesAddonArr: any = [];
    therapistArr: any = [];
    conditionArr: {}
    appointmentStatus = {};
    therapist: therapist[];
    notes: string;
    manualService: {};
    Total: any = 0.00;
    customerid: any;
    therapistId: any;
    gratuity: any = 0.00;

    filterArr = [{}]
    filter: any;


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
    regions: [Region];
    sub_regions: [Subregion];
    subregions: [Subregion];
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
    customerContactno: any;
    customerPhone: any = [];
    customer_adress: any = [];
    therapistVal: any;
    serviceVal: any;
    serviceAddOnVal: any;
    addServiceName: any;
    addTherapistName: any;
    addServiceAddOnName: any;
    color: string;
    dateNow: any;
    @ViewChild(AlertNotificationComponent) alertNotificationComponent;
    message: any;

    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'MMM-dd-yyyy hh:mm a',
        defaultOpen: false
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        public modalService: BsModalService,
        private formBuilder: FormBuilder,
        private appointmentService: AppointmentService,
        public bookMassageService: BookMassageService,
        private route: Router,
        //  private datePipe: DatePipe
    ) {
        debugger;
        // this.appointment;
        // if (this.appointment == null)
        //     this.appointment = {};
        this.appointment = new appointment();
        //  this.appointment.customer = new customer();
        // this.appointment.start_date = new Date();
        this.appointment.start_date = HelperService.toDateString(new Date());

        //   this.appointment.start_date = this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm');

        //this.cropperSettings = new CropperSettings();
        // this.data = {};
    }

    ngOnInit() {
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


        this.activatedRoute.queryParams.subscribe((params) => {
            let appointmentId = params['appointmentId'];
            if (appointmentId != undefined)
                this.get_appointment_by_Id(appointmentId);
        });
    }

    ngAfterViewInit() {
        this.message = this.alertNotificationComponent.color
        // alert(this.message);
    }

    ngOnChanges() {
        this.bookMassageService.setAppointment("test nilesh");
    }

    loadForm(): void {
        this.get_all_appointment_status();
        this.get_all_customer_from_bookmassage();
        this.get_all_service_addon();
        //  this.get_all_therapist();
        this.get_all_region();
        // this.get_all_available_services();

        this.appointmentform = this.formBuilder.group({
            start_date: ['', Validators.required],
            selectcustomer: ['', Validators.required],
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

        this.appointmentform.valueChanges.subscribe(
            changeddata => {
                this.bookMassageService.setAppointment(this.appointment);
            })

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
        // this.bookMassageService.customer_filter(condition).subscribe(result => {
        //     this.customersData.length = 0;
        //     this.customersData = result.ResponseMessage;
        // })
    }
    //  StartDateChange(startdate: any) {

    //     let aptDuration = env.environment.aptDuration
    //     this.appointment.start_date = startdate.value;
    //      startdate = HelperService.toStringDate(this.appointment.start_date);
    //     let condition = {
    //         startdate: startdate,
    //         enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
    //         // servedregion: [{ "regionId": this.appointment.customer.address["0"].region._id, "subregionId": this.appointment.customer.address["0"].subregion._id }]
    //     }
    //     this.conditionArr = condition;
    // }

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
    openModal(template: TemplateRef<any>) {
        debugger;
        this.modalRef = this.modalService.show(template);
    }

    //get all
    get_appointment_by_Id(appointmentIdVal) {
        this.bookMassageService.get_appoinment_by_Id(appointmentIdVal).subscribe(aptbyIdData => {
            this.appointment = aptbyIdData.ResponseMessage.Appoinment;

            this.appointment.customer = this.appointment.customer;
            if (this.customersData != undefined)
            this.customersData.splice(0, this.customersData.length);
            this.customersData.push(this.appointment.customer);

            //let therapistadd = this.appointment.therapist;
            //this.addTherapist.splice(0, this.addTherapist.length);
            this.therapistsData = this.addTherapist = this.appointment.therapist;

            // this.appointment.service = this.appointment.service;
            // this.servicesData.slice(0, this.servicesData.length);
            this.servicesData = this.appointment.service;

            // this.appointment.service_addons = this.appointment.service_addons;
            this.serviceAddOnData = this.appointment.service_addons;

         
          //  this.appointment.appointment_statuses = this.appointment.appointment_statuses;
            //if (this.aptstatusData != undefined)
           // this.aptstatusData.splice(0, this.aptstatusData.length);
        
         // let appointment_statuses= this.appointmentform.value.aptstatusData;
           // this.aptstatusData.push(appointment_statuses); 

            this.appointment.start_date = HelperService.toDateString(new Date(this.appointment.start_date));
            this.manualItem = this.appointment.manual_enteries;
           

            if (this.appointment.service_addons.length > 0)
                this.appointment.service_addons = this.appointment.service_addons;
            else {
                this.appointment.service_addons.push(new service_addons("-1", 'Please Select', '0.00', 1, '', '', ''));
            }

            if (this.appointment.service.length > 0)
                this.appointment.service = this.appointment.service;
            else {
                this.appointment.service.push(new service("-1", 'Please Select', '', '0.00', 1, '', '', 0, ''));
            }

        })
    }

    get_all_appointment_status() {
        this.bookMassageService.get_all_appointment_status().subscribe(aptstatusData => {
            this.aptstatusData = aptstatusData;
        })
    }

    get_all_customer_from_bookmassage(): any {
        this.bookMassageService.get_all_customer_from_bookmassage().subscribe(customersData => {
            this.customersData = customersData;
            console.log(customersData);
        })
    }

    public onCustomerChange(customer: any) {
        debugger
        this.appointment.customer = customer;
        this.customerid = this.appointment.customer._id
        // this.customerAdress = this.appointment.customer.address
        // this.customerContact = this.appointment.customer.contacts;
        this.get_all_available_therapists();
        this.get_all_available_services();
        this.get_all_service_addon();
        // this.onContactChange(this.customerContact);
        //this.onAddressChange(this.customerAdress["0"]);
    }

    public onContactChange(customerContact: any[]) {
        debugger;
        for (let i = 0; i < customerContact.length; i++)
            this.customerContactno = this.customerContact.find(c => c.contact_name == customerContact[i].contact_name);
        //this.customerPhone = this.customerContactno.phone
    }

    public onContactChangeContactno(customerContact) {
        this.customerContactno = this.customerContact.find(c => c.contact_name == customerContact.contact_name);
        this.customerPhone = this.customerContactno.phone;
        debugger;
        this.customerPhone.push({ 'phone': this.customerContactno.mobileno });
    }
    onChangereload() {

    }
    onAddressChange(customerAdress: any) {
        debugger;

        this.customer_adress = this.customerAdress.find(c => c._id == customerAdress._id);
        //this.customerPhone=this.customerContactno.phone
    }

    public onStartDateChange() {  // event will give you full breif of action
        //  this.get_all_available_therapists();
        //  this.get_all_available_services();
    }

    get_all_available_services(): any {
        //this.servicesData.length = 0;
        let condition = {
            regionId: this.appointment.customer.addresses["0"].region._id,
            subregionId: this.appointment.customer.addresses["0"].subregion._id

        }
        this.bookMassageService.get_all_available_services(condition).subscribe(servicesData => {
            this.servicesData = servicesData;
            //this.servicesData = therapistsData.ResponseMessage;
        })

    }

    onServiceChange(service: any) {
        debugger;
        this.serviceVal = service;
        //this.serviceId=service._id;
        this.servicesArr.push(service);
        this.addServiceName = service.name;
        this.manualTotal()

    }

    onServiceAddonChange(serviceAddon: any) {
        this.serviceAddOnVal = serviceAddon;
        this.servicesAddonArr.push(serviceAddon);
        this.addServiceAddOnName = serviceAddon.name;
        this.manualTotal()
    }

    onTherapistChange(therapist: any) {
        debugger;
        this.therapistVal = therapist;
        this.therapistArr.push(therapist);
        //this.therapistId = this.therapistArr._id
        this.therapistAddress = this.therapistArr.address;
        this.therapistContact = this.therapistArr.phone;
        this.addTherapistName = therapist.name;
    }


    onAppointmentChange(status: any) {
        this.appointmentStatus = { name: status.name, icon: status.icon.class_name, color: status.icon.color, font_color: status.fontcolor }

    }

    get_all_available_therapists(): any {
        debugger;
        let startdate = null, enddate = null;
        startdate = HelperService.toStringDate(this.appointment.start_date);
        let aptDuration = env.environment.aptDuration
        //   startdate = new Date(this.appointment.start_date);
        let condition = {
            //startdate: new Date("2018-06-21 9:00:00"),//this.start_date,
            //compare start time not end time-- giri code review 27-06-2018
            startdate: startdate,

            enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
            servedregion: [{ "regionId": this.appointment.customer.addresses["0"].region._id, "subregionId": this.appointment.customer.addresses["0"].subregion._id }]
        }
        this.conditionArr = condition;
        this.loading = true;
        this.bookMassageService.get_all_available_therapists(condition).subscribe(therapistsData => {
            this.therapistsData = therapistsData;
            //console.log(therapistsData);
            this.loading = false;
           
        })
    }

    get_all_therapist() {
        this.bookMassageService.get_all_therapist().subscribe(therapistData => {
            this.therapist = therapistData
        })
    }

    get_all_service_addon() {
        this.bookMassageService.get_all_service_addon().subscribe(serviceAddOnData => {
            this.serviceAddOnData = serviceAddOnData;
            // this.serviceAddOnData = serviceAddOnData.ResponseMessage;
        })
    }
    addMoretherapist() {
        debugger;
        //this.addTherapist.push({ value: '' })

        // this.addTherapist.push({ value: this.therapistArr.name })
        // this.marginset = "-9px";
        let therapistadd = this.appointmentform.value.therapist;
        this.therapist.push(therapistadd);
    }
    removeTherapist(value) {
        let index = this.addTherapist.indexOf(value);
        this.addTherapist.splice(index, 1);

    }

    addMoreServices() {
        //this.addServices.push({ service: '' })

        // this.addServices.push({ service: this.servicesArr.name })

        let serviceadd = this.appointmentform.value.servicesData;
        this.servicesData.push(serviceadd);
    }

    removeService(value) {
        let index = this.addServices.indexOf(value);
        this.addServices.splice(index, 1);

    }

    addMoreServicesAddon() {
        //this.addServiceAddon.push({ serviceAddOn: '' })
    
        // this.addServiceAddon.push({ serviceAddOn: this.servicesAddonArr.name })
        let serviceaddon = this. appointmentform.value.serviceAddOnData;
        this.serviceAddOnData.push(serviceaddon);
    }

    removeServiceAddon(value) {
        let index = this.addServiceAddon.indexOf(value);
        this.addServiceAddon.splice(index, 1);

    }

    addMoreManualItem() {
        debugger;
        //this.manualItem.push({ manualItem: '' })
        //{ manualItem: this.appointmentform.value.ManualItem }
        //  let manual_entery = new manual_enteries();
        
        let manual_entery = this.appointmentform.value.ManualItem;
         this.manualItem.push(manual_entery);
    }

    removeManualItem(value) {
        let index = this.manualItem.indexOf(value);
        this.manualItem.splice(index, 1);

    }
    manualTotal() {
        debugger;
        this.Total = 0.00;
        let addontotal: any = 0;
        let servicetotal = parseFloat(this.servicesArr.qty) * parseFloat(this.servicesArr.cost);
        this.Total += servicetotal;
        if (this.servicesAddonArr.cost) {
            addontotal = parseFloat(this.servicesAddonArr.qty) * parseFloat(this.servicesAddonArr.cost);
            this.Total += addontotal;


        }
        else {
            this.Total += servicetotal;
        }
        if (this.appointmentform.value.ManualItemtotal) {
            let manualtotal = parseFloat(this.appointmentform.value.ManualItemqty) * parseFloat(this.appointmentform.value.ManualItemtotal);
            this.Total += manualtotal;
        }
        else {
            if (addontotal)
                this.Total = addontotal + servicetotal;
            else
                this.Total = servicetotal;
        }
    }
    calgratuity() {
        if (this.appointmentform.value.gratuity)
            this.Total += parseFloat(this.appointmentform.value.gratuity);
        else
            this.manualTotal();
    }


    //
    reset_appointment() {
        debugger;
        //this.alert_notification.CfieldArrayT=null;
        this.alertNotificationComponent.CfieldArrayT = null;
        this.alertNotificationComponent.CfieldArrayC = null;
        this.alertNotificationComponent.RfieldArrayT = null;
        this.alertNotificationComponent.RfieldArrayC = null;
        this.customersData = null;

        //this.appointment.start_date = new Date();
        // this.cropperSettings = new CropperSettings();
        //this.data = {};
        this.therapistsData = null;
        this.servicesData = null;
        //this.servicesAddonArr=null;
        this.serviceAddOnData = null;
    }

    //
    create_appoinment() {
        debugger;
        let aptDuration = env.environment.aptDuration
        //this.appointment.start_date =start_date.value;
        let startdate = HelperService.toStringDate(this.appointment.start_date);
        let condition = {
            startdate: startdate,
            enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
            // servedregion: [{ "regionId": this.appointment.customer.address["0"].region._id, "subregionId": this.appointment.customer.address["0"].subregion._id }]
        }
        this.conditionArr = condition;

        let CfieldArrayT = this.alertNotificationComponent.CfieldArrayT;
        let CfieldArrayC = this.alertNotificationComponent.CfieldArrayC;
        let RfieldArrayT = this.alertNotificationComponent.RfieldArrayT;
        let RfieldArrayC = this.alertNotificationComponent.RfieldArrayC;
        // if (this.appointmentStatus == {}) {
        //     this.appointmentStatus = { name: this.aptstatusData[0].name, icon: this.aptstatusData[0]., color: this.aptstatusData[0].color, font_color: this.aptstatusData[0].fontcolor }
        // }
        this.notes = "";
        this.manualService = { name: this.appointmentform.value.ManualItem, qty: this.appointmentform.value.ManualItemqty, cost: this.appointmentform.value.ManualItemtotal }
        this.bookMassageService.create_appoinment(this.appointment.customer,
            this.servicesArr,
            this.appointmentStatus,
            this.therapistArr,
            this.servicesAddonArr,
            this.conditionArr,
            this.manualService,
            this.appointmentform.value,
            this.notes,
            this.Total,
            CfieldArrayT,
            CfieldArrayC,
            RfieldArrayT,
            RfieldArrayC

        ).subscribe(data => {
            alert(data)
        })
    }
    //add new customer========================================================
    Imageupload(image) {
        this.image = image;
        this.confirmModalRef.hide();
    }
    get_all_region() {
        this.bookMassageService.get_all_regions().subscribe(regionData => {
            this.regions = regionData.ResponseMessage.regions.map(region => ({ _id: region._id, name: region.name, selected: false }));
        })
    }

    get_all_subregion() {
        this.bookMassageService.get_all_subregion().subscribe(subregiondata => {
            this.sub_regions = subregiondata.ResponseMessage.subregions.map(subregion => ({ _id: subregion._id, name: subregion.name, regionId: subregion.regionId, selected: false }));
        })
    }
    get_all_subregion_by_regionId(regionId) {
        this.bookMassageService.get_all_subregion_by_regionId(regionId).subscribe(data => {
            this.subregions = data.ResponseMessage.subregions;
        })
    }
    selectedregionRow(selectedregion) {
        this.selectedregion = selectedregion;
        this.get_all_subregion_by_regionId(this.selectedregion._id);

    }
    openConfirmModal(imagetemplate: TemplateRef<any>) {
        this.confirmModalRef = this.modalService.show(imagetemplate);
    }
    create_customer() {
        debugger;
        this.customer.value.emailpreferenceforcommunication = this.emailpreferenceforcommunication;
        this.customer.value.phonepreferenceforcommunication = this.phonepreferenceforcommunication;
        this.customer.value.messagepreferenceforcommunication = this.messagepreferenceforcommunication;
        this.bookMassageService.create_customer(this.image, this.customer.value, this.selectedregion.name, this.Customertype).subscribe(Createdata => {
            this.modalRef.hide();
            this.get_all_customer_from_bookmassage();

        })
    }
    delete_appoinment_by_Id() {
        debugger;
        this.bookMassageService.delete_appoinment_by_Id().subscribe(result => {
            debugger;
        })
    }

    setTwoNumberDecimal($event) {
        $event.target.value = parseFloat($event.target.value).toFixed(2);
    }
    customerpop(event) {
        this.isCustomer = true
    }
    closepopup() {
        debugger;
        this.isCustomer = false
    }
    opentherapist(event) {
        this.isTherapist = true
    }
    closepopuptherapist() {
        this.isTherapist = false
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

//   @Directive({
//     selector: '[disableControl]'
//   })
//   export class DisableControlDirective {

//     @Input() set disableControl( condition : boolean ) {
//       const action = condition ?'disable' : 'enable';
//       this.ngControl.control[action]();
//     }

//     constructor( private ngControl : NgControl ) {
//     }

//   }