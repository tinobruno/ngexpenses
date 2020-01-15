import { Component } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import { ExpenseRow } from "./components/expenserow";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Observable} from "rxjs";
import {finalize, map} from "rxjs/operators";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Tino";
  public expenserows: any[];
  dbexpenserows: Observable<any[]>;
  dbexpenserowsRef: AngularFireList<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) {
    this.dbexpenserowsRef = db.list('expenses');
    this.dbexpenserows = this.dbexpenserowsRef.snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({ key: c.payload.key  , ...c.payload.val() }))
        )
    );
  }

  addItem(_object:any) {
    this.dbexpenserowsRef.push(_object);
  }
  updateItem(key: string, _object:any) {
    this.dbexpenserowsRef.update(key, _object);
  }
  deleteItem(key: string) {
    this.dbexpenserowsRef.remove(key);
  }
  deleteEverything() {
    this.dbexpenserowsRef.remove();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = '/upl/'+event.srcElement.files[0].name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
        .subscribe()
  }
}