import { Component,Optional,Input } from '@angular/core';
@Component({
  selector: 'expenserow',
  templateUrl: './expenserow.html',
  styleUrls: [ './expenserow.css' ]
})
export class ExpenseRow  {

  @Input() value:ExpenseRow;
  public date: Date;
  public seller:string;
  public amount:number;
  public vatamount:number;
  public vat:number;

  public attachment:string;
  constructor(){
  }

}
