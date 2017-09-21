import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { RecruitmentsService } from '@app/services';
import { Recruitment } from '@app/models/recruitment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
})
export class RecruitmentComponent implements OnInit {

    items: Recruitment[] = [];
    isLoading = true;

    constructor(private dataService: RecruitmentsService, private router: Router,
        public toast: ToastComponent, 
        public formBuilder: FormBuilder) { }

    ngOnInit() {                
        this.getItems();
    }

    getItems() {
        this.dataService._get().subscribe(
            data => {this.items = data;
            console.log(this.items);
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    enableEditing(item: Recruitment) {
        this.router.navigate(['/main/recruitment-edit', item._id]);
    }

    enableOpen(item: Recruitment) {
        this.router.navigate(['/main/recruitment-item', item._id]);
    }

    deleteItem(item: Recruitment) {
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
