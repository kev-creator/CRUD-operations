import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Users } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';

const ELEMENT_DATA: Users[] = [];

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  listUsers: Users[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'gender',
    'status',
    'actions',
  ];
  dataSource = ELEMENT_DATA;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.listUsers().subscribe((data) => {
      this.listUsers = data;
    });
  }
}
