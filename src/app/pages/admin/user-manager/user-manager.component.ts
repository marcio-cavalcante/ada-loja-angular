import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html'
})
export class UserManagerComponent implements OnInit {
  users: any[] = [];
  newUser = {
    email: '',
    username: '',
    password: '',
    name: { firstname: '', lastname: '' },
    address: { city: '', street: '', number: 0, zipcode: '', geolocation: { lat: '', long: '' } },
    phone: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe(() => this.loadUsers());
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
