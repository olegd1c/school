import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components//toast/toast.component';
import { PositionsService } from '@app/services';
import { Position } from '@app/models/position';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

    positions: Position[] = [];
    isLoading = true;
    //isAdd = false;

    position = {};
    //isEditing = false;

    constructor(private dataService: PositionsService, private router: Router,
        public toast: ToastComponent, 
        public formBuilder: FormBuilder) { }

    ngOnInit() {                
        this.getPositions();
    }

    getPositions() {
        this.dataService._get().subscribe(
            data => {this.positions = data;
            console.log(this.positions);
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    enableEditing(position: Position) {
        //this.isEditing = true;
        //this.position = position;
        this.router.navigate(['/main/position-item', position._id]);
    }

    enableAdd(){
        //this.isAdd = true;
    }

    deletePosition(position) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.dataService._delete(position).subscribe(
                res => {
                    const pos = this.positions.map(elem => { return elem._id; }).indexOf(position._id);
                    this.positions.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }
}
