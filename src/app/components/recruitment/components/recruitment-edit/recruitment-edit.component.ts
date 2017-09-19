import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { RecruitmentsService, TypesChargesService, IndividualsService, CompaniesService, PositionsService,
    TypeBudgetsService, TypesWorksService } from '@app/services';
import { Recruitment, TypeCharge, Individual, Company, Position, TypeBudget, RecruitmentDetails,
    TypeWork } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-recruitment-edit',
    templateUrl: './recruitment-edit.component.html'
})
export class RecruitmentEditComponent implements OnInit {
    public recruitment: Recruitment;
    public countLoading = 0;
    public typesCharges: TypeCharge[];
    public typeBudgets: TypeBudget[];
    public individuals: Individual[];
    public companies: Company[];
    public positions: Position[];
    public isEditing = false;
    public loadingTotal = 7;
    public addRecruitmentForm: FormGroup;
    public typeOperations: string[] = ['+', '*', '%'];
    public editRow: number = undefined;
    public typeWorks: TypeWork[];
    recruitmentId: string;

    public _title = '';
    public _title_button = '';

    private value: any = {};
    private _disabledV = '0';
    private disabled = false;

    constructor(private dataService: RecruitmentsService, private typesChargesService: TypesChargesService,
        private individualsService: IndividualsService, private companiesService: CompaniesService,
        private positionsService: PositionsService, private typeBudgetsService: TypeBudgetsService,
        public toast: ToastComponent, private router: Router, private route: ActivatedRoute,
        public _fb: FormBuilder, private typeWorksService: TypesWorksService) { }

    ngOnInit() {
        this.countLoading = 0;

        
        if (this.route.snapshot.url.length > 1) {
            this.recruitmentId = this.route.snapshot.url[1].path;
        }

        if (this.recruitmentId) {
            this._title = 'Редагувати документ';
            this._title_button = 'Зберегти';
            this.isEditing = true;
            this.dataService._getOne({ _id: this.recruitmentId }).subscribe(
                data => {
                    const recruitment: Recruitment = data;
                     this.createForm();
                     recruitment.details.forEach(
                         (item,i) => {
                             if( i > 0) {
                                this.addDetail();                                       
                            }
                            item.charges.forEach(
                                ()=>{
                                 this.addCharges(i);                                           
                            });
                        }
                    );

                    this.addRecruitmentForm.patchValue({number: recruitment.number, companyId: recruitment.companyId,
                        date: recruitment.date, details: recruitment.details});
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
            this.editRow = 0;
        }

        this.typesChargesService._get().subscribe(
            data => {
                this.typesCharges = data;                
                if(!this.isEditing) this.typesCharges.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

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

        this.typeBudgetsService._get().subscribe(
            data => {
                this.typeBudgets = data;
                if(!this.isEditing) this.typeBudgets.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.typeWorksService._get().subscribe(
            data => {
                this.typeWorks = data;
                if(!this.isEditing) this.typeWorks.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );
    }
    //positionId: this._fb.group({_id:[''], name: ['']}),
    initDetail(): any {
        return this._fb.group({
            dateReceipt: [''],
            dateDismissal: [''],
            positionId: [''],
            individualId: [''],
            salary: [''],
            rate: [''],
            mainWorkId: [''],
            typeBudgetId: [''],
            charges: this._fb.array([
                // this.initCharge(),
            ])
        });
    }

    initCharge(): any {
        return this._fb.group({
            typeChargeId: [''],
            count: ['']
        });
    }

    addCharges(index: number){
        const control = <FormArray>this.addRecruitmentForm.controls['details'];
        const charges = control.controls[index]['controls']['charges'];
        charges.push(this.initCharge());
    }

    deleteCharges(index: number, indexCh: number){
        const control = <FormArray>this.addRecruitmentForm.controls['details'];
        const charges = control.controls[index]['controls']['charges'];
        charges.removeAt(indexCh);
    }

    saveRecruitment() {
        console.log(this.recruitment);
        if (!this.isEditing) {
            this.dataService._add(this.addRecruitmentForm.value).subscribe(
                res => {
                    const newPosition = res;
                    // this.recruitments.push(newPosition);
                    this.addRecruitmentForm.reset();
                    this.toast.setMessage('recruitments added successfully.', 'success');
                    this.router.navigate(['/main/recruitments']);
                },
                error => console.log(error)
            );
        } else {
            const data = Object.assign({_id: this.recruitmentId}, this.addRecruitmentForm.value);
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
        // this.recruitment = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        // this.getPositions();
    }

    returnToList() {
        this.router.navigate(['/main/recruitments']);
    }

    editDetail($event, index: number, field: string) {
        let tempValue;
        console.log($event.target.value);
        switch (field) {
            case 'individualId':
                tempValue = this.individuals[$event.target.options.selectedIndex];
                break;
            case 'positionId':
                tempValue = this.positions[$event.target.options.selectedIndex];
                break;
            case 'typeBudgetId':
                tempValue = this.typeBudgets[$event.target.options.selectedIndex];
                break;
            case 'mainWorkId':
                tempValue = this.typeWorks[$event.target.options.selectedIndex];
                break;
            case 'dateReceipt':
                tempValue = $event.target.value;
                break;
            case 'dateDismissal':
                tempValue = $event.target.value;
                break;                
        }
        console.log(tempValue);
        const control = <FormArray>this.addRecruitmentForm.controls['details'];
        control.controls[index][field] = tempValue;
    }

    enableDetailEditing(i: number) {
        this.editRow = i;
    }

    editTypeCharges($event, index: number, iT: number, field: string) {
        let tempValue;
        switch (field) {
            case 'typeChargeId':
                tempValue = this.typesCharges[$event.target.options.selectedIndex];
                break;
            case 'count':
                tempValue = $event.target.value;
                break;
        }
        const control = <FormArray>this.addRecruitmentForm.controls['details'];
        console.log(control);
        control.controls[iT][field] = tempValue;
    }

    deleteDetail(i: number) {
        const control = <FormArray>this.addRecruitmentForm.controls['details'];
        control.removeAt(i);
    }

    addDetail() {
        const control = <FormArray>this.addRecruitmentForm.controls['details'];
        control.push(this.initDetail());
        this.editRow = control.length - 1;
    }

    private createForm() {
        this.addRecruitmentForm = this._fb.group({
        companyId: new FormControl('', Validators.required),
        number: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        details: this._fb.array([
            this.initDetail(),
            ])
        });
    }
// tslint:disable-next-line:eofline
}