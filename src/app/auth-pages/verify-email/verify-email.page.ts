import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  otpDigits: string[] = ['', '', '', ''];
  signupForm: FormGroup;
  id: string;
  otp:any;
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }
  ngOnInit() {
   
  }
  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onSubmit() {
    if (this.signupForm.invalid) return;
    this.apiService.forgotPassword(this.signupForm.value).subscribe(
      res => {
        this.messageService.presentToast('OTP sent successfully to your email.', 'success');
        this.signupForm.reset();
        this.router.navigate(['/verify-email']);
      },
      err => {
        if(err.error.error==='Email does not exist.'){
          this.messageService.presentToast('Email does not exist.', 'danger');
        }else{
          this.messageService.presentToast('Something Went Wrong', 'danger');
        }
        
      }
    );
  }

  async verifyOTP() {
 
    
    if (!this.otp) {
      this.messageService.presentToast('Please Enter Otp', 'danger');
      
    } else {
      const data={
        otp:this.otp
      }
        this.apiService.verifyOtp(data).subscribe((res:any)=>{
          this.router.navigate([`/reset-password/${this.otp}`])
        }),(err=>{
          if(err.error.error==='Invalid OTP.'){
            this.messageService.presentToast('Invalid Otp', 'danger');
          }
          this.messageService.presentToast('Some thing went Wrong try again ', 'danger');
        })
      
    }
  }
  onOtpChange(otp: string) {
    this.otp = otp;
  }
 
}