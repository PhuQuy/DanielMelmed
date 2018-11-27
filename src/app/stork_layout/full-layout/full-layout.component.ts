import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
   styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent {
  Name: string;
  userid: string;
  constructor(){
   
    this.userid = localStorage.getItem('userid')
    this.Name = localStorage.getItem('Name')
  }
 }
