import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { RecruitmentsService, TypesChargesService, IndividualsService, CompaniesService, PositionsService, TypeBudgetsService } from '@app/services';
import { Recruitment, TypeCharge, Individual, Company, Position, TypeBudget, RecruitmentDetails } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-recruitment-edit',
    templateUrl: './recruitment-edit.component.html'
})
export class RecruitmentEditComponent implements OnInit {
    public recruitment: Recruitment;
    public countLoading: number = 0;
    public typesCharges: TypeCharge[];
    public typeBudgets: TypeBudget[];
    public individuals: Individual[];
    public companies: Company[];
    public positions: Position[];
    public isEditing: boolean = false;
    public loadingTotal: number = 6;
    public addRecruitmentForm: FormGroup;
    public typeOperations: string[] = ['+', '*', '%'];
    public editRow: number = undefined;

    public _title: string;
    public _title_button: string;

    private value: any = {};
    private _disabledV: string = '0';
    private disabled: boolean = false;

    constructor(private dataService: RecruitmentsService, private typesChargesService: TypesChargesService,
        private individualsService: IndividualsService, private companiesService: CompaniesService,
        private positionsService: PositionsService, private typeBudgetsService: TypeBudgetsService,
        public toast: ToastComponent, private router: Router, private route: ActivatedRoute,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.countLoading = 0;
        this.addRecruitmentForm = this.formBuilder.group({
            companyId: new FormControl('', Validators.required),
            number: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required),
            details: ''
        });
        let recruitmentId;
        if (this.route.snapshot.url.length > 1) {
            recruitmentId = this.route.snapshot.url[1].path;
        }

        if (recruitmentId) {
            this.isEditing = true;
            this.dataService._getOne({ _id: recruitmentId }).subscribe(
                data => {
                    this.recruitment = data;
                    this.addRecruitmentForm.setValue({number: this.recruitment.number, date: this.recruitment.date , 
                        companyId: this.recruitment.companyId , details: this.recruitment.details});
                    //this.addRecruitmentForm.patchValue(this.recruitment);
                },
                error => console.log(error),
                () => this.countLoading++
            );
            this._title = "Редагувати документ";
            this._title_button = "Зберегти";
        } else {
            this.recruitment = new Recruitment();
            this._title = "Створити документ";
            this._title_button = "Створити";
            this.isEditing = false;
            this.countLoading++;
            this.editRow = 0;
        }

        this.typesChargesService._get().subscribe(
            data => {
                this.typesCharges = data;
                this.typesCharges.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.individualsService._get().subscribe(
            data => {
                this.individuals = data;
                this.individuals.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.companiesService._get().subscribe(
            data => {
                this.companies = data;
                this.companies.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.positionsService._get().subscribe(
            data => {
                this.positions = data;
                this.positions.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );

        this.typeBudgetsService._get().subscribe(
            data => {
                this.typeBudgets = data;
                this.typeBudgets.unshift({});
            },
            error => console.log(error),
            () => this.countLoading++
        );
    }

    saveRecruitment() {
        console.log(this.recruitment);
        if (!this.isEditing) {
            this.dataService._add(this.addRecruitmentForm.value).subscribe(
                res => {
                    const newPosition = res;
                    //this.recruitments.push(newPosition);
                    this.addRecruitmentForm.reset();
                    this.toast.setMessage('recruitments added successfully.', 'success');
                    this.router.navigate(['/main/recruitments']);
                },
                error => console.log(error)
            );
        } else {
            this.dataService._edit(this.recruitment).subscribe(
                res => {
                    this.isEditing = false;
                    this.recruitment = this.recruitment;
                    this.toast.setMessage('item edited successfully.', 'success');
                    this.router.navigate(['/main/recruitments']);
                },
                error => console.log(error)
            );
        }
    }

    cancelEditing() {
        this.isEditing = false;
        //this.recruitment = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        //this.getPositions();
    }

    deleteTypeCharge(type) {
        /*
        this.recruitment.typeChargeIds = this.recruitment.typeChargeIds.filter((item) => item._id != type._id);
        this.typeChargeIds.setValue(this.recruitment.typeChargeIds);
        */
    }

    deleteDetail(detail) {
        this.recruitment.details = this.recruitment.details.filter((item) => detail._id != detail._id);
        //this.typeChargeIds.setValue(this.recruitment.details);
    }

    returnToList() {
        this.router.navigate(['/main/recruitments']);
    }

    editDetail($event, index: number, field: string) {
        let tempValue;
        console.log($event.target.value);
        switch (field) {
            case "individualId":
                tempValue = this.individuals[$event.target.options.selectedIndex];
                break;
            case "positionId":
                tempValue = this.positions[$event.target.options.selectedIndex];
                break;
            case "typeBudgetId":
                tempValue = this.typeBudgets[$event.target.options.selectedIndex];
                break;
            case "individualId":
                tempValue = this.individuals[$event.target.options.selectedIndex];
                break;
            case "individualId":
                tempValue = this.individuals[$event.target.options.selectedIndex];
                break;
            case "individualId":
                tempValue = this.individuals[$event.target.options.selectedIndex];
                break;
            case "date_receipt":
                tempValue = $event.target.value;
                break;
        }
        this.recruitment.details[index][field] = tempValue;
    }

    enableDetailEditing(i: number) {
        this.editRow = i;
    }

    editTypeCharges($event, index: number, iT: number, field: string) {
        let tempValue;
        switch (field) {
            case "typeChargeId":
                tempValue = this.typesCharges[$event.target.options.selectedIndex];
                break;
            case "count":
                tempValue = $event.target.value;
                break;                
        }
        this.recruitment.details[index].charges[iT][field] = tempValue;

    }

    changeCompany($event){
        this.addRecruitmentForm.patchValue({companyId: this.companies[$event.target.options.selectedIndex]});
    }

    deleteDetailRecruitment(index: number){
        this.recruitment.details.splice(index, 1);
    }

    addDetailRecruitment(){
        this.recruitment.details.push(new RecruitmentDetails());
        this.editRow = this.recruitment.details.length-1;
    }    
}