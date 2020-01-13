import { Component, OnInit, Input } from '@angular/core';

import {AngularFireDatabase,AngularFireList}from '@angular/fire/database';
import { AngularFireStorage, AngularFireStorageReference, createStorageRef } from '@angular/fire/storage';
import { Observable, config } from 'rxjs'
import * as firebase from 'firebase';
import {ImageService} from '../image.service';
import { ActivatedRoute,Router } from '@angular/router'
import { visitValue } from '@angular/compiler/src/util';
import { toUnicode } from 'punycode';
import { Update} from '../update'
import { DataSnapshot, DatabaseReference } from '@angular/fire/database/interfaces';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})

export class ComplaintComponent implements OnInit {

  @Input() update: Update;
  message:any;
  message1:any;
  customers:any;
  images: Observable<any[]>; downloadURL: Observable<string>;
  userData:any=[
    {name:"Hiba", addr:"Pie",image:"boo"},
    {name:"Hba", addr:"Pie",image:"boo"},
    {name:"Surya", addr:"Pie",image:"boo"}
  ];


  Datas:any[];
Status:any;

dbs:DatabaseReference;
  imageDetailList: any[];
  constructor(private db:AngularFireDatabase,private storage: AngularFireStorage, 
    private activeroute: ActivatedRoute,private router: Router,private data:ImageService){
    db.list('/Datas/').valueChanges().subscribe(Datas => {
      this.Datas = Datas;
     
      console.log(this.Datas,);

      
     
  });
  

    
    

  
  }
getUserss(){
  this.db.list('Datas').valueChanges().subscribe(Datas => {
    console.log("Datas:",Datas);

   
});
 
return this.db.list("Datas");
}

 

  ngOnInit() {
    this.getCustomersList();
    this.data.currentMessage.subscribe(message=>this.message = message);
    this.data.currentMessage1.subscribe(message1=>this.message1 = message1);
    
  }

  getUser(data,data1): void{
    console.log(data);
    this.data.changeMessgae(data,data1);
    this.router.navigate(['view']);
   
  }

  updateActive(statuss:string) {
      this.Status = this.db.list('Datas/',
    
      ref => ref.orderByChild('complaint').equalTo(statuss));
    
      this.Status.valueChanges().subscribe(
    
        (datas) => { console.log("datas", datas);
        }
      );
      //this.Status.update({"status":"F"})
      
      this.db.list('/Datas/-LyL2uh2HZC5CJwBTL5t/').valueChanges().subscribe(Datas => {
        this.Datas = Datas;
       
        console.log(this.Datas);
  
        
       
    });
     
    }

    updatu(id) {
      
      this.db.object('/Datas/'+id)
        .update({ status:"Complaint Accepted"});    
}
deleteu(id,url) {
  this.db.object('/Datas/'+id)
    .remove();  
    this.storage.storage.refFromURL(url).delete();
    }  

deleteCustomer() {
  this.data
    .deleteCr(this.update.key)
    .catch(err => console.log(err));

}

getCustomersList() {
  this.data.getCustomersList().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(customers => {
    this.customers = customers;
    console.log(customers)
  });
}
}
 
