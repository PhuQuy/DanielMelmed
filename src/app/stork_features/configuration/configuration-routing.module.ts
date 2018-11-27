import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddonServicesComponent } from "app/stork_features/configuration/addon-services/addon-services.component";
import { AlertNotificationTemplateComponent } from "app/stork_features/configuration/alert-notification-template/alert-notification-template.component";
import { CompanyInfoComponent } from "app/stork_features/configuration/company-info/company-info.component";
import { ConfigurationComponent } from "app/stork_features/configuration/configuration.component";
import { IconsAppointmentStatusComponent } from "app/stork_features/configuration/icons-appointment-status/icons-appointment-status.component";
import { RegionalServicesComponent } from "app/stork_features/configuration/regional-services/regional-services.component";
import { RegionsSubregionsComponent } from "app/stork_features/configuration/regions-subregions/regions-subregions.component";
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationComponent } from '../shared/confirm-dialog/confirmation.component';
import { PendingChangesGuard } from '../shared/confirm-dialog/pending-changes.guard';
import { AlertNotificationSetupComponent } from './alert-notification-setup/alert-notification-setup.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
   children:[
      {
      path: 'configuration/comapanyinfo',
       component:CompanyInfoComponent,
       canDeactivate: [PendingChangesGuard],
      },
      {
        path: 'configuration/regionalservice',
          component:RegionalServicesComponent
      },
      {
        path: 'configuration/addonservices',
          component:AddonServicesComponent
      },
       {
        path: 'configuration/region-subregion',
          component:RegionsSubregionsComponent
      },
     
      {
        path: 'configuration/icon-appointment',
          component:IconsAppointmentStatusComponent
      },
        {
        path: 'configuration/alert-notification-setup',
          component:AlertNotificationSetupComponent
      },
      {
        path: 'configuration/alert-notification-template',
          component:AlertNotificationTemplateComponent
      },
      
   ]
    
  }
];

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [RouterModule.forChild(routes),ModalModule.forRoot()],
  providers:[PendingChangesGuard],
  exports: [RouterModule],
  entryComponents: [ConfirmationComponent]
})
export class ConfigurationRoutingModule {}
