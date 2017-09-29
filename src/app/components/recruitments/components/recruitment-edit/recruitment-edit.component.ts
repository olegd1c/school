import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import {
    RecruitmentsService, TypeChargesService, IndividualsService, CompaniesService, PositionsService,
    TypeBudgetsService, TypesWorksService
} from '@app/services';
import { Recruitment, TypeCharge, Individual, Company, Position, TypeBudget, TypeWork } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-recruitment-edit',
    templateUrl: './recruitment-edit.component.html'
})
export class RecruitmentEditComponent implements OnInit {
    public item: Recruitment;
    public countLoading = 0;
    public typesCharges: TypeCharge[];
    public typeBudgets: TypeBudget[];
    public individuals: Individual[];
    public companies: Company[];
    public positions: Position[];
    public isEditing = false;
    public loadingTotal = 7;
    public addItemForm: FormGroup;
    public typeOperations: string[] = ['+', '*', '%'];
    public editRow: number = undefined;
    public typeWorks: TypeWork[];
    itemId: string;

    public _title = '';
    public _title_button = '';

    private value: any = {};
    private _disabledV = '0';
    private disabled = false;

    constructor(private dataService: RecruitmentsService, private typeChargesService: TypeChargesService,
        private individualsService: IndividualsService, private companiesService: CompaniesService,
        private positionsService: PositionsService, private typeBudgetsService: TypeBudgetsService,
        public toast: ToastComponent, private router: Router, private route: ActivatedRoute,
        public _fb: FormBuilder, private typeWorksService: TypesWorksService) { }

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
                    const item: Recruitment = data;
                    this.createForm();
                    item.charges.forEach(
                        () => {
                            this.addCharges();
                        }
                    );

                    this.addItemForm.patchValue(item);
                },
                error => console.log(error),
                () => this.countLoading++
            );

        } else {
            this.createForm();
            // this.item = new Recruitment();
            this._title = 'Створити документ';
            this._title_button = 'Створити';
            this.isEditing = false;
            this.countLoading++;
            this.editRow = 0;
        }

        this.typeChargesService._get().subscribe(
            data => {
                this.typesCharges = data;
                if (!this.isEditing) this.typesCharges.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.individualsService._get().subscribe(
            data => {
                this.individuals = data;
                if (!this.isEditing) this.individuals.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.companiesService._get().subscribe(
            data => {
                this.companies = data;
                if (!this.isEditing) this.companies.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.positionsService._get().subscribe(
            data => {
                this.positions = data;
                if (!this.isEditing) this.positions.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.typeBudgetsService._get().subscribe(
            data => {
                this.typeBudgets = data;
                if (!this.isEditing) this.typeBudgets.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.typeWorksService._get().subscribe(
            data => {
                this.typeWorks = data;
                if (!this.isEditing) this.typeWorks.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );
    }

    initCharge(): any {
        return this._fb.group({
            typeChargeId: [''],
            count: ['']
        });
    }

    addCharges() {
        const control = <FormArray>this.addItemForm.controls.charges;
        control.push(this.initCharge());
    }

    deleteCharges(index: number) {
        const control = <FormArray>this.addItemForm.controls.charges;
        control.removeAt(index);
    }

    saveItem() {
        console.log(this.item);
        if (!this.isEditing) {
            this.dataService._add(this.addItemForm.value).subscribe(
                res => {
                    const newPosition = res;
                    // this.items.push(newPosition);
                    this.addItemForm.reset();
                    this.toast.setMessage('items added successfully.', 'success');
                    this.router.navigate(['/main/recruitments']);
                },
                error => console.log(error)
            );
        } else {
            const data = Object.assign({ _id: this.itemId }, this.addItemForm.value);
            this.dataService._edit(data).subscribe(
                res => {
                    this.toast.setMessage('item edited successfully.', 'success');
                    this.router.navigate(['/main/recruitments']);
                },
                error => console.log(error)
            );
        }
    }

    cancelEditing() {
        this.isEditing = false;
        this.toast.setMessage('item editing cancelled.', 'warning');
        // this.getPositions();
    }

    returnToList() {
        this.router.navigate(['/main/recruitments']);
    }

    private createForm() {
        this.addItemForm = this._fb.group({
            companyId: new FormControl('', Validators.required),
            number: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required),
            dateReceipt: [''],
            dateDismissal: [''],
            positionId: [''],
            individualId: [''],
            salary: [''],
            rate: [''],
            mainWorkId: [''],
            typeBudgetId: [''],
            charges: this._fb.array([
                //this.initCharge(),
            ])
        });
    }
    // tslint:disable-next-line:eofline
}