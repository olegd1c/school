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

    recruitments: Recruitment[] = [];
    isLoading = true;
    recruitment = {};

    constructor(private dataService: RecruitmentsService, private router: Router,
        public toast: ToastComponent, 
        public formBuilder: FormBuilder) { }

    ngOnInit() {                
        this.getRecruitments();
    }

    getRecruitments() {
        this.dataService._get().subscribe(
            data => {this.recruitments = data;
            console.log(this.recruitments);
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    enableEditing(recruitment: Recruitment) {
        this.router.navigate(['/main/recruitment-edit', recruitment._id]);
    }

    enableOpen(recruitment: Recruitment) {
        this.router.navigate(['/main/recruitment-item', recruitment._id]);
    }

    deleteRecruitment(recruitment: Recruitment) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.dataService._delete(recruitment).subscribe(
                res => {
                    const pos = this.recruitments.map(elem => { return elem._id; }).indexOf(recruitment._id);
                    this.recruitments.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }
}
