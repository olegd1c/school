import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { CompaniesService } from '@app/services';
import { Company } from '@app/models/company';

@Component({
    selector: 'app-companies',
    templateUrl: './companies-list.component.html',
    styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

    companies = [];
    isLoading = true;

    company = {};
    isEditing = false;

    public addCompanyForm: FormGroup;
    name = new FormControl('', Validators.required);
    name_full = new FormControl('', Validators.required);
    address = new FormControl('', Validators.required);

    constructor(private dataService: CompaniesService,
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
            data => this.companies = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addCompany() {
        this.dataService._add(this.addCompanyForm.value).subscribe(
            res => {
                const newCompany = res;
                this.companies.push(newCompany);
                this.addCompanyForm.reset();
                this.toast.setMessage('item added successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    enableEditing(company) {
        this.isEditing = true;
        this.company = company;
    }

    cancelEditing() {
        this.isEditing = false;
        this.company = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        this.getCompanies();
    }

    editCompany(company) {
        this.dataService._edit(company).subscribe(
            res => {
                this.isEditing = false;
                this.company = company;
                this.toast.setMessage('item edited successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    deleteCompany(company) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.dataService._delete(company).subscribe(
                res => {
                    const pos = this.companies.map(elem => { return elem._id; }).indexOf(company._id);
                    this.companies.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }
}
