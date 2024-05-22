import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {ResetPasswordRequest} from "../../interfaces/reset-password-request";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPassword = {} as ResetPasswordRequest;
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  matSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.resetPassword.email = params["email"];
      this.resetPassword.token = params["token"];
    })
  }

  resetPasswordHandle() {
    this.authService.resetPassword(this.resetPassword).subscribe({
      next: (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 5000,
        })
      }
    })
  }
}
