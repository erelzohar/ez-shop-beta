import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from 'src/app/redux/store';
import { NotifyService } from './notify.service';

// Guard from entering or leaving a specific route in the front (not in the back)

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public constructor(private notify: NotifyService, private myRouter: Router) { }

    public canActivate(): boolean {

        if (store.getState().authState.user)
            return true; 
        this.notify.error("You must be logged in!");
        this.myRouter.navigateByUrl("/home");
        return false; 
        }

}
