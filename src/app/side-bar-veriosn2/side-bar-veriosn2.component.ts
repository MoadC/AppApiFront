import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-veriosn2',
  templateUrl: './side-bar-veriosn2.component.html',
  styleUrls: ['./side-bar-veriosn2.component.css']
})
export class SideBarVeriosn2Component implements OnInit {
  events: string[] = [];
  opened: boolean | undefined;

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  constructor() { }

  ngOnInit(): void {
  }


}
