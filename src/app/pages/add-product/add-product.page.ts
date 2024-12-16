import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraPhoto } from '@capacitor/camera';
import { MessageService } from 'src/app/services/message.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  productForm: FormGroup;
  productPictureUrl: string | ArrayBuffer | null = null;
  invoiceUrl: string | ArrayBuffer | null = null;
  shopPictureUrl: string | ArrayBuffer | null = null;
  categories: any;
  picture: any;
  maxDate:any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertController: AlertController,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getCategory();
    this.initForm();
    this.setDefaultDates();

    this.productForm.get('time_period')?.valueChanges.subscribe(() => {
      this.updateWarrantyEndDate();
    });
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      category_id: ['', Validators.required],
      purchase_date: ['', Validators.required],
      time_period: ['', Validators.required],
      warranty_start_date: ['', Validators.required],
      warranty_end_date: ['', Validators.required],
      shop_name: ['', Validators.required],
      warranty_contact_person_name: ['', Validators.required],
      warranty_contact_person_number: ['', Validators.required],
      shop_location: ['', Validators.required],
      shop_picture: [null],
      product_picture: [null],
      invoice: [null],
      notes: ['']
    });
    // this.setDefaultDates();
    // this.maxDate = this.formatDateForInput(new Date());
  }

  setDefaultDates() {
    const currentDate = this.getCurrentDate();
    this.productForm.patchValue({
      purchase_date: currentDate,
      warranty_start_date: currentDate
    });
    this.updateWarrantyEndDate();
  }

  getCurrentDate(): string {
    const date = new Date();
    return this.formatDateToString(date);
  }

  formatDateToString(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  formatDate(event: any, controlName: string) {
    if (!this.productForm) return;
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
    } else if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    const validControllers = ['purchase_date', 'warranty_end_date', 'warranty_start_date'];
    if (validControllers.includes(controlName)) {
      this.productForm.get(controlName)?.setValue(value, { emitEvent: false });
    }

    if (controlName === 'warranty_start_date') {
      this.updateWarrantyEndDate();
    }
  }

  updateWarrantyEndDate() {
    const startDateStr = this.productForm.get('warranty_start_date')?.value;
    const timePeriod = this.productForm.get('time_period')?.value;
    
    if (startDateStr && timePeriod) {
      const startDate = new Date(startDateStr);
      const endDate = new Date(startDate.setMonth(startDate.getMonth() + parseInt(timePeriod)));
      this.productForm.get('warranty_end_date')?.setValue(this.formatDateToString(endDate), { emitEvent: false });
    }
  }
  // setDefaultDates() {
  //   const currentDate = this.getCurrentDate();
  //   this.productForm.patchValue({
  //     purchase_date: this.formatDateForInput(new Date()),
  //     warranty_start_date: this.formatDateForInput(new Date()),
      
  //   });
  //   this.updateWarrantyEndDate();
  // }

  // getCurrentDate(): string {
  //   return this.formatDateToString(new Date());
  // }

  // formatDateToString(date: Date): string {
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // }

  // formatDateForInput(date: Date): string {
  //   return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  // }

  // formatDate(event: any, controlName: string) {
  //   if (!this.productForm) return;
  //   const value = event.detail.value; // Get the value from ionChange event
    
  //   if (value) {
  //     const date = new Date(value);
  //     const formattedDate = this.formatDateToString(date);
      
  //     const validControllers = ['purchase_date', 'warranty_end_date', 'warranty_start_date'];
  //     if (validControllers.includes(controlName)) {
  //       this.productForm.get(controlName)?.setValue(formattedDate, { emitEvent: false });
  //     }

  //     if (controlName === 'warranty_start_date') {
  //       this.updateWarrantyEndDate();
  //     }
  //   }
  // }

  // updateWarrantyEndDate() {
  //   const startDateStr = this.productForm.get('warranty_start_date')?.value;
  //   const timePeriod = this.productForm.get('time_period')?.value;
    
  //   if (startDateStr && timePeriod) {
  //     const [day, month, year] = startDateStr.split('-');
  //     const startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  //     const endDate = new Date(startDate.setMonth(startDate.getMonth() + parseInt(timePeriod)));
  //     this.productForm.get('warranty_end_date')?.setValue(this.formatDateToString(endDate), { emitEvent: false });
  //   }
  // }

  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.productForm.patchValue({
        [controlName]: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        if (controlName === 'product_picture') {
          this.productPictureUrl = reader.result;
        } else if (controlName === 'invoice') {
          this.invoiceUrl = reader.result;
        } else if (controlName === 'shop_picture') {
          this.shopPictureUrl = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('image-input') as HTMLElement;
    fileInput.click();
  }

  triggerFileInvoiceInput() {
    const fileInput = document.getElementById('image-input-invoice') as HTMLElement;
    fileInput.click();
  }

  triggerFileShopInput() {
    const fileInput = document.getElementById('image-input-shop') as HTMLElement;
    fileInput.click();
  }

  async takePicture(controlName: string) {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.DataUrl
      });

      if (image.dataUrl) {
        const blob = this.dataURLtoBlob(image.dataUrl);
        const file = new File([blob], `${controlName}_${new Date().getTime()}.jpg`, { type: 'image/jpeg' });

        this.productForm.patchValue({
          [controlName]: file
        });

        if (controlName === 'product_picture') {
          this.productPictureUrl = image.dataUrl;
        } else if (controlName === 'invoice') {
          this.invoiceUrl = image.dataUrl;
        } else if (controlName === 'shop_picture') {
          this.shopPictureUrl = image.dataUrl;
        }
      }
    } catch (error) {
      this.messageService.presentToast('Error taking picture', 'danger');
    }
  }
  getCategory() {
    this.apiService.getCategory().subscribe(
      (response: any) => {
        this.categories = response.data;
      },
      (error) => {
        this.messageService.presentToast('Error fetching categories','danger')
      }
    );
  }
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
        if (control) {
          formData.append(key, control.value);
        }
      });
      this.apiService.addProduct(formData).subscribe(
        (response) => {
          this.messageService.presentToast('Product saved successfully','Success')
       },
        (error) => {
          this.messageService.presentToast('Error saving product','danger')
        }
      );
    } else {
      this.messageService.presentToast('Please fill in all required fields','danger')
    }
  }
   private dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}