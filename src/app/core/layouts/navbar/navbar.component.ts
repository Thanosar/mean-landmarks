import {Component, HostListener, OnInit, Renderer2, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../services/auth.service';
import {IJsonResponse} from '../../interfaces/IJsonResponse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public showMenu: boolean = false;
  public loggedIn: boolean = false;
  public modalRef: BsModalRef;

  public username: string;
  public password: string;

  constructor(public renderer: Renderer2,
              public authService: AuthService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  public toggleMenu(state: boolean = null) {
    if (state !== null) {
      this.showMenu = state;
    } else {
      this.showMenu = !this.showMenu;
    }
    if (this.showMenu) {
      if (window.innerWidth <= 991) {
        this.renderer.setStyle(document.body, "overflow", "hidden");
      }
    } else {
      this.renderer.removeStyle(document.body, "overflow");
    }
  }

  @HostListener("click", ["$event", "$event.target"])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (targetElement.classList.contains("forceShow")) {
      console.log('e');
      this.toggleMenu();
    }
  }

  public openLoginModal(template: TemplateRef<any>, sidenav: boolean = false) {
    if (sidenav) {
      this.toggleMenu();
    }
    this.modalRef = this.modalService.show(template);
  }

  public async onLogin() {
    await this.authService.login(this.username, this.password).subscribe((res: IJsonResponse) => {
      console.log(res);
      if (!res.success) {
        console.log()
      }

      window.localStorage.setItem("token", res.data.sessionToken);
    });
  }

}
