import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { UsersActions } from '../actions/user.actions';
import { Users } from '../model/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder,
    public actions:  UsersActions,
    public dialogRef: MatDialogRef<AddUserComponent>,) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl('', {
        // validators: [Validators.required, ],
        // updateOn: 'blur'
      }),
      lastName: new FormControl('', {
        // validators: [Validators.required, ],
        // updateOn: 'blur'
      }),
      email: new FormControl('', {
        // validators: [Validators.required, Validators.email],
        // updateOn: 'blur'
      }),
      profession: new FormControl('')
    });
  }

  createUser() {
    // const newUser = Object.assign({}, this.activeUser, f.value);
    // this.actions.save(this.userForm.value);
    this.dialogRef.close({user:this.userForm.value});
  }
  
  
}
