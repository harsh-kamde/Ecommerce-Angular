import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { signinData } from '../../../services/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}


  form = new FormGroup({
    email: new FormControl(" ",{validators:[Validators.email,Validators.required]}),
    password: new FormControl('',{validators:[Validators.minLength(6),Validators.required]})
  },{validators:[]});

  error = "";
  showPassword = signal(false);

  handleLogin(): void {
    this.authService.login();
    this.router.navigate(['/']);
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  handleSubmit(){
    this.error = "";
    const user:signinData = this.form.value as signinData
    const res = this.authService.signin(user);
    if(res === 401){
      this.error = "Incorrect email or password"
    }else if(res === 404){
      this.error = "No user with this email found. Please check you email or create an account."
    }else{
      this.error = "";
      this.router.navigate(["/"]);
    }
  }

}
