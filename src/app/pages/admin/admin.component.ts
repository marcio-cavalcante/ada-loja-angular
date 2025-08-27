import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor() {}

  ngOnInit(): void {
    console.log('AdminComponent foi inicializado!');
  }
}
