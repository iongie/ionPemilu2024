import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, firstValueFrom, map, take } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const accessToken = inject(TokenService);
  const routeServ = inject(Router);
  await new Promise(resolve => setTimeout(resolve, 100));
  const token: string = await firstValueFrom(accessToken.getToken);
  console.log(token, accessToken);
  return token !== "" ? true : (routeServ.navigate(['/login']), false)
};

export const backGuard: CanDeactivateFn<any> = async (component:any) => {
  if (component && typeof component.canDeactivate === 'function') {
    return component.canDeactivate();
  }
  return true;
}

export const CategoriVoteGuard: CanActivateFn = async (route, state) => {
  const routeServ = inject(Router);
  routeServ.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      console.log('Navigasi dimulai', event);
    }

    if (event instanceof NavigationEnd) {
      console.log('Navigasi selesai', event);
    }
  });

  // console.log(isNavigationEnd);
  
  // if (isNavigationEnd) {
  //   routeServ.navigate(['/dashboard']);
  //   return false; 
  // }

  return true;
}

