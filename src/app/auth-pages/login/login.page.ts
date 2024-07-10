import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupForm: FormGroup;
  isTypePassword: boolean = true;
  fcm_token: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    
  ) {
    this.initForm();
  }

  ngOnInit() {
  
    
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
   
    if (this.signupForm.invalid) return;
    
    const data = {
      fcm_token: this.fcm_token,
      password: this.signupForm.value.password,
      email: this.signupForm.value.email,
    };
    this.apiService.login(data).subscribe(
      res => {
        this.messageService.presentToast('Login Successful', 'success');
        localStorage.setItem("user_data", JSON.stringify(res));
        this.router.navigate(['/apptabs/tabs/home']);
        this.signupForm.reset();
      },
      err => {
        this.messageService.presentToast("Invalid Email and password", 'danger');
      }
    );
  }
  
}
