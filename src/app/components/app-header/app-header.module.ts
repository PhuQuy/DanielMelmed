import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppHeaderComponent } from './app-header.component';


@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        CommonModule,
        RouterModule
    ],
    declarations: [AppHeaderComponent],
    exports: [AppHeaderComponent]
})
export class AppHeaderModule { }
