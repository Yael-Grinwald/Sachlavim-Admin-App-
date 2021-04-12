import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operator } from 'src/app/classes/operator';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';

@Component({
  selector: 'app-operator-menu',
  templateUrl: './operator-menu.component.html',
  styleUrls: ['./operator-menu.component.css']
})
export class OperatorMenuComponent implements OnInit {
  id: string;
  operator: Operator;
  idOperator:number;
  
  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainServiceService) {
    this.operator = this.mainService.operatorForDetails;
    this.router.navigate(['./operator-details'], { relativeTo: this.route });
    this.idOperator = parseInt(this.route.snapshot.paramMap.get('id'));

  }

  ngOnInit() {
let t=100;
  }
}
