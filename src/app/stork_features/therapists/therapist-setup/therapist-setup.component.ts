import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { TherapistsService } from "app/stork_features/therapists/therapists.service";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { MatTableDataSource, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-therapist-setup',
  templateUrl: './therapist-setup.component.html',
  styleUrls: ['./therapist-setup.component.scss'],
  providers: [TherapistsService],

})
export class TherapistSetupComponent implements OnInit {
  services: any;
  serviceDatasource: MatTableDataSource<{}>;
  serviceData: any = [];
  served_region: any;
  ModalRef: BsModalRef;
  data: {};
  cropperSettings: CropperSettings;
  image: any;
  confirmModalRef: BsModalRef;
  therapistsetupform: FormGroup;
  lastname: any;
  firstname: any;
  therapist: any;
  therapistId: any;
  regions: any = [];
  sub_regions = [];
  subregions = [];
  @ViewChild(MatPaginator) servicespaginator: MatPaginator;
  service_displayedColumns = [ 'name', 'service_location_type', 'duration','ServiceOffered']
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private therapistsService: TherapistsService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService, ) {
    this.therapistsetupform = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      gender: [''],
      servedRegion: [''],
      servedsubRegion: [''],
    });
    if (!this.therapist) {
      this.therapist = {};
      this.therapist.address = { street: "", city: "", state: "", zipcode: "", region: { _id: "", name: "" }, subregion: { _id: "", name: "" } };
    }
    this.cropperSettings = new CropperSettings();
    this.data = {};
  }
  openConfirmModal(icontemplate: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(icontemplate);
  }
  openModal(deleteaddontemplate: TemplateRef<any>) {
    this.ModalRef = this.modalService.show(deleteaddontemplate);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.therapistId = params['id'];
    });
   // this.get_all_region();
   // this.get_all_subregion();
    // this.get_all();
    this.get_therapist_by_Id();

  }
  get_therapist_by_Id() {
    this.therapistsService.get_all_regions().subscribe(regionData => {
      this.regions = regionData.ResponseMessage.regions.map(region => ({ _id: region._id, name: region.name, selected: false }));
      this.therapistsService.get_all_subregion().subscribe(subregiondata => {
        this.sub_regions = subregiondata.ResponseMessage.subregions.map(subregion => ({ _id: subregion._id, name: subregion.name, regionId: subregion.regionId, selected: false }));

        this.therapistsService.get_all_services().subscribe(serviceData => {
          this.serviceData = serviceData.ResponseMessage;
          this.serviceDatasource = new MatTableDataSource(this.serviceData)
          this.serviceDatasource.paginator = this.servicespaginator;

          this.therapistsService.get_therapist_by_Id(this.therapistId).subscribe(therapistData => {
            debugger;
            this.therapist = therapistData.ResponseMessage.therapist[0];
            for (var i = 0; i < this.therapist.served_regions.length; i++) {
              debugger;
              let served_region = this.therapist.served_regions[i]
              let updateregionItem = this.regions.find(r => r._id == served_region._id);
              let index = this.regions.indexOf(updateregionItem);
              updateregionItem.selected = true;
              this.regions[index] = updateregionItem;

              for (var j = 0; j < served_region.sub_region.length; j++) {
                let updatesubregionItem = this.sub_regions.find(r => r._id == served_region.sub_region[j]._id);
                let index = this.sub_regions.indexOf(updatesubregionItem);
                updatesubregionItem.selected = true;
                this.sub_regions[index] = updatesubregionItem;
              }
            }
            for (var i = 0; i < this.therapist.services.length; i++) {
              debugger;
              let services = this.therapist.services[i]
              let updateserviceItem = this.serviceData.find(id => id._id == services._id);
              let index = this.serviceData.indexOf(updateserviceItem);
              updateserviceItem.selected = true;
              this.serviceData[index] = updateserviceItem;
            }
          })
        })
      })
    })
  }
  Imageupload(image) {
    debugger;
    this.image = image;
    this.therapist.imagename = this.image
    this.confirmModalRef.hide();
  }
  update_therapist(therapist) {
    debugger;
    this.confirmModalRef.hide();
    this.therapistsService.update_therapist(therapist).subscribe(updatetherapist => {

      if (updatetherapist.ResponseDetails.ResponseStatus != '10') {

      }
    })
  }
  // get_all_region() {
  //   debugger;
  //   this.therapistsService.get_all_regions().subscribe(regionData => {
  //     // this.regions = regionData.ResponseMessage.regions;
  //     this.regions = regionData.ResponseMessage.regions.map(region => ({ _id: region._id, name: region.name, selected: false }));
  //   })
  // }

  // get_all_subregion() {
  //   this.therapistsService.get_all_subregion().subscribe(subregiondata => {
  //     // this.sub_regions = subregiondata.ResponseMessage.subregions
  //     this.sub_regions = subregiondata.ResponseMessage.subregions.map(subregion => ({ _id: subregion._id, name: subregion.name, regionId: subregion.regionId, selected: false }));
  //   })
  // }
  get_all_subregion_by_regionId(regionId) {
    this.therapistsService.get_all_subregion_by_regionId(regionId).subscribe(data => {
      this.subregions = data.ResponseMessage.subregions;
    })
  }
  delete_therapist_by_Id(id) {
    this.therapistsService.delete_therapist_by_Id(id).subscribe(deleteTherapist => {
      debugger;
      if (deleteTherapist.ResponseMessage != undefined)
        this.ModalRef.hide();
      this.router.navigateByUrl('/therapists');
    })

  }
  checkIfAllSelected(region_subregion, isChecked: boolean) {
    let index;
    if (region_subregion.regionId) {
      let addedRegion = this.therapist.served_regions.find(r => r._id == region_subregion.regionId);
      if (addedRegion != undefined && isChecked)
        addedRegion.sub_region.push({ '_id': region_subregion._id, 'sub_region': region_subregion.name });
      else if (addedRegion != undefined && !isChecked) {
        index = addedRegion.sub_region.findIndex(subregion => subregion._id === region_subregion._id);
        addedRegion.sub_region.splice(index, 1);
      }
      else if (addedRegion == undefined && isChecked)
        this.therapist.served_regions.push({ '_id': region_subregion.regionId, 'region': region_subregion.name, 'sub_region': [{ '_id': region_subregion._id, 'sub_region': region_subregion.name }] })
    }
    else {
      if (isChecked) {
        this.therapist.served_regions.push({ '_id': region_subregion._id, 'region': region_subregion.name, 'sub_region': [] })
      }
      else {
        index = this.served_region.findIndex(region => region._id == region_subregion._id);
        this.therapist.served_regions.splice(index, 1);
        //this.served_region.pop({ '_id': region_subregion._id, 'region': region_subregion.name, 'sub_region': [] })
      }
    }
  }
  // get_all() {

  //   this.therapistsService.get_all_services().subscribe(serviceData => {
  //     this.serviceData = serviceData.ResponseMessage;
  //     this.serviceDatasource = new MatTableDataSource(this.serviceData)
  //   })
  // }
  checkServices(services, isChecked: boolean) {
    if (isChecked)
      this.therapist.services.push(services);
    else {
      let index = this.therapist.services.findIndex(id => id._id == services._id);
      this.therapist.services.splice(index, 1);
      //this.therapist.services.pop(services);
    }
  }
}
