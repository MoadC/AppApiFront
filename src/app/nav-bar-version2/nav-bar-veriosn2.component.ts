import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-nav-bar-veriosn2',
  templateUrl: './nav-bar-veriosn2.component.html',
  styleUrls: ['./nav-bar-veriosn2.component.css']
})
export class NavBarVersion2Component implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
     this.dialog.open(DialogComponent,{
       width : '50%',
       height : '80%'
     });
  }
}
