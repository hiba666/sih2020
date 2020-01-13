import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { Update } from './update';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private dbPath = '/Datas';
Ref: AngularFireList<Update> = null;
private messageSource=new BehaviorSubject<any>("default message");
currentMessage=this.messageSource.asObservable();
private messageSource1=new BehaviorSubject<any>("default message");
currentMessage1=this.messageSource1.asObservable();
constructor(private db: AngularFireDatabase){
  this.Ref = db.list('/Datas');}
changeMessgae(message:any,message1:any){
  this.messageSource.next(message);
  this.messageSource1.next(message1);
}

updateC(key: string, value: any): Promise<void> {
  return this.Ref.update(key, value);
}
getCustomersList(): AngularFireList<Update> {
  return this.Ref;
}
deleteCr(key: string): Promise<void> {
  return this.Ref.remove(key);
}
}

