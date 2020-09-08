import { Component, OnInit } from '@angular/core';
import {LandmarkService} from '../../../core/services/landmark.service';
import {ActivatedRoute} from '@angular/router';
import {IJsonResponse} from '../../../core/interfaces/IJsonResponse';
import {ILandMark} from '../../../core/interfaces/ΙLandMark';

@Component({
  selector: 'app-landmark-view',
  templateUrl: './landmark-view.component.html',
  styleUrls: ['./landmark-view.component.scss']
})
export class LandmarkViewComponent implements OnInit {

  public landMark: ILandMark;
  public loading: boolean = true;

  constructor(public landMarkService: LandmarkService,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeSnapshot = this._route.snapshot;
    const params = routeSnapshot.params;
    if (params.id) {
      this._getLandMarkById(params.id );

    }
  }

  private async _getLandMarkById(id: string) {
    await this.landMarkService.findById(id).subscribe((res: IJsonResponse) => {
      if (!res.success) {
        return console.log("Landmark not found");
      }
      this.landMark = res.data;
      this.loading = false;
    });
  }

}
