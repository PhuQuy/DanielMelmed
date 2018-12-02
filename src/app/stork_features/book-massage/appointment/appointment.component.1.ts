import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
import { AuthService } from '@app/stork_features/shared/auth.service';
//import { NgControl, Directive, Input } from '@angular/forms';
import * as moment from 'moment';

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
    addServices: [any] = [{ service: '' }];
    addServiceAddon: [any] = [{ serviceAddOn: '', qty: null, cost: null }];
    manualItems: manual_enteries[];
    addManualItems: [any] = [{ name: '', qty: null, cost: null }];
    servicesArr: any = [];
    servicesAddonArr: any = [];
    therapistArr: any = [];
    conditionArr: {}
    appointmentStatus = {};
    therapist: therapist[];
    notes: string;
    manualService: {};
    total: any = 0.00;
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
    isTherapist: boolean = false;
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
    @ViewChild('detectFile') detectFile: ElementRef;

    message: any;

    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'MMM-dd-yyyy hh:mm a',
        defaultOpen: false
    }
    therapistList: [any] = [{ _id: null }];
    selectedTherapist: any;
    addonCostPerUnit = 0;
    serviceCostPerUnit = 0;
    tip = 0;
    constructor(
        private activatedRoute: ActivatedRoute,
        public modalService: BsModalService,
        private formBuilder: FormBuilder,
        private appointmentService: AppointmentService,
        public bookMassageService: BookMassageService,
        private route: Router,
        protected authService: AuthService
        //  private datePipe: DatePipe
    ) {
        //debugger;
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
        }]


        this.activatedRoute.queryParams.subscribe((params) => {
            let appointmentId = params['appointmentId'];
            if (appointmentId != undefined)
                this.get_appointment_by_Id(appointmentId);
        });

    }

    ngAfterViewInit() {
        if (this.alertNotificationComponent) {
            this.message = this.alertNotificationComponent.color
        }
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

    tooltip: any;

    toggleToolstip(tooltip?) {
        if (tooltip) {
            this.tooltip = tooltip;
        }
        if (this.tooltip.isOpen()) {
            this.tooltip.close();
        } else {
            this.tooltip.open();
        }
    }

    therapistTooltips: any;
    toggleTherapistsToolstip(tooltip?, greeting?, phone?) {
        console.log(phone);

        if (tooltip) {
            this.therapistTooltips = tooltip;
        }
        if (this.therapistTooltips.isOpen()) {
            this.therapistTooltips.close();
        } else {
            this.therapistTooltips.open({ greeting, phone });
        }
    }

    openTherapistsToolstip(tooltip, greeting, phone) {
        this.therapistTooltips = tooltip;
        if (this.therapistTooltips.isOpen()) {
            this.therapistTooltips.close();
            this.therapistTooltips.open({ greeting, phone, tooltip });
        } else {
            this.therapistTooltips.open({ greeting, phone, tooltip });
        }
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
    // StartDateChange(startdate: any) {
    //     console.log(this.appointment.start_date);
    //     console.log(startdate);

        // let aptDuration = env.environment.aptDuration
        // this.appointment.start_date = startdate.value;
        //  startdate = HelperService.toStringDate(this.appointment.start_date);
        // let condition = {
        //     startdate: startdate,
        //     enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
        //     // servedregion: [{ "regionId": this.appointment.customer.address["0"].region._id, "subregionId": this.appointment.customer.address["0"].subregion._id }]
        // }
        // this.conditionArr = condition;
    // }

    selectcustomer(Select_customer: string) {
        //debugger
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
        //debugger;
        this.modalRef = this.modalService.show(template);
    }

    //get all
    get_appointment_by_Id(appointmentIdVal) {
        this.bookMassageService.get_appoinment_by_Id(appointmentIdVal).subscribe(aptbyIdData => {
            this.appointment = aptbyIdData.ResponseMessage.Appoinment;
            console.log(this.appointment);

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
            // this.serviceAddOnData = this.appointment.service_addons;


            //  this.appointment.appointment_statuses = this.appointment.appointment_statuses;
            //if (this.aptstatusData != undefined)
            // this.aptstatusData.splice(0, this.aptstatusData.length);

            // let appointment_statuses= this.appointmentform.value.aptstatusData;
            // this.aptstatusData.push(appointment_statuses); 

            this.appointment.start_date = HelperService.toDateString(new Date(this.appointment.start_date));
            this.manualItems = this.appointment.manual_enteries;


            if (this.appointment.service_addons.length > 0)
                this.appointment.service_addons = this.appointment.service_addons;
            else {
                // this.appointment.service_addons.push(new service_addons());
            }

            if (this.appointment.service.length > 0)
                this.appointment.service = this.appointment.service;
            else {
                // this.appointment.service.push(new service());
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
        })
    }

    onCustomerChange(id) {
        //debugger
        let cus = this.customersData.filter(customer => customer._id == id);
        this.appointment.customer = cus ? cus[0] : null;

        this.customerid = id;
        this.customerAdress = this.appointment.customer.addresses;
        this.customerContact = this.appointment.customer.contacts;
        this.get_all_available_therapists();
        this.get_all_available_services();
        this.get_all_service_addon();
        this.onContactChangeContactno(this.customerContact["0"] ? this.customerContact["0"] : null);
        this.onAddressChange(this.customerAdress["0"] ? this.customerAdress["0"].street1 : null, this.customerAdress["0"] ? this.customerAdress["0"] : null);
    }

    public onContactChange(customerContact: any[]) {
        //debugger;
        for (let i = 0; i < customerContact.length; i++)
            this.customerContactno = this.customerContact.find(c => c.contact_name == customerContact[i].contact_name);
        //this.customerPhone = this.customerContactno.phone
    }

    public onContactChangeContactno(customerContact) {
        this.customerContactno = this.customerContact.find(c => c.contact_name == customerContact.contact_name);
        this.customerPhone = this.customerContactno.phone;
        //debugger;
        this.customerPhone = [];
        this.customerPhone.push({ 'phone': this.customerContactno.mobileno });
    }
    onChangereload() {

    }
    onAddressChange(street, addr?) {
        //debugger;
        // console.log(address.zipcode);

        if (addr) {
            this.customer_adress = addr;
            return;
        }
        let address = this.customerAdress.filter(address => address.street1 = street);
        if (address) {
            this.customer_adress = address[0];
        }

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

    onServiceAddonChange(serviceAddon: any) {
        this.serviceAddOnVal = serviceAddon;
        this.servicesAddonArr.push(serviceAddon);
        this.addServiceAddOnName = serviceAddon.name;
        this.manualTotal()
    }

    onTherapistChange() {

        // this.therapistList[i] = this.selectedTherapist;

        // if (this.therapistList.length > 0) {
        //     let index = this.therapistList.findIndex(s => s._id == id);
        //     if (index >= 0)
        //         // this.servicesArr.splice(0, this.servicesArr.length);
        //         // this.addServices.splice(dummyService, 1);
        //         this.therapistList[i] = therapist;
        // }
        this.therapistVal = therapist;
        this.therapistArr.push(therapist);
        //this.therapistId = this.therapistArr._id
        this.therapistAddress = this.therapistArr.address;
        this.therapistContact = this.therapistArr.phone;
        // this.addTherapistName = therapist.name;
    }


    onAppointmentChange(status: any) {
        this.appointmentStatus = { name: status.name, icon: status.icon.class_name, color: status.icon.color, font_color: status.fontcolor }

    }

    get_all_available_therapists(): any {
        //debugger;
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
            console.log(therapistsData);
            this.loading = false;
            console.log(this.therapistList);

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
        this.therapistList.push({ _id: null });
    }
    removeTherapist(i) {
        // let index = this.addTherapist.indexOf(value);
        // this.addTherapist.splice(index, 1);
        if (this.therapistList.length > 1) {
            this.therapistList.splice(i, 1);
        }
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
        let index = this.addServiceAddon.indexOf(value);
        this.addServiceAddon.splice(index, 1);

    }

    addMoreManualItem() {
        this.addManualItems.push({ name: '', qty: null, cost: null });
    }

    removeManualItem(value) {
        let index = this.manualItems.indexOf(value);
        this.manualItems.splice(index, 1);

    }
    manualTotal() {
        console.log(this.addServices);
        
        this.total = 0;
        this.addManualItems.map(x => {
            if (x.cost) {
                this.total += parseFloat(x.cost);
            }
        });
        this.addServiceAddon.map(x => {
            if (x.cost) {
                this.total += parseFloat(x.cost);
            }
        });
        this.addServices.map(x => {
            if (x.cost) {

                this.total += parseFloat(x.cost);
            }
        });
        if (this.tip) {
            this.total += this.tip;
        }
    }

    changeAddonQty(i) {
        this.addServiceAddon[i].cost = this.addServiceAddon[i].qty * this.addonCostPerUnit;
        this.manualTotal();
    }

    changeServiceQty(i) {
        this.addServices[i].cost = this.addServices[i].qty * this.serviceCostPerUnit;
        this.manualTotal();
    }

    reset_appointment() {
        //debugger;
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
        let aptDuration = env.environment.aptDuration

        let startdate = moment(this.appointment.start_date).format('YYYY-MM-DD HH:mm:ss');
        let temp = new Date(this.appointment.start_date).getTime() + (aptDuration * 60000);
        let enddate = moment(temp).format('YYYY-MM-DD HH:mm:ss');
        
        let condition = {
            startdate: startdate,
            enddate: enddate
        }

        this.conditionArr = condition;
        if (this.alertNotificationComponent) {
            console.log('hello world');
            
            let CfieldArrayT = this.alertNotificationComponent.CfieldArrayT;
            let CfieldArrayC = this.alertNotificationComponent.CfieldArrayC;
            let RfieldArrayT = this.alertNotificationComponent.RfieldArrayT;
            let RfieldArrayC = this.alertNotificationComponent.RfieldArrayC;
        }

        let data = {
            customer: this.appointment.customer,
            appointment_statuses: this.appointment.appointment_statuses ? this.appointment.appointment_statuses : {
                name: "Active", icon: "fa-check",
                font_color: "2F2F2F", color: "5610AD"
            },
            start_date_Time: condition.startdate,
            end_date_Time: condition.enddate,
            therapist: this.therapistList,
            service: this.addServices,
            service_addons: this.addServiceAddon,
            manual_enteries: this.addManualItems,
            tip: this.appointment.tip ? this.appointment.tip : "0.00",
            total_cost: this.appointment.total_cost,
            grand_total_cost: '',
            work_order_notes: this.appointment.work_order_notes,
            privacy_notes: this.appointment.privacy_notes,
            invoice_notes: this.appointment.invoice_notes,
            summary: this.appointment.summary,
            user: {
                email: this.authService.user.email
            },
            CfieldArrayT: null,
            CfieldArrayC: null,
            RfieldArrayT: null,
            RfieldArrayC: null
        }

        this.notes = "";
        this.bookMassageService.create_appoinment(data).subscribe(data => {
            alert("Ok ne !!!!!!")
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

    detectFiles(event) {
        if (event.target.files) {
            var reader = new FileReader();
            let file = event.target.files.item(0);
            reader.readAsDataURL(file);

            this.image = new Object();
            const that = this;
            reader.onload = function (e) {
                that.image.data = e.target['result'];
            };
            this.image.name = file.name;
            this.image.type = file.type;
        }
    }

    selectImage() {
        if (this.detectFile) {
            this.detectFile.nativeElement.click();
        }
    }

    create_customer() {
        //debugger;
        this.customer.value.emailpreferenceforcommunication = this.emailpreferenceforcommunication;
        this.customer.value.phonepreferenceforcommunication = this.phonepreferenceforcommunication;
        this.customer.value.messagepreferenceforcommunication = this.messagepreferenceforcommunication;

        this.bookMassageService.create_customer(this.image, this.customer.value, this.selectedregion.name, this.Customertype).subscribe(Createdata => {
            this.modalRef.hide();
            this.get_all_customer_from_bookmassage();
            console.log(Createdata);
            this.image = new Object();
        })
    }
    delete_appoinment_by_Id() {
        //debugger;
        this.bookMassageService.delete_appoinment_by_Id().subscribe(result => {
            //debugger;
        })
    }

    setTwoNumberDecimal($event) {
        $event.target.value = parseFloat($event.target.value).toFixed(2);
    }
    customerpop(event) {
        this.isCustomer = true
    }
    closepopup() {
        //debugger;
        this.isCustomer = false
    }
    opentherapist(event) {
        this.isTherapist = true
    }
    closepopuptherapist() {
        this.isTherapist = false
    }

    saveCustomer() {
        console.log('aaa');

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