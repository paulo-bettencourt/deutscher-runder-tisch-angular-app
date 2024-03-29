import { AfterViewInit, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MainPageComponent } from '../../layout/main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './otp.component.html',
})
export class OtpComponent implements AfterViewInit {
  form = this.fb.group({
    otp: ['', Validators.required],
  });
  data!: any;
  isLoading = false;
  errorMessageBoolean = false;
  errorMessageText = '';
  buttonDisabled!: HTMLInputElement;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private component: MainPageComponent
  ) {}

  submit() {
    this.isLoading = true;
    this.buttonDisabled.disabled = true;
    this.errorMessageBoolean = false;
    const otp = this.form.controls['otp'].value;
    if (this.form.value) {
      this.data = {
        otp: otp,
      };
      this.authService.otp(this.data).subscribe({
        next: (data: any) => {
          this.component.isLogged = true;
          localStorage.setItem('jwtBringGlobalToken', data.token);
          this.router.navigate(['classroom']);
          this.isLoading = false;
        },
        error: (err: any) => {
          console.log('ERROR->', err);
          this.errorMessageBoolean = true;
          this.errorMessageText = err.error.message;
          this.isLoading = false;
          this.buttonDisabled.disabled = false;
        },
      });
    }
  }

  ngAfterViewInit(): void {
    this.buttonDisabled = document.getElementById(
      'submitOTP'
    ) as HTMLInputElement;
  }
}
