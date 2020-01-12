import { Component } from "@angular/core";
import { ExpenseRow } from "./components/expenserow.ts";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Tino";
  public expenserows: any[];
  constructor() {
    this.expenserows = [new ExpenseRow("MMM"), new ExpenseRow("VVV")];
  }
}
