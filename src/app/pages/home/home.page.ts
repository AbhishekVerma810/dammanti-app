import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products = [
    { name: 'Headphones', image: 'assets/rectangle-29715@2x.png', remaining: '1 month remaining', expiryDate: '14/07/24' },
    { name: 'Washing Machine', image: 'assets/rectangle-29715-1@2x.png', expiryDate: '01/01/25' },
    { name: 'LED TV', image: 'assets/rectangle-29715-2@2x.png', expiryDate: '01/01/25' },
    { name: 'LED TV', image: 'assets/rectangle-29715-2@2x.png', expiryDate: '01/01/25' },
    { name: 'Smart Watch', image: 'assets/rectangle-29715-3@2x.png', expiryDate: '01/01/25' }
  ];
  categories = [
    { name: 'Appliances', count: '06' },
    { name: 'Electronics', count: '02' },
    { name: 'Accessories', count: '01' },
    { name: 'Gadgets', count: '04' },
    { name: 'Accessories', count: '' },
    { name: 'Gadgets', count: '' }
  ];
  productsView=true;
  categoryView=false;
  constructor(private router:Router) {}
  ngOnInit(): void {
    
  }
  navigateToUserProfile() {
  
  }
  ChangeUi(data:any){
      if(data=='productsView'){
        this.productsView=false;
        this.categoryView=true;
     
      }else{
        this.categoryView=false;
        this.productsView=true;
       
      }
  }
  navigateToAddProductDetail() {
   
  }

  navigateToSettings() {
    
  }
}