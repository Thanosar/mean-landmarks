import {Component, HostListener, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public showMenu: boolean = false;
  public loggedIn: boolean = false;

  constructor(public renderer: Renderer2) { }

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

  Login() {

  }

}
