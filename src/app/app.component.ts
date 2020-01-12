import { Component } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import { ExpenseRow } from "./components/expenserow";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Tino";
  public expenserows: any[];
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private storage: AngularFireStorage) {
    this.expenserows = [new ExpenseRow("MMM"), new ExpenseRow("VVV")];
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
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
