import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {IOption} from 'ng-select';
import {IMyDpOptions} from 'mydatepicker';

import { ModalService } from '../modal/modal.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
    public data: Expenditure[];
    
    types: Array<IOption> = [
        {label: 'Leisure', value: 'Leisure'},
        {label: 'Insurance', value: 'Insurance'},
        {label: 'Education', value: 'Education'},
        {label: 'Medical', value: 'Medical'}
    ];
    
    private myDatePickerOptions: IMyDpOptions = {
        editableDateField: false,
        dateFormat: 'yyyy-mm-dd',
        showClearDateBtn: false
    };

    public description: string = '';
    public amount: number = 0;
    private currentDate: DateFormat = { date: {year:0, month: 0, day: 0} };
    public type: string = '';
    
    constructor(
        private modalService: ModalService,
        private http: Http,
        @Inject('BASE_URL') private baseUrl: string
    ){
        http.get(baseUrl + 'api/Expenses').subscribe(result => {
            this.data = result.json() as Expenditure[];
        }, error => console.error(error));
    }

    save(id: string){
        var expense = {
            description: this.description,
            amount: this.amount,
            date: this.currentDate.date.year + '-' + this.currentDate.date.month + '-' + this.currentDate.date.day,
            type: this.type
        } as Expenditure;
        
        this.http.post(this.baseUrl + 'api/Expenses', expense).subscribe(result => {
            this.data = [];
            
            this.description = '';
            this.amount = 0;
            this.currentDate = { date: {year:0, month: 0, day: 0} };
            this.type = '';

            this.http.get(this.baseUrl + 'api/Expenses').subscribe(result => {
                this.data = result.json() as Expenditure[];
            }, error => console.error(error));

        }, error => console.error(error));
        this.modalService.close(id);
    }

    openModal(id: string){
        this.modalService.open(id);
    }

    closeModal(id: string){
        this.modalService.close(id);
    }
}

interface DateFormat {
    date: {
    year: number;
    month: number;
    day: number;
    };
}
interface Expenditure {
    id: number;
    description: string;
    amount: number;
    date: string;
    type: string;
}
