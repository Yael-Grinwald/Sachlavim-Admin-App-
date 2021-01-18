import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Setting } from 'src/app/Classes/setting';
import { MainServiceService } from 'src/app/services/MainService/main-service.service';

@Component({
  selector: 'app-settings-details-menu',
  templateUrl: './settings-details-menu.component.html',
  styleUrls: ['./settings-details-menu.component.css']
})
export class SettingsDetailsMenuComponent implements OnInit {
  idSetting: number;
  setting: Setting;

  constructor(private router: Router,private route: ActivatedRoute, private mainService: MainServiceService) {
    this.setting = this.mainService.settingForDetails;
    this.router.navigate(['./settings-details'], { relativeTo: this.route });
    this.idSetting = parseInt(this.route.snapshot.paramMap.get('id'));

  }
  ngOnInit() {

  }
}
