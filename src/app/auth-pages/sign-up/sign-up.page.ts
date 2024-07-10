
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'; 
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { Geolocation } from '@capacitor/geolocation';
declare var google: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signupForm: FormGroup;
  center: { lat: any; lng: any; };
  formattedAddress:any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: ApiService,
    private router:Router,
    private messageService: MessageService,
  ) {
    this.printCurrentPosition();
  }
   ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      country:['indian']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null : {'mismatch': true};
  }

  
  async fetchFormattedAddress() {
    console.log('hello abhi12')
    try {
     
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(this.center.lat, this.center.lng);
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results && results.length > 0) {
            this.formattedAddress = results[0].formatted_address;
          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    } catch (error) {
      console.error('Error fetching formatted address:', error);
    }
}
async printCurrentPosition() {
  try {
    const position = await Geolocation.getCurrentPosition();
    console.log('Current position:', position);
    this.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.fetchFormattedAddress();
  
  } catch (error) {
    console.error('Error getting current position:', error);
  }
}
  onSubmit() {
    if (this.signupForm.valid) {
      const data={
        country:this.signupForm.value.country,
        gender:this.signupForm.value.gender,
        email:this.signupForm.value.email,
        name:this.signupForm.value.name,
        password:this.signupForm.value.password,
       city:this.signupForm.value.city,
      }
      this.authService.signup(data).subscribe(
        response => {
          this.messageService.presentToast('Signup successful', 'success'); 
          this.router.navigate(['/apptabs/tabs/home'])
          this.signupForm.reset();
       },error => {
            this.messageService.presentToast("Signup failed", 'danger');
           }
      );
    }
  }
}