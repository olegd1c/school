import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { TimeSheetsService } from '@app/services';
import { TimeSheet } from '@app/models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-time-sheet',
    templateUrl: './time-sheet.component.html',
    styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {

    items: TimeSheet[] = [];
    isLoading = true;

    constructor(private dataService: TimeSheetsService, private router: Router,
        public toast: ToastComponent,
        public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.dataService._get().subscribe(
            data => {
            this.items = data;
                console.log(this.items);
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    enableEditing(item: TimeSheet) {
        this.router.navigate(['/main/time-sheet-edit', item._id]);
    }

    enableOpen(item: TimeSheet) {
        this.router.navigate(['/main/time-sheets', item._id]);
    }

    deleteItem(item: TimeSheet) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.dataService._delete(item).subscribe(
                res => {
                    const pos = this.items.map(elem => { return elem._id; }).indexOf(item._id);
                    this.items.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }

}
