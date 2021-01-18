import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-afternoon-schedule',
  templateUrl: './afternoon-schedule.component.html',
  styleUrls: ['./afternoon-schedule.component.css']
})
export class AfternoonScheduleComponent implements OnInit {

  idProgram:number;
  constructor( private route: ActivatedRoute) { 
    this.idProgram = parseInt(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit() {
  }

}
