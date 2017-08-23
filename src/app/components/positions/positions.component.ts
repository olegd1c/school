import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { PositionsService } from '@app/services';
import { Company } from '@app/models/company';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

    positions = [];
    isLoading = true;

    position = {};
    isEditing = false;

    public addCompanyForm: FormGroup;
    name = new FormControl('', Validators.required);
    name_full = new FormControl('', Validators.required);
    address = new FormControl('', Validators.required);

    constructor(private dataService: PositionsService,
        public toast: ToastComponent,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.addCompanyForm = this.formBuilder.group({
            name: this.name,
            name_full: this.name_full,
            address: this.address
        });        
        
        this.getCompanies();
    }
    getCompanies() {
        this.dataService._get().subscribe(
            data => this.positions = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addCompany() {
        this.dataService._add(this.addCompanyForm.value).subscribe(
            res => {
                const newCompany = res.json();
                this.positions.push(newCompany);
                this.addCompanyForm.reset();
                this.toast.setMessage('item added successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    enableEditing(company) {
        this.isEditing = true;
        this.position = company;
    }

    cancelEditing() {
        this.isEditing = false;
        this.position = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        this.getCompanies();
    }

    editCompany(position) {
        this.dataService._edit(position).subscribe(
            res => {
                this.isEditing = false;
                this.position = position;
                this.toast.setMessage('item edited successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    deleteCompany(position) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.dataService._delete(position).subscribe(
                res => {
                    const pos = this.positions.map(elem => { return elem._id; }).indexOf(position._id);
                    this.positions.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }
}
