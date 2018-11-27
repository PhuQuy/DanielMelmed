import { Deserializable } from "../../shared/deserializable.model";

export class appointment {

    public customer: customer;
    public appointment_statuses: appointment_statuses;
    public start_date: string;
    public end_date: string;
    public therapist: [therapist];
    public service: [service];
    public service_addons: [service_addons];
    public manual_enteries: [manual_enteries];
    public tip: String;
    public total_cost: String;
    public grand_total_cost: String;
    public notes: String;
    public work_order_notes: String;
    public privacy_notes: String;
    public invoice_notes: String;
    public summary: String;
    public appointmentId: String;
    public isactive: Boolean;
    public isMigrated: Boolean;
    public isdeleted: Boolean;
    public created_by: user;
    public created_at: String;
    public modified_by: user;
    public modified_at: String;
    
    // constructor(customer: customer,
    //     appointment_statuses: appointment_statuses,
    //     end_date: String,
    //     therapist: [therapist],
    //     service: [service],
    //     service_addons: [service_addons],
    //     manual_enteries: [manual_enteries],
    //     tip: String,
    //     total_cost: String,
    //     grand_total_cost: String,
    //     notes: String,
    //     work_order_notes: String,
    //     privacy_notes: String,
    //     invoice_notes: String,
    //     summary: String,
    //     appointmentId: String,
    //     isactive: Boolean,
    //     isMigrated: Boolean,
    //     isdeleted: Boolean,
    //     created_by: user,
    //     created_at: String,
    //     modified_by: user,
    //     modified_at: String
    // ) {
    //     this.appointment_statuses = appointment_statuses,
    //         this.end_date = end_date,
    //         this.therapist = therapist,
    //         this.service = service,
    //         this.service_addons = service_addons,
    //         this.manual_enteries = manual_enteries,
    //         this.tip = tip,
    //         this.total_cost = total_cost,
    //         this.grand_total_cost = grand_total_cost,
    //         this.notes = notes,
    //         this.work_order_notes = work_order_notes,
    //         this.privacy_notes = privacy_notes,
    //         this.invoice_notes = invoice_notes,
    //         this.summary = summary,
    //         this.appointmentId = appointmentId,
    //         this.isactive = isactive,
    //         this.isMigrated = isMigrated,
    //         this.isdeleted = isdeleted,
    //         this.created_by = created_by,
    //         this.created_at = created_at,
    //         this.modified_by = modified_by,
    //         this.modified_at = modified_at
    // }
}

export class customer {
    _id: String;
    firstname: String;
    lastname: String;
    imagename: String;
    gender: String;
    email: String;
    emailpreferenceforcommunication: Boolean;
    phonepreferenceforcommunication: Boolean;
    messagepreferenceforcommunication: Boolean;
    rating: Number;
    customer_notes: String;
    admin_notes: String;
    details: String;
    addresses: customer_address;
    contacts: [contact];
    payment_mode: String;

    constructor(_id: String,
        firstname: String,
        lastname: String,
        imagename: String,
        gender: String,
        email: String,
        emailpreferenceforcommunication: Boolean,
        phonepreferenceforcommunication: Boolean,
        messagepreferenceforcommunication: Boolean,
        rating: Number,
        customer_notes: String,
        admin_notes: String,
        details: String,
        addresses: customer_address,
        contacts: [contact],
        payment_mode: String) {

        this._id = _id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.imagename = imagename;
        this.gender = gender;
        this.email = email;
        this.emailpreferenceforcommunication = emailpreferenceforcommunication;
        this.phonepreferenceforcommunication = phonepreferenceforcommunication;
        this.messagepreferenceforcommunication = messagepreferenceforcommunication;
        this.rating = rating;
        this.customer_notes = customer_notes;
        this.admin_notes = admin_notes;
        this.details = details;
        this.addresses = addresses;
        this.contacts = contacts;
        this.payment_mode = payment_mode;
    }
}

export class customer_address {
    region: Region;
    subregion: Subregion;
    address_name: String;
    address_type: String;
    street1: String;
    street2: String;
    city: String;
    state: String;
    country: String;
    zipcode: String;
    address_note: String;
    constructor(
        region: Region,
        subregion: Subregion,
        address_name: String,
        address_type: String,
        street1: String,
        street2: String,
        city: String,
        state: String,
        country: String,
        zipcode: String,
        address_note: String
    ) {
        this.region = region;
        this.subregion = subregion;
        this.subregion = subregion;
        this.address_name = address_name;
        this.address_type = address_type;
        this.street1 = street1;
        this.street2 = street2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipcode = zipcode;
        this.address_note = address_note;
    }
}

export class Region {
    _id: String;
    region: String;
    name: string
    constructor(
        _id: String,
        name: String,
    ) {
        this._id = _id;
        this.region = name;
    }
}

