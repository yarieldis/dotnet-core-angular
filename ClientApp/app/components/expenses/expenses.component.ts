import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'expenses',
    templateUrl: './expenses.component.html'
})
export class ExpensesComponent {
    public expenses: Expenditure[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Expenses').subscribe(result => {
            this.expenses = result.json() as Expenditure[];
        }, error => console.error(error));
    }
}

interface Expenditure {
    description: string;
    amount: number;
    date: string;
    type: string;
}
