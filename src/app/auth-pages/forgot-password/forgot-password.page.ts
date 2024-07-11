import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  signupForm: FormGroup;
  id: string;
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
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onSubmit() {
    if (this.signupForm.invalid){
      this.messageService.presentToast('Please Enter Email', 'danger');
    }
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

  
}