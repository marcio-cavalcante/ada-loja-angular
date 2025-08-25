import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
})
export class UserManagerComponent implements OnInit {
  users: any[] = [];
  newUser = {
    email: '',
    username: '',
    password: '',
    name: { firstname: '', lastname: '' },
    address: {
      city: '',
      street: '',
      number: 0,
      zipcode: '',
      geolocation: { lat: '', long: '' },
    },
    phone: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe(() => {
      // Adição local
      const newUserList = { ...this.newUser, id: this.generateLocalId() };
      this.users.push(newUserList);

      // Limpa o formulário
      this.newUser = {
        email: '',
        username: '',
        password: '',
        name: { firstname: '', lastname: '' },
        address: {
          city: '',
          street: '',
          number: 0,
          zipcode: '',
          geolocation: { lat: '', long: '' },
        },
        phone: '',
      };
    });
  }

  generateLocalId(): number {
    return this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1;
  }

  deleteUser(id: number) {
    console.log('Deletando usuário com ID:', id);
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }
}
