import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { TimeSheetsService, IndividualsService, CompaniesService, PositionsService, RecruitmentsService, PaymentsService, TypePaymentsService,
    TypeBudgetsService, TypeChargesService, SettingsService } from '@app/services';
import { TimeSheet, Employee, Company, Individual, Position, Payment, TypePayment, TypeBudget, TypeCharge, Setting, 
        DetailsPayment, Budgeting } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-payment-edit',
    templateUrl: './payment-edit.component.html',
    styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {
    public itemId: string;
    public countLoading = 0;
    public individuals: Individual[];
    public companies: Company[];
    public positions: Position[];
    public typePayments: TypePayment[];
    public typeBudgets: TypeBudget[];
    public typeCharges: TypeCharge[];
    public _title = '';
    public _title_button = '';
    public isEditing = false;
    public loadingTotal = 8;
    public addItemForm: FormGroup;
    private static MAIN_URL = '/main/payments';
    public employees: Employee[];
    public settings: Setting;

    constructor(private dataService: PaymentsService, private timeSheetsService: TimeSheetsService, private individualsService: IndividualsService,
        private companiesService: CompaniesService, private positionsService: PositionsService, private typePaymentsService: TypePaymentsService,
        private recruitmentsService: RecruitmentsService, private typeBudgetsService: TypeBudgetsService, private typeChargesService: TypeChargesService,
        private settingsService: SettingsService,
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
                        (item, i) => {
                            if (i > 0) {
                                this.addDetail();
                            }
                        }
                    );

                    this.addItemForm.patchValue(item);
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
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.companiesService._get().subscribe(
            data => {
                this.companies = data;
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.positionsService._get().subscribe(
            data => {
                this.positions = data;
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.typePaymentsService._get().subscribe(
            data => {
                this.typePayments = data;
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.typeBudgetsService._get().subscribe(
            data => {
                this.typeBudgets = data;
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.typeChargesService._get().subscribe(
            data => {
                this.typeCharges = data;
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.settingsService._get().subscribe(
            data => {
                this.settings = data[0];
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
            typePaymentId: new FormControl('', Validators.required),
            details: this._fb.array([
                this.initDetail(),
            ])
        });
    }

    initDetail(): any {
        return this._fb.group({
            individualId: [''],
            positionId: [''],
            typeBudgetId: [''],
            typeChargeId: [''],
            month: [''],
            sum: [''],
            budgeting: ['']
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
                    this.addItemForm.reset();
                    this.toast.setMessage('recruitments added successfully.', 'success');
                    this.router.navigate([PaymentEditComponent.MAIN_URL]);
                },
                error => console.log(error)
            );
        } else {
            const data = Object.assign({ _id: this.itemId }, this.addItemForm.value);
            this.dataService._edit(data).subscribe(
                res => {
                    this.toast.setMessage('item edited successfully.', 'success');
                    this.router.navigate([PaymentEditComponent.MAIN_URL]);
                },
                error => console.log(error)
            );
        }
    }

    returnToList() {
        this.router.navigate([PaymentEditComponent.MAIN_URL]);
    }

    fillDetail() {
        const d = new Date(this.addItemForm.controls.date.value);
        const m = d.getMonth(); //current month
        const y = d.getFullYear(); //current year
        const start = new Date(y, m, 1);
        const end = new Date(y, m + 1, 0);

        const data = {
            companyId: this.addItemForm.controls.companyId.value, start: start,
            end: end
        };

        if(this.addItemForm.controls.typePaymentId.value == this.settings.prepaymentId._id){
            this.timeSheetsService.getEmployees(data).subscribe(
                res => {
                    if(res) {
                        let employees = res.details;
                        let control = <FormArray>this.addItemForm.controls.details;
                        while (control.length) {
                            control.removeAt(0);
                        }
                        let paymentDetails: DetailsPayment[] = [];
                        employees.forEach((employee) => {
                            this.addDetail();
                            this.addDetail();
                            let rowDetailPlan: DetailsPayment = Object.assign({}, employee);
                            rowDetailPlan.budgeting = Budgeting.PLAN;
                            rowDetailPlan.sum = -employee.salary;
                            paymentDetails.push(rowDetailPlan);

                            let rowDetail: DetailsPayment = Object.assign({}, employee);
                            if(this.addItemForm.controls.typePaymentId.value == this.settings.prepaymentId._id){
                                let sum: number = this.settings.percentPrepayment/100*employee.salary;
                                rowDetail.sum = Math.round(sum*100)/100 ;
                            }
                            rowDetail.budgeting = Budgeting.FACT;
                            paymentDetails.push(rowDetail);
                        });
                        
                        this.addItemForm.patchValue({ details: paymentDetails });
                    }
                },
                error => console.log(error)
            );
        } else if(this.addItemForm.controls.typePaymentId.value == this.settings.salaryId._id) {
            this.dataService.getSalaryPayment(data).subscribe(
                res => {
                    if(res) {
                        let employees = res.details;
                        let control = <FormArray>this.addItemForm.controls.details;
                        while (control.length) {
                            control.removeAt(0);
                        }
                        let paymentDetails: DetailsPayment[] = [];
                        employees.forEach((employee) => {
                            this.addDetail();
                            let rowDetail: DetailsPayment = Object.assign(employee);
                            if(this.addItemForm.controls.typePaymentId.value == this.settings.prepaymentId._id){
                                let sum: number = this.settings.percentPrepayment/100*employee.salary;
                                rowDetail.sum = Math.round(sum*100)/100 ;
                            }
                            paymentDetails.push(rowDetail);
                        });
                        
                        this.addItemForm.patchValue({ details: paymentDetails });
                    }
                },
                error => console.log(error)
            );
        }
    }
}
