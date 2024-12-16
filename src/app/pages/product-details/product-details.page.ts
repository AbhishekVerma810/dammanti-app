import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product = {
    name: 'Washing Machine',
    timeLeft: '11 months 28 days left',
    category: 'Appliances',
    warrantyStart: '10-June-2020',
    warrantyEnd: '09-June-2025',
    invoiceNo: '7823453754',
    reminder: '1 Month Before Expiry',
    notes: 'Not Specified',
    shopLocation: ''
  };
   productDetails:any;
  constructor(
    private apiService:ApiService,
    private messageService:MessageService
  ) { }
 
  ngOnInit() {
    this.getProductDetails();
  }
  getProductDetails() {
    const data = {
      id: '2'
    };
    this.apiService.getProductDetail(2).subscribe(
      (response: any) => {
        if (response) {
          this.productDetails = response.data;
          console.log("Product Details:", this.productDetails);
        } else {
          console.error("No response data");
          this.messageService.presentToast('No product details found', 'warning');
        }
      },
      (error) => {
        console.error("Error fetching product details:", error);
        this.messageService.presentToast('Error fetching product details', 'danger');
      }
    );
  }
  
}
