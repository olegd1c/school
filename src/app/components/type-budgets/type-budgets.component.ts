import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components/toast/toast.component';
import { TypeBudgetsService } from '@app/services';
import { TypeBudget } from '@app/models/type-budget';

@Component({
    selector: 'app-type-budgets',
    templateUrl: './type-budgets.component.html'
})
export class TypeBudgetsComponent implements OnInit {

    typeBudgets: TypeBudget[] = [];
    isLoading = true;

    typeBudget = {};
    isEditing = false;

    public addTypeBudgetForm: FormGroup;
    name = new FormControl('', Validators.required);
    account = new FormControl('', Validators.required);

    constructor(private dataService: TypeBudgetsService,
        public toast: ToastComponent,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.addTypeBudgetForm = this.formBuilder.group({
            name: this.name,
            account: this.account,
        });

        this.getTypeBudgets();
    }
    getTypeBudgets() {
        this.dataService._get().subscribe(
            data => this.typeBudgets = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addTypeBudget() {
        this.dataService._add(this.addTypeBudgetForm.value).subscribe(
            res => {
                const newTypeBudgets = res;
                this.typeBudgets.push(newTypeBudgets);
                this.addTypeBudgetForm.reset();
                this.toast.setMessage('item added successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    enableEditing(typeBudget) {
        this.isEditing = true;
        this.typeBudget = typeBudget;
    }

    cancelEditing() {
        this.isEditing = false;
        this.typeBudget = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        this.getTypeBudgets();
    }

    editTypeBudget(typeBudget) {
        this.dataService._edit(typeBudget).subscribe(
            res => {
                this.isEditing = false;
                this.typeBudget = typeBudget;
                this.toast.setMessage('item edited successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    deleteTypeBudget(typeBudget) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.dataService._delete(typeBudget).subscribe(
                res => {
                    const pos = this.typeBudgets.map(elem => { return elem._id; }).indexOf(typeBudget._id);
                    this.typeBudgets.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }

}
