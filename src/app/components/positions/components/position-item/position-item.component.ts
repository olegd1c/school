import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { PositionsService, TypesChargesService } from '@app/services';
import { Position } from '@app/models/position';
import { TypeCharge } from '@app/models/type-charge';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-position-item',
    templateUrl: './position-item.component.html'
})
export class PositionItemComponent implements OnInit {
    public position: Position;
    public isEditing: boolean = false;
    public isLoading: boolean = false;
    public isLoadingType: boolean = false;
    public typesCharges: TypeCharge[];

    public addPositionForm: FormGroup;
    name = new FormControl('', Validators.required);
    typeChargeIds = new FormControl('', Validators.required);

    public _title: string;
    public _title_button: string;

    private value: any = {};
    private _disabledV: string = '0';
    private disabled: boolean = false;

    constructor(private dataService: PositionsService, private typesChargesService: TypesChargesService,
        public toast: ToastComponent, private router: Router, private route: ActivatedRoute,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.addPositionForm = this.formBuilder.group({
            name: this.name,
            typeChargeIds: this.typeChargeIds
        });
        let positionId;
        if(this.route.snapshot.url.length > 1) {
            positionId = this.route.snapshot.url[1].path;
        }
        
        if (positionId) {
            this.isLoading = true;    
            this.dataService._getOne({_id: positionId}).subscribe(
                        data => {
                            this.position = data;
                            this.addPositionForm.setValue({name: this.position.name, typeChargeIds: this.position.typeChargeIds});
                        },
                        error => console.log(error),
                        () => this.isLoading = false
            );            
            this._title = "Редагувати посаду";
            this._title_button = "Зберегти";
            this.isEditing = true;
        } else {
            this.position = {_id: '', name: '', typeChargeIds: []};
            this._title = "Створити посаду";
            this._title_button = "Створити";
            this.isEditing = false;
            this.isLoading = false;
        }
        this.isLoadingType = true;
        this.typesChargesService._get().subscribe(
            data => {
                this.typesCharges = data;
                this.typesCharges.unshift({_id: '', name: ''});
            },
            error => console.log(error),
            () => this.isLoadingType = false
        );        
    }

    addPosition() {
        if(!this.isEditing) {
            this.dataService._add(this.addPositionForm.value).subscribe(
                res => {
                    const newPosition = res;
                    //this.positions.push(newPosition);
                    this.addPositionForm.reset();
                    this.toast.setMessage('item added successfully.', 'success');
                    this.router.navigate(['/main/positions']);
                },
                error => console.log(error)
            );
        } else {
            this.dataService._edit(this.position).subscribe(
                res => {
                    this.isEditing = false;
                    this.position = this.position;
                    this.toast.setMessage('item edited successfully.', 'success');
                    this.router.navigate(['/main/positions']);
                },
                error => console.log(error)
            );
        }
    }

    cancelEditing() {
        this.isEditing = false;
        //this.position = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        //this.getPositions();
    }

    public addTypeCharges($event){    
        const tempId = $event.target.value;    
        let tempType = this.position.typeChargeIds.find((item) => item._id == tempId);
        if(!tempType) {
            this.position.typeChargeIds.push(this.typesCharges.find((item) => item._id == tempId));
            this.typeChargeIds.setValue(this.position.typeChargeIds);
        }
        
        $event.target.value = '';
    }

    deleteTypeCharge(type){
        this.position.typeChargeIds = this.position.typeChargeIds.filter((item) => item._id != type._id);
        this.typeChargeIds.setValue(this.position.typeChargeIds);
    }
}
