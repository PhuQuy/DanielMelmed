import { Component, OnInit } from '@angular/core';
import { ConfirmationComponent } from './confirmation.component';

import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { };

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate() ?
      true :
      // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
      // when navigating away from your angular app, the browser will show a generic warning message
      // see http://stackoverflow.com/a/42207299/7307355
      this.openConfirmDialog();
  }

  openConfirmDialog() {
    this.modalRef = this.modalService.show(ConfirmationComponent);
    return this.modalRef.content.onClose.map(result => {
      return result;
    })
  }
}