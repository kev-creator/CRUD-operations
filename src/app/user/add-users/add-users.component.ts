import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit {
  addUserForm: FormGroup = new FormGroup({});
  userObj: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
      status: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  createUser() {
    this.userService.addUsers(this.addUserForm.value).subscribe(
      (_data = this.userObj) => {
        this._snackBar.open('User Created Succesfully');
      },
      (_err) => {
        this._snackBar.open('Unable to create user');
      }
    );
  }
}
