import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from 'src/app/Classes/program';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';

@Component({
  selector: 'app-program-details-menu',
  templateUrl: './program-details-menu.component.html',
  styleUrls: ['./program-details-menu.component.css']
})
export class ProgramDetailsMenuComponent implements OnInit {

  program:Program;
  idProgram:number;

  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainServiceService) {
    this.program = this.mainService.programForDetails;
    this.router.navigate(['./programs-details'], { relativeTo: this.route });
    this.idProgram = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
  }

}
