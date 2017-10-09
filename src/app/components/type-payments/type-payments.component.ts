import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '@app/components/toast/toast.component';
import { TypePaymentsService } from '@app/services';
import { TypePayment } from '@app/models';

@Component({
  selector: 'app-type-payments',
  templateUrl: './type-payments.component.html',
  styleUrls: ['./type-payments.component.css']
})
export class TypePaymentsComponent implements OnInit {

  items: TypePayment[] = [];
  isLoading = true;

  item = {};
  isEditing = false;

  public addItemForm: FormGroup;
  name = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);

  constructor(private dataService: TypePaymentsService,
      public toast: ToastComponent,
      public formBuilder: FormBuilder) { }

  ngOnInit() {
      this.addItemForm = this.formBuilder.group({
          name: this.name,
          type: this.type,
      });

      this.getItems();
  }
  getItems() {
      this.dataService._get().subscribe(
          data => this.items = data,
          error => console.log(error),
          () => this.isLoading = false
      );
  }

  addItem() {
      this.dataService._add(this.addItemForm.value).subscribe(
          res => {
              this.items.push(res);
              this.addItemForm.reset();
              this.toast.setMessage('item added successfully.', 'success');
          },
          error => console.log(error)
      );
  }

  enableEditing(item) {
      this.isEditing = true;
      this.item = item;
  }

  cancelEditing() {
      this.isEditing = false;
      this.item = {};
      this.toast.setMessage('item editing cancelled.', 'warning');
      this.getItems();
  }

  editItem(item) {
      this.dataService._edit(item).subscribe(
          res => {
              this.isEditing = false;
              this.item = item;
              this.toast.setMessage('item edited successfully.', 'success');
          },
          error => console.log(error)
      );
  }

  deleteItem(item) {
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
