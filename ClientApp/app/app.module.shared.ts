import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";
import { SelectModule } from "ng-select";
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './components/app/app.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ModalComponent } from './components/modal/modal.component';

import { ModalService } from './components/modal/modal.service';

import { TypeAmountValidatorDirective } from './directives/type.amount.directive';

@NgModule({
    declarations: [
        AppComponent,
        ModalComponent,
        ExpensesComponent,
        TypeAmountValidatorDirective
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        DataTableModule,
        SelectModule,
        MyDatePickerModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'expenses', pathMatch: 'full' },
            { path: 'expenses', component: ExpensesComponent },
            { path: '**', redirectTo: 'expenses' }
        ])
    ],
    providers: [ ModalService ]
})
export class AppModuleShared {
}
