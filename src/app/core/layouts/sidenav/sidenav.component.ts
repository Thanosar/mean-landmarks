import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {

    @Input() opened: boolean;
    @Input() hasClose: boolean = false;
    @Input() width: string = "75%";
    @Input() side: "right"|"left" = "left";

    @Output() sidebarClose = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    public close(): void {
        this.sidebarClose.emit(false);
    }

}
