import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components/toast/toast.component';
import { TypesChargesService } from '@app/services';
import { TypeCharge } from '@app/models/type-charge';

@Component({
  selector: 'app-types-charges',
  templateUrl: './types-charges.component.html',
  styleUrls: ['./types-charges.component.css']
})
export class TypesChargesComponent implements OnInit {

    typesCharges: TypeCharge[] = [];
    isLoading = true;

    typeCharge = {};
    isEditing = false;

    public addTypeChargeForm: FormGroup;
    name = new FormControl('', Validators.required);

    constructor(private dataService: TypesChargesService,
        public toast: ToastComponent,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.addTypeChargeForm = this.formBuilder.group({
            name: this.name
        });        
        
        this.getTypesCharges();
    }
    getTypesCharges() {
        this.dataService._get().subscribe(
            data => this.typesCharges = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addTypeCharge() {
        this.dataService._add(this.addTypeChargeForm.value).subscribe(
            res => {
                const newTypeCharge = res.json();
                this.typesCharges.push(newTypeCharge);
                this.addTypeChargeForm.reset();
                this.toast.setMessage('item added successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    enableEditing(typeCharge) {
        this.isEditing = true;
        this.typeCharge = typeCharge;
    }

    cancelEditing() {
        this.isEditing = false;
        this.typeCharge = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        this.getTypesCharges();
    }

    editTypeCharge(typeCharge) {
        this.dataService._edit(typeCharge).subscribe(
            res => {
                this.isEditing = false;
                this.typeCharge = typeCharge;
                this.toast.setMessage('item edited successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    deleteTypeCharge(typeCharge) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.dataService._delete(typeCharge).subscribe(
                res => {
                    const pos = this.typesCharges.map(elem => { return elem._id; }).indexOf(typeCharge._id);
                    this.typesCharges.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }

}
