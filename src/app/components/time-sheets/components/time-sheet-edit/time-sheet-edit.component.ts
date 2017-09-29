import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { TimeSheetsService, IndividualsService, CompaniesService, PositionsService, RecruitmentsService } from '@app/services';
import { TimeSheet, Company, Individual, Position } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-time-sheet-edit',
    templateUrl: './time-sheet-edit.component.html',
    styleUrls: ['./time-sheet-edit.component.css']
})
export class TimeSheetEditComponent implements OnInit {
    public itemId: string;
    public countLoading = 0;
    public individuals: Individual[];
    public companies: Company[];
    public positions: Position[];
    public _title = '';
    public _title_button = '';
    public isEditing = false;
    public loadingTotal = 4;
    public addItemForm: FormGroup;
    private static MAIN_URL = '/main/time-sheets';
    public employees: any[];

    constructor(private dataService: TimeSheetsService, private individualsService: IndividualsService, 
        private companiesService: CompaniesService, private positionsService: PositionsService, 
        private recruitmentsService: RecruitmentsService,
        public toast: ToastComponent, private router: Router, private route: ActivatedRoute,
        public _fb: FormBuilder) { }

    ngOnInit() {
        this.countLoading = 0;
        if (this.route.snapshot.url.length > 1) {
            this.itemId = this.route.snapshot.url[1].path;
        }

        if (this.itemId) {
            this._title = 'Редагувати документ';
            this._title_button = 'Зберегти';
            this.isEditing = true;
            this.dataService._getOne({ _id: this.itemId }).subscribe(
                data => {
                    const item: TimeSheet = data;
                     this.createForm();
                     item.details.forEach(
                         (item,i) => {
                             if( i > 0) {
                                this.addDetail();
                            }
                        }
                    );

                    this.addItemForm.patchValue({number: item.number, companyId: item.companyId,
                        date: item.date, details: item.details});
                },
                error => console.log(error),
                () => this.countLoading++
            );

        } else {
            this.createForm();
            // this.recruitment = new Recruitment();
            this._title = 'Створити документ';
            this._title_button = 'Створити';
            this.isEditing = false;
            this.countLoading++;
        }

        this.individualsService._get().subscribe(
            data => {
                this.individuals = data;
                if(!this.isEditing) this.individuals.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.companiesService._get().subscribe(
            data => {
                this.companies = data;
                if(!this.isEditing) this.companies.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.positionsService._get().subscribe(
            data => {
                this.positions = data;
                if(!this.isEditing) this.positions.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );       
    }

    private createForm() {
        this.addItemForm = this._fb.group({
        companyId: new FormControl('', Validators.required),
        number: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        countWorkDayMounth: new FormControl('', Validators.required),
        details: this._fb.array([
            this.initDetail(),
            ])
        });
    }

    initDetail(): any {
        return this._fb.group({
            individualId: [''],
            positionId: [''],
            countWorkDays: [''],
            countHospitalDays: [''],
            countVacationDays: [''],
            countNightShift: [''],
        });
    }

    deleteDetail(i: number) {
        const control = <FormArray>this.addItemForm.controls['details'];
        control.removeAt(i);
    }

    addDetail() {
        const control = <FormArray>this.addItemForm.controls['details'];
        control.push(this.initDetail());
    }    

    saveItem() {
        if (!this.isEditing) {
            this.dataService._add(this.addItemForm.value).subscribe(
                res => {
                    const newPosition = res;
                    // this.recruitments.push(newPosition);
                    this.addItemForm.reset();
                    this.toast.setMessage('recruitments added successfully.', 'success');
                    this.router.navigate([TimeSheetEditComponent.MAIN_URL]);
                },
                error => console.log(error)
            );
        } else {
            const data = Object.assign({_id: this.itemId}, this.addItemForm.value);
            this.dataService._edit(data).subscribe(
                res => {
                    this.toast.setMessage('item edited successfully.', 'success');
                    this.router.navigate([TimeSheetEditComponent.MAIN_URL]);
                },
                error => console.log(error)
            );
        }
    }

    returnToList() {
        this.router.navigate([TimeSheetEditComponent.MAIN_URL]);
    }    

    fillDetail(){
        const d = new Date(this.addItemForm.controls.date.value);
        const m = d.getMonth(); //current month
        const y = d.getFullYear(); //current year
        const start = new Date(y,m,1);
        const end = new Date(y,m+1,0);

        const data = {companyId: this.addItemForm.controls.companyId.value, start: start, 
                end: end};
        this.recruitmentsService.getEmployees(data).subscribe(
            res => {
                this.employees = res;
                //this.addItemForm.controls.details.value
                let control = <FormArray>this.addItemForm.controls.details;
                while(control.length){
                    control.removeAt(0);
                }

                this.employees.forEach(() => this.addDetail());
                this.addItemForm.patchValue({details: this.employees});
                //this.toast.setMessage('item edited successfully.', 'success');
            },
            error => console.log(error)
        );
    }
}
