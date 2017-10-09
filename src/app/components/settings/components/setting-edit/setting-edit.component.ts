import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { SettingsService, TypePaymentsService } from '@app/services';
import { TypePayment, Setting } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-setting-edit',
    templateUrl: './setting-edit.component.html',
})
export class SettingEditComponent implements OnInit {

    //public item: Setting;
    public countLoading = 0;
    public isEditing = false;
    public loadingTotal = 2;
    public addItemForm: FormGroup;
    private static mainUrl: string = '/main/settings';
    public _title = '';
    public _title_button = '';
    private itemId: string;
    private value: any = {};
    public typePayments: TypePayment[];

    constructor(private dataService: SettingsService, public toast: ToastComponent, private router: Router,
        private typePaymentsService: TypePaymentsService, private route: ActivatedRoute, public _fb: FormBuilder) { }

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
                    const item = data;
                    this.createForm();
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
        }

        this.typePaymentsService._get().subscribe(
            data => {
                this.typePayments = data;
            },
            error => console.log(error),
            () => this.countLoading++
        );        
    }

    saveItem() {
        if (!this.isEditing) {
            this.dataService._add(this.addItemForm.value).subscribe(
                res => {
                    this.addItemForm.reset();
                    this.toast.setMessage('items added successfully.', 'success');
                    this.router.navigate([SettingEditComponent.mainUrl]);
                },
                error => console.log(error)
            );
        } else {
            const data = Object.assign({ _id: this.itemId }, this.addItemForm.value);
            this.dataService._edit(data).subscribe(
                res => {
                    this.toast.setMessage('item edited successfully.', 'success');
                    this.router.navigate([SettingEditComponent.mainUrl]);
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
        this.router.navigate([SettingEditComponent.mainUrl]);
    }

    private createForm() {
        this.addItemForm = this._fb.group({
            salaryId: new FormControl('', Validators.required),
            prepaymentId: new FormControl('', Validators.required),
            percentPrepayment: new FormControl('', Validators.required),            
        });
    }
    // tslint:disable-next-line:eofline
}