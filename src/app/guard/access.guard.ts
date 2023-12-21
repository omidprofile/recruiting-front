import { CanActivateFn } from '@angular/router';

export const accessGuard: CanActivateFn = (route, state) => {
  let permission = localStorage.getItem('permission');
  let routePermission;
  
  if (permission?.length)
    permission = JSON.parse(permission)
  
  if (route.data)
     routePermission = route.data[`permission`]
  
  
  if (permission?.length && routePermission?.length){
    for (let permit of routePermission){
      if (permission.includes(permit))
        return true
    }
  }
  
  return false
};
