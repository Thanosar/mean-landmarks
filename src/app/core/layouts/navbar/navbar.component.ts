import {Component, HostListener, OnInit, Renderer2, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../services/auth.service';
import {IJsonResponse} from '../../interfaces/IJsonResponse';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public showMenu: boolean = false;
  public loginError: string;
  public modalRef: BsModalRef;

  public username: string;
  public password: string;

  constructor(public renderer: Renderer2,
              public authService: AuthService,
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  private _resetFields(): void {
    this.username = "";
    this.password = "";
  }

  public toggleMenu(state: boolean = null): void {
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
      this.toggleMenu();
    }
  }

  public openLoginModal(template: TemplateRef<any>, sidenav: boolean = false): void {
    if (sidenav) {
      this.toggleMenu();
    }
    this.modalRef = this.modalService.show(template);
  }

  public async onLogin() {
    await this.authService.login(this.username, this.password).subscribe((res: IJsonResponse) => {
      console.log(res);
      if (!res.success) {
        this.loginError = res.message.message || null;
        return;
      }
      this._resetFields();
      this.modalRef.hide();
      window.localStorage.setItem("token", res.data.sessionToken);
      this.authService.user = res.data;
      this.toastr.success(`Hello, ${this.authService.user.username || "user"}`, "Login");
    });
  }

  public onLogout() {
    this.authService.user = null;
    window.localStorage.removeItem("token");
    this.toastr.success("Success", "Logout");

    // const token = window.localStorage.getItem("token");
    // this.authService.logout(token).subscribe((res: IJsonResponse) => {
    //   console.log(res);
    //   if (!res.success) {
    //     return this.toastr.error("Something has gone wrong", "Logout");
    //   }
    //   this.authService.user = null;
    //   window.localStorage.removeItem("token");
    //   this.toastr.success("Success", "Logout");
    // });
  }

}
