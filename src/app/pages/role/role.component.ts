import {Component, inject} from '@angular/core';
import {RoleFormComponent} from "../../components/role-form/role-form.component";
import {RoleService} from "../../services/role.service";
import {RoleCreateRequest} from "../../interfaces/role-create-request";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {RoleListComponent} from "../../components/role-list/role-list.component";
import {AsyncPipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {AuthService} from "../../services/auth.service";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    RoleFormComponent,
    MatSnackBarModule,
    MatInputModule,
    RoleListComponent,
    AsyncPipe,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  roleService = inject(RoleService);
  authService = inject(AuthService);
  errorMessage = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;
  roles$ = this.roleService.getRoles();
  users$ = this.authService.getAllUsers();
  selectedUser: string = '';
  matSnackBar = inject(MatSnackBar);
  selectedRole: string = '';

  createRole(role: RoleCreateRequest) {
    this.roleService.createRoles(role).subscribe({
      next: (response: { message: string }) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open('Role Created Successfully', 'Ok', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.errorMessage = error.error;
        }
      },
    });
  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open('Role Deleted Successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  assignRole() {
    this.roleService.assignRole(this.selectedUser, this.selectedRole).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open('Role Assign Successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.error, 'Close', {
          duration: 3000,
        });
      }
    })
  }
}
