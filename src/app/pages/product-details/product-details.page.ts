import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
