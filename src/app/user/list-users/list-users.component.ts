import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/models/users.model';
import { ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  listUsers: Users[] = [];
  showData: boolean = false;
  pageEvent: PageEvent;

  total: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageChange = new EventEmitter<PageEvent>();
  pageIndex = 0;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'gender',
    'status',
    'actions',
  ];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();

    this.total = this.listUsers.length;

    this.userService.listUsers().subscribe((response) => {
      if (response && response.length) {
        this.showData = true;
        this.dataSource.data = response;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
    this.dataSource.sort = this.sort; // For sort
  }

  onPageChange(e: PageEvent): void {
    this.pageSize = e.pageSize;
    this.pageChange.emit(e);
  }
}
