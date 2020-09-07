import {Component, OnInit} from '@angular/core';
import {LandmarkService} from '../../core/services/landmark.service';
import {IJsonResponse} from '../../core/interfaces/IJsonResponse';
import { ILandMark } from 'src/app/core/interfaces/ΙLandMark';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LandmarkService]
})
export class HomeComponent implements OnInit {

  public landmarks: ILandMark[] = [];

  constructor(public landMarkService: LandmarkService) {
  }

  ngOnInit() {
    this._getLandMarks();
  }

  private async _getLandMarks() {
    await this.landMarkService.retrieve().subscribe((res: IJsonResponse) => {
     if (!res.success) {
       console.log("Error");
     }
     this.landmarks = res.data;
    });
  }

}
