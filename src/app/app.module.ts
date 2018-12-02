import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppHeaderModule } from './components/app-header/app-header.module';
import { ConfigurationModule } from './stork_features/configuration/configuration.module';
import { BookMassageModule } from './stork_features/book-massage/book-massage.module';
import { LoginModule } from './stork_features/login/login.module';
import { PhoneDirectiveModule } from './stork_features/shared/validations/phone.directive.module';
import { PhonePipe } from './stork_features/shared/validations/phone.pipe';
import { FullLayoutComponent } from './stork_layout/full-layout/full-layout.component';
import { AuthGuardService } from './core/guard/auth-guard.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TokenInterceptor } from './core/services/token.interceptor';
import { AuthService } from './stork_features/shared/auth.service';
import { SharedService } from './core/services/shared.service';

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        PhonePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ModalModule.forRoot(),
        HttpClientModule,
        ConfigurationModule,
        BookMassageModule,
        LoginModule,
        PhoneDirectiveModule,
        AppHeaderModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [AuthGuardService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        AuthService,
        SharedService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
