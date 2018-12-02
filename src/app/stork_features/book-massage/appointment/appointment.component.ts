import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BookMassageService } from '../book-massage.service';
import { AppointmentService } from './appointment.service';
import { appointment, manual_enteries, service_addons, service, therapist } from '../model/appointment.model';
import HelperService from '@app/stork_features/shared/HelperService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '@env/environment';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/core/services/shared.service';
import * as moment from 'moment';
import { AuthService } from '@app/stork_features/shared/auth.service';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss'],
    providers: [AppointmentService, BookMassageService],
    encapsulation: ViewEncapsulation.None,
})
export class AppointmentComponent implements OnInit {
    public searchTypes = [{
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
    }];
    public appointment: appointment = new appointment();
    public filter;
    public aptstatusData;
    public modalRef: BsModalRef;
    public therapistTooltips: any;
    public tooltip: any;
    public customersData: any;
    public loading = false;
    public conditionArr: any;
    public therapistsData: any;
    public therapist: any;
    public serviceAddOnData: any;
    public servicesData: any;
    public therapistList: [any] = [{ _id: null }];
    public addServices: [any] = [{ service: '' }];
    public customerAdress: any;
    public customerContact: any;
    public serviceCostPerUnit = 0;
    public total: any = 0.00;
    public addManualItems: [any] = [{ name: '', qty: null, cost: null }];
    public addServiceAddon: [any] = [{ serviceAddOn: '', qty: null, cost: null }];
    public tip = null;
    public addonCostPerUnit = 0;
    public manualItems: manual_enteries[];
    public addTherapist: therapist[];

    public settings = {
        bigBanner: true,
        timePicker: true,
        format: 'MMM-dd-yyyy hh:mm a',
        defaultOpen: false
    }

    constructor(private bookMassageService: BookMassageService, public modalService: BsModalService, private activatedRoute: ActivatedRoute, private sharedService: SharedService,
        protected authService: AuthService) {
        this.activatedRoute.params.subscribe((params) => {
            let appointmentId = params['appointmentId'];
            console.log(appointmentId);
            this.sharedService.appointment.subscribe(appointment => {
                console.log(appointment);
            })
            if (appointmentId != undefined) {
                this.get_appointment_by_Id(appointmentId);
            } else {
                this.loadInit();
            }
        });
    }

    ngOnInit() {
        this.get_all_appointment_status();
        this.get_all_customer_from_bookmassage();
    }

    loadInit() {
        this.appointment.start_date = HelperService.toDateString(new Date());
        this.appointment.therapist = [new therapist()];
        this.appointment.service = [new service()];
        this.appointment.service_addons = [new service_addons()];
        this.appointment.manual_enteries = [new manual_enteries()];
    }

    onSearchTypeChange(searchType) {
        this.filter = searchType;
        console.log(this.appointment.appointment_statuses);

    }

    get_appointment_by_Id(appointmentIdVal) {
        this.bookMassageService.get_appoinment_by_Id(appointmentIdVal).subscribe(aptbyIdData => {
            this.appointment = aptbyIdData.ResponseMessage.Appoinment;
            console.log(this.appointment);

            // this.appointment.customer = this.appointment.customer;
            // if (this.customersData != undefined)
            //     this.customersData.splice(0, this.customersData.length);
            // this.customersData.push(this.appointment.customer);

            //let therapistadd = this.appointment.therapist;
            //this.addTherapist.splice(0, this.addTherapist.length);
            // this.therapistsData = this.addTherapist = this.appointment.therapist;

            // this.appointment.service = this.appointment.service;
            // this.servicesData.slice(0, this.servicesData.length);
            // this.servicesData = this.appointment.service;

            // this.appointment.service_addons = this.appointment.service_addons;
            // this.serviceAddOnData = this.appointment.service_addons;


            //  this.appointment.appointment_statuses = this.appointment.appointment_statuses;
            //if (this.aptstatusData != undefined)
            // this.aptstatusData.splice(0, this.aptstatusData.length);

            // let appointment_statuses= this.appointmentform.value.aptstatusData;
            // this.aptstatusData.push(appointment_statuses); 

            this.appointment.start_date = HelperService.toDateString(new Date(this.appointment.start_date));
            this.manualItems = this.appointment.manual_enteries;


            if (this.appointment.service_addons.length > 0) { }
            // this.appointment.service_addons = this.appointment.service_addons;
            else {
                this.appointment.service_addons.push(new service_addons());
            }

            if (this.appointment.service.length > 0) { }
            // this.appointment.service = this.appointment.service;
            else {
                this.appointment.service.push(new service());
            }

            this.get_all_available_therapists();
            this.get_all_available_services();
            this.get_all_service_addon();
            this.manualTotal();
        })
    }

    get_all_appointment_status() {
        this.bookMassageService.get_all_appointment_status().subscribe(aptstatusData => {
            this.aptstatusData = aptstatusData;
        })
    }

    get_all_customer_from_bookmassage(): any {
        this.bookMassageService.get_all_customer_from_bookmassage().subscribe(customersData => {
            this.customersData = customersData.map(data => {
                data['name'] = `${data.firstname} ${data.lastname}`;
                return data;
            });
        })
    }

    get_all_available_therapists(): any {
        let startdate = null, enddate = null;
        startdate = HelperService.toStringDate(this.appointment.start_date);
        let aptDuration = environment.aptDuration
        let condition = {
            startdate: startdate,
            enddate: new Date(startdate.getTime() + (aptDuration * 60000)),
            servedregion: [{ "regionId": this.appointment.customer.addresses["0"].region._id, "subregionId": this.appointment.customer.addresses["0"].subregion._id }]
        }
        this.conditionArr = condition;
        this.loading = true;
        this.bookMassageService.get_all_available_therapists(condition).subscribe(therapistsData => {
            this.therapistsData = therapistsData;
            this.loading = false;

        })
    }

