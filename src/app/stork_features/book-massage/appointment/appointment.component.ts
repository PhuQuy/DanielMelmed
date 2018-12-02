import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BookMassageService } from '../book-massage.service';
import { AppointmentService } from './appointment.service';
import { appointment, manual_enteries } from '../model/appointment.model';
import HelperService from '@app/stork_features/shared/HelperService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '@env/environment';

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
    public tip = 0;
    public addonCostPerUnit = 0;
    public manualItems: manual_enteries[];

    public settings = {
        bigBanner: true,
        timePicker: true,
        format: 'MMM-dd-yyyy hh:mm a',
        defaultOpen: false
    }

    constructor(private bookMassageService: BookMassageService, public modalService: BsModalService) {

    }

    ngOnInit() {
        this.loadInit();
        this.get_all_appointment_status();
        this.get_all_customer_from_bookmassage();
    }

    loadInit() {
        this.appointment.start_date = HelperService.toDateString(new Date());;
    }

    onSearchTypeChange(searchType) {
        this.filter = searchType;
        console.log(this.appointment.appointment_statuses);

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
        this.therapistList.push({ _id: null });
    }

    removeTherapist(i) {
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

    changeServiceQty(i) {
        this.addServices[i].cost = this.addServices[i].qty * this.serviceCostPerUnit;
        this.manualTotal();
    }

    changeAddonQty(i) {
        this.addServiceAddon[i].cost = this.addServiceAddon[i].qty * this.addonCostPerUnit;
        this.manualTotal();
    }

    manualTotal() {

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
        this.therapistList[index] = value;
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
        // this.addServiceAddon[index] = value;
        console.log(this.addServiceAddon[index]);
        
    }
}
