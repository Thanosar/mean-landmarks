import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  @HostBinding('class.fixed-bottom') fixed: boolean = false;
  @ViewChild('footer', {static: true}) footer: ElementRef;


  constructor(

  ) {
  }

  ngOnInit() {

  }


}
