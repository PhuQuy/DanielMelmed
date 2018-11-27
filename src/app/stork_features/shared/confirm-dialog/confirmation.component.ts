import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompanyInfoComponent } from '../../configuration/company-info/company-info.component';

@Component({
    templateUrl: './confirmation.component.html',
    providers: [CompanyInfoComponent]
})
export class ConfirmationComponent {

    public onClose: Subject<boolean>;

    constructor(private _bsModalRef: BsModalRef) {

    }

    public ngOnInit(): void {
        this.onClose = new Subject();
    }

    public onConfirm(): void {
        //this.companyInfoComponent.update_company_info();
        this.onClose.next(true);
        this._bsModalRef.hide();
    }

    public onCancel(): void {
        this.onClose.next(false);
        this._bsModalRef.hide();
    }
}