export class Subregion {

    _id: String;
    sub_region: String;
    name: string
    constructor(
        _id: String,
        name: String,
    ) {
        this._id = _id;
        this.sub_region = name;
    }
}

export class contact {
    contact_name: String;
    phone: [phone];
    email: String;
    contact_note: String;
    //
    constructor(
        contact_name: String,
        phone: [phone],
        email: String,
        contact_note: String
    ) {
        this.contact_name = contact_name;
        this.phone = phone;
        this.email = email;
        this.contact_note = contact_note;
    }//
}

export class phone {
    default: Boolean;
    phone: String;
    //
    constructor(
        default1: Boolean,
        phone: String

    ) {
        this.default = default1;
        this.phone = phone;
    }//
}


export class appointment_statuses implements Deserializable {
    _id: String;
    name: String;
    icon: String;
    color: String;
    font_color: String;

    constructor(
        _id: String,
        name: String,
        icon: String,
        color: String,
        font_color: String

    ) {
        this._id = _id;
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.font_color = font_color;
    }
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}

// export class icon {
//     class_name: String;
//     color: String;
// }


export class therapist {
    _id: String;
    name: string;
    firstname: String;
    lastname: String;
    gender: String;
    phone: [phone];
    email: String;
    address: therapist_address;
    appoinment_preference: appoinment_preference;
    notification_enabled: Boolean;
    therapist_notes: String;

    constructor(
        _id: String,
        name: string,
        firstname: String,
        lastname: String,
        gender: String,
        phone: [phone],
        email: String,
        address: therapist_address,
        appoinment_preference: appoinment_preference,
        notification_enabled: Boolean,
        therapist_notes: String
    ) {
        this._id = _id;
        this.name = firstname +''+ lastname;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.appoinment_preference = appoinment_preference;
        this.notification_enabled = notification_enabled;
        this.therapist_notes = therapist_notes;
    }
}

export class therapist_address {
    region: Region;
    subregion: Subregion;
    street: String;
    city: String;
    state: String;
    country: String;
    zipcode: String;

    constructor(
        region: Region,
        subregion: Subregion,
        street: String,
        city: String,
        state: String,
        country: String,
        zipcode: String
    ) {
        this.region = region;
        this.subregion = subregion;
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipcode = zipcode;
    }
}

export class appoinment_preference {
    appointment_pre_buffer: Number;
    appointment_post_buffer: Number;
    constructor(
        appointment_pre_buffer: Number,
        appointment_post_buffer: Number
    ) {
        this.appointment_pre_buffer = appointment_pre_buffer;
        this.appointment_post_buffer = appointment_post_buffer
    }
}
//
export class service {
    _id: String;
    name: String;
    image: String;
    cost: String;
    qty: Number;
    service_subtotal: String;
    currency: String;
    duration: Number;
    notes: String;
    constructor(
        _id: String,
        name: String,
        image: String,
        cost: String,
        qty: Number,
        service_subtotal: String,
        currency: String,
        duration: Number,
        notes: String
    ) {
        this._id = _id;
        this.image = image;
        this.name = name;
        this.cost = cost;
        this.qty = qty;
        this.service_subtotal = service_subtotal;
        this.currency = currency;
        this.duration = duration;
        this.notes = notes;
    }
}

export class service_addons {
    _id: String;
    name: String;
    duration: String;
    cost: String;
    qty: Number;
    service_addons_subtotal: String;
    notes: String;
    constructor(
        _id: String,
        name: String,
        cost: String,
        qty: Number,
        duration: String,
        service_addons_subtotal: String,
        notes: String
    ) {
        this._id = _id;
        this.name = name;
        this.cost = cost;
        this.qty = qty;
        this.duration = duration;
        this.service_addons_subtotal = service_addons_subtotal;
        this.notes = notes;
    }
}

export class manual_enteries {
    name: String;
    qty: Number;
    cost: String;
    manual_enteries_subtotal: String;
    // constructor(
    //     name: String,
    //     qty: Number,
    //     cost: String,
    //     manual_enteries_subtotal: String
    // ) {
    //     this.name = name;
    //     this.cost = cost;
    //     this.qty = qty;
    //     this.manual_enteries_subtotal = manual_enteries_subtotal;
    // }
}

export class role {
    _id: String;
    name: String
    // constructor(
    //     _id: String,
    //     name: String,
    // ) {
    //     this._id = _id;
    //     this.name = name;
    // }
}

export class user {
    _id: String;
    firstname: String;
    lastname: String;
    role: role;
    email: String;

    // constructor(
    //     _id: String,
    //     firstname: String,
    //     lastname: String,
    //     role: role,
    //     email: String,
    // ) {
    //     this._id = _id;
    //     this.firstname = firstname;
    //     this.lastname = lastname;
    //     this.role = role;
    //     this.email = email;
    // }
}