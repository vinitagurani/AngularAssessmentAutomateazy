import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Updated form control names: 'username' instead of 'email'
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Changed from 'email' to 'username'
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://dev-cc.automateazy.com/api/v1/users/auth', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            // Example: Store token in local storage
           
            if (response.token !== null) {
              localStorage.setItem('authToken', response.result.token);
              // Redirect to the leads page
              this.router.navigate(['/leads']);
          
              console.log('Stored token:', localStorage.getItem('authToken'));
            } else {
              // Handle cases where the token is not provided
              this.loginError = 'Login failed. No token received.';
            }
          },
          error: (error) => {
            // Fallback error message
            this.loginError = error?.error?.message || 'Invalid username or password. Please try again.';
          }
        });
    }
  }
}
