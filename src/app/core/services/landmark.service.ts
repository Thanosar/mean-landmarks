import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILandMark} from '../interfaces/ΙLandMark';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {IJsonResponse} from '../interfaces/IJsonResponse';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  readonly _url: string = environment.serverUrl + 'landmark';

  constructor(public httpClient: HttpClient, private toastr: ToastrService) {
  }

  public retrieve(): Observable<any> {
    try {
      return this.httpClient.get(this._url);
    } catch (e) {
      this.toastr.error("Something has gone wrong")
    }
  }

  public findById(id: string): Observable<any> {
    try {
     return this.httpClient.get(this._url + "/" + id);
    } catch (e) {
      this.toastr.error("Something has gone wrong")
    }
  }

  public update(id: string, data: ILandMark): Observable<any> {
    try {
      return this.httpClient.put(this._url + "/update/" + id, data);
    } catch (e) {
      this.toastr.error("Something has gone wrong")
    }
  }

  public uploadImage(id: string, file: any): Observable<any> {
    try {
      return this.httpClient.put(this._url + "/upload/image/" + id, file);
    } catch (e) {
      this.toastr.error("Something has gone wrong")
    }
  }
}
