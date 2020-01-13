import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ImageService} from '../image.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  message:any;
  message1:any;
  constructor(private data:ImageService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message=>this.message = message)
    this.data.currentMessage1.subscribe(message1=>this.message1 = message1);
  }

}
