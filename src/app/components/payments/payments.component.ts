import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '@app/components//toast/toast.component';
import { PaymentsService } from '@app/services';
import { TypePayment, Payment } from '@app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  items: Payment[] = [];
  isLoading = true;

  constructor(private dataService: PaymentsService, private router: Router,
      public toast: ToastComponent) { }

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

  enableEditing(item: Payment) {
      this.router.navigate(['/main/payment-edit', item._id]);
  }

  enableOpen(item: Payment) {
      //this.router.navigate(['/main/payment-item', item._id]);
  }

  deleteItem(item: Payment) {
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
