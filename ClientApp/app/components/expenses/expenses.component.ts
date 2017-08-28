import { Component, Inject, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import {NgForm} from '@angular/forms';
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
    @ViewChild('ngForm') form: NgForm;
    
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

    public expenseId = 0;
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

    save(event: Event, id: string){
        event.preventDefault();

        var month = (this.currentDate.date.month < 10 ? '0' + this.currentDate.date.month : this.currentDate.date.month);
        var day = (this.currentDate.date.day < 10 ? '0' + this.currentDate.date.day : this.currentDate.date.day);

        var expense = {
            id: this.expenseId,
            description: this.description,
            amount: this.amount,
            date: this.currentDate.date.year + '-' + month + '-' + day,
            type: this.type
        } as Expenditure;

        console.log(expense);

        if (expense.id == 0) {
            this.http.post(this.baseUrl + 'api/Expenses', expense).subscribe(
                result => this.reload(), error => console.error(error)
            );    
        } else {
            this.http.put(this.baseUrl + 'api/Expenses/' + expense.id, expense).subscribe(
                result => this.reload(), error => console.error(error)
            );
        }
        this.modalService.close(id);
    }

    private reload(){
        this.clear();
        this.data = [];
        
        this.http.get(this.baseUrl + 'api/Expenses').subscribe(result => {
            this.data = result.json() as Expenditure[];
        }, error => console.error(error));
    }

    private clear(){
        this.expenseId = 0;
        this.description = '';
        this.amount = 0;
        this.currentDate = { date: {year:0, month: 0, day: 0} };
        this.type = '';
    }

    delete(modalId: string, expenseId: number){
        this.http.delete(this.baseUrl + 'api/Expenses/' + expenseId).subscribe(
            result => this.reload(), error => console.error(error)
        );
        this.modalService.close(modalId);
    }

    openEditModal(modalId: string, expense: Expenditure){
        this.expenseId = expense.id;
        this.description = expense.description;
        this.amount = expense.amount;
        let currentDate = expense.date.split('-');
        this.currentDate = { date: {
            year:parseInt(currentDate[0]),
            month: parseInt(currentDate[1]),
            day: parseInt(currentDate[2])
        }};
        this.type = expense.type;
        this.modalService.open(modalId);
    }

    openDeleteModal(modalId: string, expenseId: number){
        this.expenseId = expenseId;
        this.modalService.open(modalId);
    }

    openModal(modalId: string){
        this.modalService.open(modalId);
    }

    closeModal(id: string){
        this.modalService.close(id);
        this.clear();
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
