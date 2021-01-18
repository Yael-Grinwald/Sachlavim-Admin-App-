import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings-schedule',
  templateUrl: './settings-schedule.component.html',
  styleUrls: ['./settings-schedule.component.css']
})
export class SettingsScheduleComponent implements OnInit {

  idSetting:number;

  constructor( private route: ActivatedRoute) { 
    this.idSetting = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
  }

}
