import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
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
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.signupForm.invalid) {
      this.messageService.presentToast('Please fill all the field', 'danger');
    }
    const data = {
      new_password: this.signupForm.value.new_password,
      confirm_password: this.signupForm.value.confirm_password,
      otp: '123456'
    }
    this.apiService.resetPassword(data).subscribe(
      res => {
        this.signupForm.reset();
        this.router.navigate(['/login']);
      },
      err => {
        this.messageService.presentToast('Something Went Wrong', 'danger');
      }
    );
  }
}