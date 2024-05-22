import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AsyncPipe, NgFor, NgIf, TitleCasePipe, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    UpperCasePipe,
    TitleCasePipe,
    NgFor
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  authServices = inject(AuthService);
  accountDetail$ = this.authServices.getDetail();
}
