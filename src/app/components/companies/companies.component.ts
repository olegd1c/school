import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { MainService } from '@app/services/main.service';
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

    constructor(private dataService: MainService,
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
        this.dataService.getCompanies().subscribe(
            data => this.companies = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addCompany() {
        this.dataService.addCompany(this.addCompanyForm.value).subscribe(
            res => {
                const newCompany = res.json();
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
        this.dataService.editCompany(company).subscribe(
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
            this.dataService.deleteCompany(company).subscribe(
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
