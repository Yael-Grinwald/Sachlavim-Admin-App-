import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program-schedule',
  templateUrl: './program-schedule.component.html',
  styleUrls: ['./program-schedule.component.css']
})
export class ProgramScheduleComponent implements OnInit {
  idProgram:number;
  constructor( private route: ActivatedRoute) { 
    this.idProgram = parseInt(this.route.snapshot.paramMap.get('id'));    
  }

  ngOnInit() {
  }

}
