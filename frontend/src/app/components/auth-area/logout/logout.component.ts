import { NotifyService } from './../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router) { }

    ngOnInit(): void {
        try {
            this.myAuthService.logout();
            this.notify.success("You are logged-out");
            this.myRouter.navigateByUrl("/home");
        }
        catch (err) {
            this.notify.error(err);
        }

    }
}
