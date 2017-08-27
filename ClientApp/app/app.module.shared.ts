import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DataTableModule } from "angular2-datatable";
import { SelectModule } from "ng-select";

import { AppComponent } from './components/app/app.component';
import { ExpensesComponent } from './components/expenses/expenses.component';

@NgModule({
    declarations: [
        AppComponent,
        ExpensesComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        DataTableModule,
        SelectModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'expenses', pathMatch: 'full' },
            { path: 'expenses', component: ExpensesComponent },
            { path: '**', redirectTo: 'expenses' }
        ])
    ]
})
export class AppModuleShared {
}
