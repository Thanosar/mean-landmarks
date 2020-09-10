import {Component, OnInit, TemplateRef} from '@angular/core';
import {LandmarkService} from '../../core/services/landmark.service';
import {IJsonResponse} from '../../core/interfaces/IJsonResponse';
import {ILandMark} from 'src/app/core/interfaces/ΙLandMark';
import {AuthService} from '../../core/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LandmarkService]
})
export class HomeComponent implements OnInit {

  public landmarks: ILandMark[] = [];
  public loading: boolean = true;

  public selectedPhoto: string = '';


  constructor(public landMarkService: LandmarkService, public authService: AuthService) {
  }

  ngOnInit() {
    this._getLandMarks();
  }

  private async _getLandMarks() {
    await this.landMarkService.retrieve().subscribe((res: IJsonResponse) => {
      this.loading = false;
      if (!res.success) {
        return console.log('Error');
      }
      this.landmarks = res.data;
    }, () => this.loading = false);
  }


}
