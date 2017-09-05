import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { RecruitmentsService, TypesChargesService } from '@app/services';
import { Recruitment } from '@app/models/recruitment';
import { TypeCharge } from '@app/models/type-charge';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recruitment-item',
  templateUrl: './recruitment-item.component.html',
})
export class RecruitmentItemComponent implements OnInit {
    public recruitment: Recruitment;
    public isEditing: boolean = false;
    public isLoading: boolean = false;
    public isLoadingType: boolean = false;
    public typesCharges: TypeCharge[];

    public addRecruitmentForm: FormGroup;
    number = new FormControl('', Validators.required);
    date = new FormControl('', Validators.required);
    companyId = new FormControl('', Validators.required);
    details = new FormControl('', Validators.required);

    public _title: string;
    public _title_button: string;

    private value: any = {};
    private _disabledV: string = '0';
    private disabled: boolean = false;

    constructor(private dataService: RecruitmentsService, private typesChargesService: TypesChargesService,
        public toast: ToastComponent, private router: Router, private route: ActivatedRoute,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.addRecruitmentForm = this.formBuilder.group({
            companyId: this.companyId,
            number: this.number,
            date: this.date,
            details: this.details
        });
        let recruitmentId;
        let isEdit:boolean = false;
        if(this.route.snapshot.url.length > 1) {
            recruitmentId = this.route.snapshot.url[1].path;
        }        
        if(this.route.snapshot.url.length > 2) {
            isEdit = Boolean(this.route.snapshot.url[2].path);
        }        
        
        if (recruitmentId) {
            this.isLoading = true;    
            this.dataService._getOne({_id: recruitmentId}).subscribe(
                        data => {
                            this.recruitment = data;
                            //this.addRecruitmentForm.setValue({number: this.recruitment.number, details: this.recruitment.details});
                            this.addRecruitmentForm.patchValue(this.recruitment);
                        },
                        error => console.log(error),
                        () => this.isLoading = false
            );            
            this._title = isEdit ? "Редагувати документ" : "Перегляд документа";
            this._title_button = "Зберегти";
            this.isEditing = isEdit;
        } else {
            this.recruitment = {_id: '', number: '', date: null, companyId: null, details: []};
            this._title = "Створити посаду";
            this._title_button = "Створити";
            this.isEditing = false;
            this.isLoading = false;
        }
        /*
        this.isLoadingType = true;
        this.typesChargesService._get().subscribe(
            data => {
                this.typesCharges = data;
                this.typesCharges.unshift({_id: '', name: ''});
            },
            error => console.log(error),
            () => this.isLoadingType = false
        ); */       
    }

    addRecruitment() {
        if(!this.isEditing) {
            this.dataService._add(this.addRecruitmentForm.value).subscribe(
                res => {
                    const newPosition = res;
                    //this.recruitments.push(newPosition);
                    this.addRecruitmentForm.reset();
                    this.toast.setMessage('item added successfully.', 'success');
                    this.router.navigate(['/main/positions']);
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

    public addTypeCharges($event){    
        /*
        const tempId = $event.target.value;    
        let tempType = this.recruitment.typeChargeIds.find((item) => item._id == tempId);
        if(!tempType) {
            this.recruitment.typeChargeIds.push(this.typesCharges.find((item) => item._id == tempId));
            this.typeChargeIds.setValue(this.recruitment.typeChargeIds);
        }
        
        $event.target.value = '';
        */
    }

    deleteTypeCharge(type){
        /*
        this.recruitment.typeChargeIds = this.recruitment.typeChargeIds.filter((item) => item._id != type._id);
        this.typeChargeIds.setValue(this.recruitment.typeChargeIds);
        */
    }

    deleteDetail(detail){
        this.recruitment.details = this.recruitment.details.filter((item) => detail._id != detail._id);
        //this.typeChargeIds.setValue(this.recruitment.details);
    }    

    returnToList(){
        this.router.navigate(['/main/recruitments']);
    }
}

