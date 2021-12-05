import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public cities: string[] = ["Tel-Aviv", "Haifa", "Jerusalem", "Eilat", "Ashdod", "Beer sheva", "Tiberias", "Rishon lezion"];
    public user = new UserModel();
    public verified: boolean = false;
    public passConfirm: string;

    constructor(
        private myAuthService: AuthService,
        private myRouter: Router,
        private notify: NotifyService) { }

    public next() {
        if (this.passConfirm !== this.user.password)
            return this.notify.error("Passwords do not match");
        this.verified = true;
    }

    public back() {
        this.verified = false;
    }

    public async send() {
        try {
            await this.myAuthService.register(this.user);
            this.notify.success("Registered successfully!");
            this.myRouter.navigateByUrl("/home");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public change(event: MatSelectChange) {
        this.user.city = event.value;
    }

}
