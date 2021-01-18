import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from 'src/app/Classes/program';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';

@Component({
  selector: 'app-afternoon-details-menu',
  templateUrl: './afternoon-details-menu.component.html',
  styleUrls: ['./afternoon-details-menu.component.css']
})
export class AfternoonDetailsMenuComponent implements OnInit {

  afternoon:Program;
  idProgram:number;

  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainServiceService) {
    this.afternoon = this.mainService.programForDetails;
    this.router.navigate(['./afternoon-details'], { relativeTo: this.route });
    this.idProgram = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
  }

}
