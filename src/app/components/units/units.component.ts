import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components/toast/toast.component';
import { UnitsService } from '@app/services';
import { Unit } from '@app/models/unit';

@Component({
    selector: 'app-units',
    templateUrl: './units.component.html'
})
export class UnitsComponent implements OnInit {

    items: Unit[] = [];
    isLoading = true;

    item = {};
    isEditing = false;

    public addForm: FormGroup;
    name = new FormControl('', Validators.required);

    constructor(private dataService: UnitsService,
        public toast: ToastComponent,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: this.name
        });

        this.getItems();
    }
    getItems() {
        this.dataService._get().subscribe(
            data => this.items = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addItem() {
        this.dataService._add(this.addForm.value).subscribe(
            res => {
                this.items.push(res);
                this.addForm.reset();
                this.toast.setMessage('item added successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    enableEditing(item) {
        this.isEditing = true;
        this.item = item;
    }

    cancelEditing() {
        this.isEditing = false;
        this.item = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        this.getItems();
    }

    editItem(item) {
        this.dataService._edit(item).subscribe(
            res => {
                this.isEditing = false;
                this.item = item;
                this.toast.setMessage('item edited successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    deleteItem(item) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.dataService._delete(item).subscribe(
                res => {
                    const pos = this.items.map(elem => { return elem._id; }).indexOf(item._id);
                    this.items.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }

}
