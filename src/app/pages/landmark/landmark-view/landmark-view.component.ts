import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LandmarkService} from '../../../core/services/landmark.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IJsonResponse} from '../../../core/interfaces/IJsonResponse';
import {ILandMark} from '../../../core/interfaces/ΙLandMark';

@Component({
  selector: 'app-landmark-view',
  templateUrl: './landmark-view.component.html',
  styleUrls: ['./landmark-view.component.scss']
})
export class LandmarkViewComponent implements OnInit {



  public headerPhoto: string = 'https://www.telegraph.co.uk/content/dam/Travel/2019/September/dubai-(getty).jpg';
  public defaultImage = 'https://www.telegraph.co.uk/content/dam/Travel/2019/September/dubai-(getty).jpg';
  public image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';

  public landmark: ILandMark;
  public loading: boolean = true;

  constructor(public landMarkService: LandmarkService,
              private _route: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit(): void {

    const routeSnapshot = this._route.snapshot;
    const params = routeSnapshot.params;
    if (params.id) {
      this._getLandMarkById(params.id);

    }
  }

  private async _getLandMarkById(id: string) {
    await this.landMarkService.findById(id).subscribe((res: IJsonResponse) => {
      this.loading = false;
      if (!res.success) {
        return console.log('Landmark not found');
      }
      this.landmark = res.data;
      if (this.landmark.photo && this.landmark.photo.url) {
        this.headerPhoto = this.landmark.photo.url;
      }
    }, () => this.loading = false);
  }

  public navigateToUrl(url: string) {
    if (!url) {
      return console.log("Sorry, something has gone wrong!");
    }
    this._router.navigate([]).then(() => {
      window.open(url, '_blank');
    });
  }

}
