import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {IOption} from 'ng-select';
import {IMyDpOptions} from 'mydatepicker';

@Component({
    selector: 'expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
    public data: Expenditure[];

    public value:string = '';

    types: Array<IOption> = [
        {label: 'Belgium', value: 'BE'},
        {label: 'Luxembourg', value: 'LU'},
        {label: 'Netherlands', value: 'NL'}
    ];
    
    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    // Initialized to specific date (09.10.2018).
    private model: Object = { date: { year: 2018, month: 10, day: 9 } };


    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Expenses').subscribe(result => {
            this.data = result.json() as Expenditure[];
        }, error => console.error(error));
    }
}

interface Expenditure {
    description: string;
    amount: number;
    date: string;
    type: string;
}
