import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BookMassageService } from '../book-massage.service';
import { AppointmentService } from './appointment.service';
import { appointment, manual_enteries, service_addons, service, therapist, Subregion, Region } from '../model/appointment.model';
import HelperService from '@app/stork_features/shared/HelperService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/core/services/shared.service';
import * as moment from 'moment';
import { AuthService } from '@app/stork_features/shared/auth.service';
import { CropperSettings } from 'ng2-img-cropper';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    public appointment: appointment;
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
    public invoiceURL = '';
    public settings = {
        bigBanner: true,
        timePicker: true,
        format: 'MMM-dd-yyyy hh:mm a',
        defaultOpen: false
    }
    warningMsg: String = '';
    action: String = '';
    constructor(private bookMassageService: BookMassageService, public modalService: BsModalService, private activatedRoute: ActivatedRoute, private sharedService: SharedService,
        protected authService: AuthService, private formBuilder: FormBuilder, private router: Router, private ngModalService: NgbModal) {
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
        this.appointment = new appointment();
        this.appointment.start_date = HelperService.toDateString(new Date());
        this.appointment.therapist = [new therapist()];
        this.appointment.service = [new service()];
        this.appointment.service_addons = [new service_addons()];
        this.appointment.manual_enteries = [new manual_enteries()];
        this.initloadNewCustomerModal();
    }

    onSearchTypeChange(searchType) {
        this.filter = searchType;
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

    onCustomerChange(customer) {
        this.appointment.customer = customer;
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
        this.manualTotal();
    }

    changeAddonQty(i) {
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
        let user = {
            email: this.authService.user.email
        }
        this.bookMassageService.create_appoinment({
            ...this.appointment, user, start_date_Time: this.appointment.start_date,
            end_date_Time: this.appointment.end_date
        }).subscribe(data => {
            console.log(data);
        })
    }

    reset_appointment() {
        this.loadInit();
        this.router.navigate(['/book-massage/appointment']);
    }

    cancelAppointment() {
        if (this.appointment['_id']) {
            this.get_appointment_by_Id(this.appointment['_id']);
        } else {
            this.reset_appointment();
        }
    }

    deleteAppointment() {
        this.delete_appoinment_by_Id()
    }

    delete_appoinment_by_Id() {
        this.bookMassageService.delete_appoinment_by_Id(this.appointment['_id']).subscribe(result => {
            console.log(result);
            this.reset_appointment();
        })
    }

    downloadFile(link) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        var that = this;
        xhr.onload = function (event) {
            var blob = new Blob([xhr.response], { type: 'application/pdf' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'invoice';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        xhr.open('GET', link);
        xhr.send();
    }

    // add new customer modal
    public image: any;
    public cropperSettings: CropperSettings;
    public customer;
    public isCustomertype: boolean = false;
    public Customertype: string;
    public selectedregion: any = [];
    public subregions: [Subregion];
    public emailpreferenceforcommunication: boolean = false;
    public phonepreferenceforcommunication: boolean = false;
    public messagepreferenceforcommunication: boolean = false;
    public regions: [Region];

    @ViewChild('detectFile') detectFile: ElementRef;

    initloadNewCustomerModal() {
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
        this.get_all_region();
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

    create_customer() {
        // this.customer.value.emailpreferenceforcommunication = this.emailpreferenceforcommunication;
        // this.customer.value.phonepreferenceforcommunication = this.phonepreferenceforcommunication;
        // this.customer.value.messagepreferenceforcommunication = this.messagepreferenceforcommunication;

        this.bookMassageService.create_customer(this.image, this.customer.value, this.selectedregion.name, this.Customertype).subscribe(Createdata => {
            this.modalRef.hide();
            this.get_all_customer_from_bookmassage();
            console.log(Createdata);
            this.image = new Object();
        })


    }

    selectImage() {
        if (this.detectFile) {
            this.detectFile.nativeElement.click();
        }
    }

    selectcustomer(Select_customer: string) {
        if (Select_customer == "Corporate") {
            this.isCustomertype = true;
            this.Customertype = Select_customer
        }
        else {
            this.isCustomertype = false;
            this.Customertype = Select_customer
        }
    }

    selectedregionRow(selectedregion) {
        this.selectedregion = selectedregion;
        this.get_all_subregion_by_regionId(this.selectedregion._id);
    }

    get_all_subregion_by_regionId(regionId) {
        this.bookMassageService.get_all_subregion_by_regionId(regionId).subscribe(data => {
            this.subregions = data.ResponseMessage.subregions;
        })
    }

    get_all_region() {
        this.bookMassageService.get_all_regions().subscribe(regionData => {
            this.regions = regionData.ResponseMessage.regions.map(region => ({ _id: region._id, name: region.name, selected: false }));
        })
    }

    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    };

    createInvoice() {
        this.bookMassageService.create_invoice(this.appointment['_id']).subscribe(data => {
            let path = data.filename;
            path = environment.serviceuri + path.slice(path.indexOf('\\invoice'), path.length);
            path = this.replaceAll(path, '\\', '/');
            this.downloadFile(path);
        });
    }

    open(content, action) {
        this.action = action
        switch (this.action) {
            case 'delete':
                this.warningMsg = 'Do you want to delete appointment?';
                break;
            case 'reset':
                this.warningMsg = 'Do you want to reset appointment?';
                break;
            case 'cancel':
                this.warningMsg = 'Do you want to cancel appointment?';
                break;
        }
        this.ngModalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' });
    }

    modalAction() {
        switch (this.action) {
            case 'delete':
                this.deleteAppointment();
                break;
            case 'reset':
                this.reset_appointment();
                break;
            case 'cancel':
                this.cancelAppointment();
                break;
        }
    }

    emailInvoice(){
        this.bookMassageService.email_invoice({_id: '5c049900ad4db643e4a6c4f1'}).subscribe(email => {
            console.log(email);
            
        })
    }
}
