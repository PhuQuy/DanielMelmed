import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration-header',
  templateUrl: './configuration-header.component.html',
  styleUrls: ['./configuration-header.component.scss']
})
export class ConfigurationHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
onNavigate(){
   window.open('/#/book-massage/appointment',"_blank", 'scrollbars=yes, resizable=yes, width=1100%, height=700%')
}                             
                                    
}
