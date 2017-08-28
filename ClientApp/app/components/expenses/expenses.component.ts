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

    constructor(private modalService: ModalService, http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Expenses').subscribe(result => {
            this.data = result.json() as Expenditure[];
        }, error => console.error(error));
    }

    openModal(id: string){
        this.modalService.open(id);
    }

    closeModal(id: string){
        this.modalService.close(id);
    }
}

interface Expenditure {
    id: number;
    description: string;
    amount: number;
    date: string;
    type: string;
}
