import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmassage-header',
  templateUrl: './bookmassage-header.component.html',
  styleUrls: ['./bookmassage-header.component.scss']
})
export class BookMassageHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onNavigate() {
    // window.open('/#/book-massage/appointment',"_blank", 'scrollbars=yes, resizable=yes, width=1100%, height=700%')
  }

}
