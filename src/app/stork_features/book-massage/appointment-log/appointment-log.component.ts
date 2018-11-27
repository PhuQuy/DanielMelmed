import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-appointment-log',
  templateUrl: './appointment-log.component.html',
  styleUrls: ['./appointment-log.component.scss']
})
export class AppointmentLogComponent implements OnInit {
  modalRef: any;
  @ViewChild('tmpappointmentlog')
  private tmpappointmentlog: TemplateRef<any>

  constructor(
    public modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  show() {
    this.modalRef = this.modalService.show(this.tmpappointmentlog);
  }

  hide() {
    this.modalRef.hide();
  }

}
