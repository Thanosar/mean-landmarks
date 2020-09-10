import {Component, OnInit} from '@angular/core';
import {ILandMark} from '../../../core/interfaces/ΙLandMark';
import {IJsonResponse} from '../../../core/interfaces/IJsonResponse';
import {LandmarkService} from '../../../core/services/landmark.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-landmark-edit',
  templateUrl: './landmark-edit.component.html',
  styleUrls: ['./landmark-edit.component.scss']
})
export class LandmarkEditComponent implements OnInit {

  public files: File[] = [];
  public defaultImage = 'https://www.telegraph.co.uk/content/dam/Travel/2019/September/dubai-(getty).jpg';
  public image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  public headerPhoto: string = 'https://www.telegraph.co.uk/content/dam/Travel/2019/September/dubai-(getty).jpg';
  public loading: boolean = true;
  public landmarkId: string = "";
  public landMark: ILandMark;
  public form: FormGroup;

  public sizeWarning: boolean = false;
  public sizeText: string = "";

  constructor(public landMarkService: LandmarkService,
              private _route: ActivatedRoute,
              private toastr: ToastrService,
              private _fb: FormBuilder) { }

  ngOnInit(): void {

    const routeSnapshot = this._route.snapshot;
    const params = routeSnapshot.params;
    if (params.id) {
      this.landmarkId = params.id;
      this._getLandMarkById(params.id);
    }
  }

  private _initForm(data: ILandMark): FormGroup {
    return this.form = this._fb.group({
      objectId: [data.objectId || null],
      order: [data.order || null],
      title: [data.title || null, Validators.required],
      short_info: [data.short_info || null, Validators.required],
      description: [data.description || null, Validators.required],
      url: [data.url || null, Validators.required],
      longitude: [data.location.longitude || null, Validators.required],
      latitude: [data.location.latitude || null, Validators.required],
    });
  }

  private async _getLandMarkById(id: string) {
    await this.landMarkService.findById(id).subscribe((res: IJsonResponse) => {
      this.loading = false;
      if (!res.success) {
        return console.log('Landmark not found');
      }
      this.landMark = res.data;
      this._initForm(res.data);
      if (this.landMark.photo && this.landMark.photo.url) {
        this.headerPhoto = this.landMark.photo.url;
      }
    }, (error => {
      this.toastr.error(error.message);
      this.loading = false;
    }));
  }

  public async onUpdate(form: ILandMark & {longitude: number, latitude: number}) {
    form.location = {
      longitude: form.longitude,
      latitude: form.latitude
    };

    await this.landMarkService.update(form.objectId, form).subscribe((res: IJsonResponse) => {
      if (!res.success) {
        return this.toastr.error(res.message || "Update failed");
      }
      this.toastr.success(res.message || "Update successfully");
    }, (err) => {
      this.toastr.error(err.error || "Update request failed");
    });
  }



  public onSelect(event) {
    this.sizeWarning = false;
    this.sizeText = "";

    if (event.rejectedFiles.length > 0) {
      event.rejectedFiles.forEach(file => {
        if (file.reason === "size") {
          this.sizeWarning = true;
          this.sizeText = `The size of the photo is ${file.size} (bytes), but the limit is 5MB`;
          this.toastr.error("The system should not allow photos larger than 5MB to be uploaded");
        }
      })
    }
    if (this.files.length >= 1) {
      return;
    }
    this.files.push(...event.addedFiles);
  }

  public onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public async onUploadImage() {
    const formData = new FormData();
    formData.append('image', this.files[0]);
    await this.landMarkService.uploadImage(this.landmarkId, formData).subscribe((res: IJsonResponse) => {
      if (!res.success) {
        this.toastr.error(res.message);
        return;
      }
      this.toastr.success(res.message);
    }, (err) => this.toastr.error(err.message || "Error"))
  }

}
