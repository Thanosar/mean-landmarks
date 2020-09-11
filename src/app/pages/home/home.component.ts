import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LandmarkService} from '../../core/services/landmark.service';
import {IJsonResponse} from '../../core/interfaces/IJsonResponse';
import {ILandMark} from 'src/app/core/interfaces/ΙLandMark';
import {AuthService} from '../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';

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



  constructor(public landMarkService: LandmarkService,
              private toastr: ToastrService,
              public authService: AuthService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._getLandMarks();
  }

  private async _getLandMarks() {
    await this.landMarkService.retrieve().subscribe((res: IJsonResponse) => {
      this.loading = false;
      if (!res.success) {
        return this.toastr.error("Something has gone wrong")
      }
      this.landmarks = res.data;
    }, () => this.loading = false);
  }


}
