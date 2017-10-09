import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { SettingsService } from '@app/services';
import { Setting } from '@app/models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

    item: Setting;
    isLoading = true;

    constructor(private dataService: SettingsService, private router: Router,
        public toast: ToastComponent,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.dataService._get().subscribe(
            data => {
            this.item = data[0];
                console.log(this.item);
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    enableEditing(item: Setting) {
        this.router.navigate(['/main/setting-edit', item._id]);
    }

}