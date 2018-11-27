import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.scss']
})
export class FrequencyComponent implements OnInit {
  modalRef: any;
  @ViewChild('tmpfrequency')
  private tmpfrequency: TemplateRef<any>
  constructor(public modalService: BsModalService) { }

  ngOnInit() {
  }

  show() {
    this.modalRef = this.modalService.show(this.tmpfrequency);
  }

  hide() {
    this.modalRef.hide();
  }

}
