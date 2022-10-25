import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent implements OnInit {
  editUserForm: FormGroup = new FormGroup({});

  userObj: string = '';
  userId: any;
  userDetails: any;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.activatedRouter.params.subscribe((data) => {
      this.userId = data['id'];
    });

    if (this.userId !== '') {
      this.userService
        .viewUsers(this.userId)

        .subscribe({
          next: (data) => {
            this.userDetails = data;
            this.editUserForm = this.formBuilder.group({
              name: new FormControl(this.userDetails?.name, [
                Validators.required,
                Validators.minLength(3),
              ]),
              email: new FormControl(this.userDetails?.email, [
                Validators.required,
                Validators.email,
              ]),
            });
            this.isLoading = true;
          },
        });
    }
  }

  updateUserForm(): void {
    this.isLoading = true;
    this.userService
      .updateUsers(this.userDetails.id, this.editUserForm.value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (_data = this.userObj) => {
          this._snackBar.open('User Updated Succesfully');
          (_err: any) => {
            this._snackBar.open('Unable to Update user');
          };
        },
      });
  }
}
