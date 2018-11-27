import { Component, OnInit, TemplateRef,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { TherapistsService } from "app/stork_features/therapists/therapists.service";
import { TherapistProfileValidationService } from "app/stork_features/therapists/therapist-profile/therapist-profilevalidation.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PhonePipe } from '../../shared/validations/phone.pipe';
import { diff } from 'deep-diff';
import *  as env from 'environments/environment';

@Component({
  selector: 'app-therapist-profile',
  templateUrl: './therapist-profile.component.html',
  styleUrls: ['./therapist-profile.component.scss'],
  providers: [TherapistsService, PhonePipe],
  encapsulation: ViewEncapsulation.None
})
export class TherapistProfileComponent implements OnInit {
  isError: boolean = false;
  selectedregion: any;
  therapistform: FormGroup;
  lastname: any;
  firstname: any;
  therapistId: any
  therapist: any;
  regions: any = [];
  subregions = [];
  errormsg: any;
  disable: boolean;
  confirmModalRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private therapistsService: TherapistsService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private phonePipe: PhonePipe
  ) {

    this.therapistform = this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: '',
      country: [''],
      addressnotes: [''],
      email: ['', Validators.compose([Validators.required, TherapistProfileValidationService.emailValidator])],
      phnnumber: '',
      secondarynumber: '',
      region: '',
      subregion: '',
      admin_notes: '',
      therapist_notes: '',
    });

    if (!this.therapist) {
      this.therapist = {};
      this.therapist.address = { street: "", city: "", state: "", zipcode: "", region: { _id: "", name: "" }, subregion: { _id: "", name: "" } };
    }

  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.route.params.subscribe(params => {
      debugger;
      this.therapistId = params['id'];
      this.get_therapist_by_Id();


      // this.therapistform.valueChanges.subscribe(
      //   changeddata => {
      //     debugger;
      //     if (this.therapist != undefined) {
      //       debugger;
      //       let differregion = undefined;
      //       if (this.therapist.address.region != undefined && changeddata.region != "") {
      //         let region = diff(this.therapist.address.region.name, changeddata.region.name);
      //         if (region != undefined && region.length > 0) {
      //           differregion = region.find(x => x.kind == 'E' && x.lhs != x.rhs);
      //         }
      //       }

      //       let differsubregion = undefined;
      //       if (this.therapist.address.subregion != undefined && changeddata.subregion != "") {
      //         let subregion = diff(this.therapist.address.subregion.name, changeddata.subregion.name);
      //         if (subregion != undefined && subregion.length > 0) {
      //           differsubregion = subregion.find(x => x.kind == 'E' && x.lhs != x.rhs);
      //         }
      //       }
      //       if (differregion != undefined || differsubregion != undefined)
      //         this.disable = false;
      //       else
      //         this.disable = true;
      //     }
      //   });
    });
  }

  openConfirmModal(icontemplate: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(icontemplate);
  }
  get_therapist_by_Id() {
    debugger;
    this.therapistsService.get_therapist_by_Id(this.therapistId).subscribe(therapistData => {
      debugger;
      this.get_all_region();
      this.therapist = therapistData.ResponseMessage.therapist[0];
      this.therapist.primaryphone = this.therapist.phone.find(p => p.default == true).phone;
      let secondaryphone = this.therapist.phone.find(p => p.default == false);
      if (secondaryphone != undefined)
        this.therapist.secondaryphone = secondaryphone.phone;
      this.therapist.address.region = this.therapist.address.region;
      this.get_all_subregion_by_regionId(this.therapist.address.region._id);
    })
  }

  get_all_region() {
    this.therapistsService.get_all_regions().subscribe(regionData => {
      this.regions = regionData.ResponseMessage.regions.map(region => ({ _id: region._id, name: region.name }));
    })
  }

  get_all_subregion_by_regionId(regionId) {
    this.therapistsService.get_all_subregion_by_regionId(regionId).subscribe(data => {
      this.subregions = data.ResponseMessage.subregions;
      this.therapist.address.subregion = this.subregions[0];
    })
  }

  selectedregionRow(selectedregion) {
    debugger;
    this.get_all_subregion_by_regionId(selectedregion._id);
  }

  update_therapist(therapist) {
    debugger;
    this.therapist.phone = [{ phone: this.therapist.primaryphone, default: true }, { phone: this.therapist.secondaryphone, default: false }];
    this.confirmModalRef.hide();
    this.therapistsService.update_therapist(therapist).subscribe(updatetherapist => {

      if (updatetherapist.ResponseDetails.ResponseStatus != '10') {

      }
    })
  }

  private changeModel1(ev) {
    this.therapist.primaryphone = ev;
  }

  private changeModel2(ev) {
    this.therapist.secondaryphone = ev;
  }
}