    get_all_therapist() {
        this.bookMassageService.get_all_therapist().subscribe(therapistData => {
            this.therapist = therapistData;
        })
    }

    get_all_service_addon() {
        this.bookMassageService.get_all_service_addon().subscribe(serviceAddOnData => {
            this.serviceAddOnData = serviceAddOnData;
        })
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    onCustomerChange() {
        console.log(this.appointment.customer);

        if (this.appointment.customer.addresses) {
            this.customerAdress = this.appointment.customer.addresses[0];
        }

        if (this.appointment.customer.contacts) {
            this.customerContact = this.appointment.customer.contacts[0];
        }

        this.get_all_available_therapists();
        this.get_all_available_services();
        this.get_all_service_addon();
    }

    get_all_available_services(): any {
        let condition = {
            regionId: this.appointment.customer.addresses["0"].region._id,
            subregionId: this.appointment.customer.addresses["0"].subregion._id

        }
        this.bookMassageService.get_all_available_services(condition).subscribe(servicesData => {
            this.servicesData = servicesData;
        })
    }

    addMoretherapist() {
        this.appointment.therapist.push(new therapist());
    }

    removeTherapist(i) {
        if (this.appointment.therapist.length > 1) {
            this.appointment.therapist.splice(i, 1);
        }
        this.manualTotal();

    }

    addMoreServices() {
        this.appointment.service.push(new service());
    }

    removeService(index) {
        this.appointment.service.splice(index, 1);
    }

    addMoreServicesAddon() {
        this.appointment.service_addons.push(new service_addons());
    }

    removeServiceAddon(index) {
        this.appointment.service_addons.splice(index, 1);
        this.manualTotal();
    }

    addMoreManualItem() {
        this.addManualItems.push({ name: '', qty: null, cost: null });
    }

    removeManualItem(value) {
        let index = this.manualItems.indexOf(value);
        this.manualItems.splice(index, 1);
        this.manualTotal();
    }

    changeServiceQty(index) {
        // this.appointment.service[index].cost = this.appointment.service[index].qty * this.serviceCostPerUnit + '';
        this.manualTotal();
    }

    changeAddonQty(i) {
        // this.addServiceAddon[i].cost = this.addServiceAddon[i].qty * this.addonCostPerUnit;
        this.manualTotal();
    }

    manualTotal() {

        this.total = 0;
        this.appointment.manual_enteries.map(x => {
            if (x.cost) {
                this.total += parseFloat(x.cost);
            }
        });
        this.appointment.service_addons.map(x => {
            if (x.cost) {
                this.total += parseFloat(x.cost) * x.qty;
            }
        });
        this.appointment.service.map(x => {
            if (x.cost) {

                this.total += parseFloat(x.cost) * x.qty;
            }
        });
        if (this.tip) {
            this.total += this.tip;
        }
    }


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

    toggleTherapistsToolstip(tooltip?, greeting?, phone?) {
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

    onSelectTherapist(value, index) {
        this.appointment.therapist[index] = value;
    }

    onSelectAddress(index) {
        if (this.appointment.customer) {
            this.customerAdress = this.appointment.customer.addresses[index];
        }
    }

    onContactChangeContactno(index) {
        if (this.appointment.customer) {
            this.customerContact = this.appointment.customer.contacts[index];
        }
    }

    onServiceAddonChange(index, value) {
        this.appointment.service_addons[index] = value;
    }

    create_appoinment() {
        let aptDuration = environment.aptDuration

        this.appointment.start_date = moment(this.appointment.start_date).format('YYYY-MM-DD HH:mm:ss');
        let temp = new Date(this.appointment.start_date).getTime() + (aptDuration * 60000);
        this.appointment.end_date = moment(temp).format('YYYY-MM-DD HH:mm:ss');
        // this.appointment.user = 

        // this.conditionArr = condition;

        // let data = {
        //     customer: this.appointment.customer,
        //     appointment_statuses: this.appointment.appointment_statuses ? this.appointment.appointment_statuses : {
        //         name: "Active", icon: "fa-check",
        //         font_color: "2F2F2F", color: "5610AD"
        //     },
        //     start_date_Time: condition.startdate,
        //     end_date_Time: condition.enddate,
        //     therapist: this.therapistList,
        //     service: this.addServices,
        //     service_addons: this.addServiceAddon,
        //     manual_enteries: this.addManualItems,
        //     tip: this.appointment.tip ? this.appointment.tip : "0.00",
        //     total_cost: this.appointment.total_cost,
        //     grand_total_cost: '',
        //     work_order_notes: this.appointment.work_order_notes,
        //     privacy_notes: this.appointment.privacy_notes,
        //     invoice_notes: this.appointment.invoice_notes,
        //     summary: this.appointment.summary,
        //     user: {
        //         email: this.authService.user.email
        //     },
        //     CfieldArrayT: null,
        //     CfieldArrayC: null,
        //     RfieldArrayT: null,
        //     RfieldArrayC: null
        // }

        // this.notes = "";
        let user = {
            email: this.authService.user.email
        }
        this.bookMassageService.create_appoinment({ ...this.appointment, user }).subscribe(data => {
            alert("Ok ne !!!!!!")
        })
    }
}
