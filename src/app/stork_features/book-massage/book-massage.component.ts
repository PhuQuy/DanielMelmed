import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
@Component({
  selector: 'app-book-massage',
  templateUrl: './book-massage.component.html',
  styleUrls: ['./book-massage.component.scss']
})
export class BookMassageComponent implements OnInit {
   position = 'after';
  constructor(private route:Router) { }

  ngOnInit() { }
   
//  frequency(){
//    this.route.navigateByUrl('/#/book-massage/frequency');
//  }
}
