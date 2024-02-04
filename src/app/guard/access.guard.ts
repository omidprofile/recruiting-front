import { CanActivateFn } from '@angular/router';
import { inject, Inject, Injector } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";

export const accessGuard: CanActivateFn = (route, state) => {
  let permission = localStorage.getItem('permission');
  let routePermission;
  
  if (permission?.length)
    permission = JSON.parse(permission)
  
  if (route.data)
     routePermission = route.data[`permission`]
  
  if (!routePermission)
    return true;
  
  if (permission?.length && routePermission?.length){
    for (let permit of routePermission){
      if (permission.includes(permit))
        return true
    }
  }

  inject(MatSnackBar).openFromComponent(SnackbarComponent, {
    data: `شما مجوز دسترسی به این بخش را ندارید`,
    duration: 1500
  })._open();
  return false
};
