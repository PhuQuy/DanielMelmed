import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from "app/stork_features/configuration/configuration.component";
import { ConfigurationRoutingModule } from "app/stork_features/configuration/configuration-routing.module";
import { ConfigurationSidebarComponent } from './configuration-sidebar/configuration-sidebar.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { RegionalServicesComponent } from './regional-services/regional-services.component';
import { RegionalServicesModule } from "app/stork_features/configuration/regional-services/regional-services.module";
import { CompanyInfoModule } from "app/stork_features/configuration/company-info/company-info.module";
import { CompanyInfoRoutingModule } from "app/stork_features/configuration/company-info/company-info-routing.module";
import { RegionalServicesRoutingModule } from "app/stork_features/configuration/regional-services/regional-services-routing.module";
import { ConfigurationHeaderComponent } from './configuration-header/configuration-header.component';
import { AddonServicesModule } from "app/stork_features/configuration/addon-services/addon-services.module";
import { RegionsSubregionsModule } from "app/stork_features/configuration/regions-subregions/regions-subregions.module";
import { IconsAppointmentStatusModule } from "app/stork_features/configuration/icons-appointment-status/icons-appointment-status.module";
import { AlertNotificationSetupModule } from "app/stork_features/configuration/alert-notification-setup/alert-notification-setup.module";
import { AlertNotificationTemplateComponent } from './alert-notification-template/alert-notification-template.component';
import { AlertNotificationTemplateModule } from "app/stork_features/configuration/alert-notification-template/alert-notification-template.module";
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CommonModule,
    ConfigurationRoutingModule,
    RegionalServicesModule,
    CompanyInfoModule,
    AddonServicesModule,
    RegionsSubregionsModule,
    IconsAppointmentStatusModule,
    AlertNotificationSetupModule,
    AlertNotificationTemplateModule,
    FormsModule,
    
  ],
  declarations: [
    ConfigurationComponent,
    ConfigurationSidebarComponent,
    ConfigurationHeaderComponent,
    

  ]
})
export class ConfigurationModule { }
