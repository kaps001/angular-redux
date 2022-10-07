import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { UsersActions } from '../actions/user.actions';
import { Users } from '../model/user';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil, take } from 'rxjs/operators';
import { IndexDBService } from '../index-db.service';
import Dexie, { Table } from 'dexie';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  list: any[] = [];
  isTab = false;
  searchUsers: any = [];
  private ngUnsubscribe = new Subject<void>();
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'profession'];
  dataSource = new MatTableDataSource<Users>([]);
  @select('users') public users$: Observable<Users[]>;
  db: any = new Dexie('userDB');
  item: any = {};
  userSearch = new Subject<string>();
  public userSearchValue: string;
  constructor(public dialog: MatDialog,
    public actions: UsersActions,
    public indexDB: IndexDBService) {
    this.userSearch.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => {
      this.searchUser(value);
    });;
    let user = {
      id: 2,
      firstName: 'Anre',
      lastName: 'S',
      email: 'anre.s@appwrk.com',
      profession: 'SE'
    }
    this.db.version(1).stores({
      users: '++id, firstName, lastName, email, profession'
    });
  }

  ngOnInit(): void {
    this.users$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((resp: Users[]) => {
      console.log(resp)
      this.dataSource.data = resp;
    })
    this.populateState();
  }

  async openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result != undefined && result.user) {
        this.db.users.add(result.user);
        this.populateState()
      }
    });
  }

  async openFirstNameDialog(item: any) {
    this.isTab = true;
    this.item = item;
  }

  populateState() {
    let users = this.db.users.toArray();
    users.then(response => {
      console.log(response)
      this.list = [...response];
      this.searchUsers = [...response];
    });
  }

  searchUser(value) {
    if (value) {
      console.log(value)
      const searchUser = value.toLowerCase();
      this.searchUsers = this.list.filter((item: any) =>
        item.firstName.toLowerCase().includes(searchUser)
      );
    }
    else {
      this.searchUsers = this.list
    }
  }

  closeFirstNameDialog() {
    this.isTab = false;
  }
}

