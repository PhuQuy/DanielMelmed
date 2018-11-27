export class appointment_notification {
  public sms: Boolean;
  public email: Boolean;
  public appointment_id: string;
  public occurrence: any;
  public type: string;
  public when: String;
  public isactive: Boolean

  constructor(sms: Boolean, email: Boolean, appointment_id: string,
    occurrence: notification_frequency, type: string, when: string, isactive: Boolean) {
    this.sms = sms;
    this.email = email;
    this.appointment_id = appointment_id;
    this.occurrence = occurrence;
    this.type = type;
    this.when = when;
    this.isactive = isactive
  }
}

export class notification_frequency {
  public label: String;
  public value: Number;
  public isactive: Boolean
  public isdeleted: Boolean

  constructor(label: String, value: Number, isactive: Boolean,
    isdeleted: Boolean) {
    this.label = label;
    this.value = value;
    this.isactive = isactive;
    this.isdeleted = isdeleted;
  }
}

