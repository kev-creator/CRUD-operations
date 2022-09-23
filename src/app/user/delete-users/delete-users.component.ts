import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss'],
})
export class DeleteUsersComponent implements OnInit {
  userId: string = '';
  deleteUser: string = '';
  userDetails: any;

  constructor(
    private ativatedRoute: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.ativatedRoute.params.subscribe((data) => {
      this.userId = data['id'];
    });

    if (this.userId) {
      this.userService.deleteUser(this.userId).subscribe({
        next: (data = this.userDetails.value) => {
          this._snackBar.open('User deleted Succesfully');
          (err: any) => {
            this._snackBar.open('Unable to delete user');
          };
        },
      });
    }
  }
}
