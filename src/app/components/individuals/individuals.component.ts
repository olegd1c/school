import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components/toast/toast.component';
import { IndividualsService } from '@app/services';
import { Individual } from '@app/models/individual';

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.css']
})
export class IndividualsComponent implements OnInit {

    individuals = [];
    isLoading = true;

    individual = {};
    isEditing = false;

    public addIndividualForm: FormGroup;
    first_name = new FormControl('', Validators.required);
    last_name = new FormControl('', Validators.required);
    father_name = new FormControl('', Validators.required);    
    address = new FormControl('', Validators.required);
    inn = new FormControl('', Validators.required);

    constructor(private dataService: IndividualsService,
        public toast: ToastComponent,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.addIndividualForm = this.formBuilder.group({
            first_name: this.first_name,
            last_name: this.last_name,
            father_name: this.father_name,
            address: this.address,
            inn: this.inn
        });        
        
        this.getIndividuals();
    }
    getIndividuals() {
        this.dataService._get().subscribe(
            data => this.individuals = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addIndividual() {
        this.dataService._add(this.addIndividualForm.value).subscribe(
            res => {
                const newIndividual = res.json();
                this.individuals.push(newIndividual);
                this.addIndividualForm.reset();
                this.toast.setMessage('item added successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    enableEditing(individual) {
        this.isEditing = true;
        this.individual = individual;
    }

    cancelEditing() {
        this.isEditing = false;
        this.individual = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        this.getIndividuals();
    }

    editIndividual(individual) {
        this.dataService._edit(individual).subscribe(
            res => {
                this.isEditing = false;
                this.individual = individual;
                this.toast.setMessage('item edited successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    deleteIndividual(individual) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.dataService._delete(individual).subscribe(
                res => {
                    const pos = this.individuals.map(elem => { return elem._id; }).indexOf(individual._id);
                    this.individuals.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }

}
