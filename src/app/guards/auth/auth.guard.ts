import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const accessToken = inject(TokenService);
  const routeServ = inject(Router);
  await new Promise(resolve => setTimeout(resolve, 100));
  const token: string = await firstValueFrom(accessToken.getToken);
  return token !== "" ? true : (routeServ.navigate(['/login']), false)
};

export const backGuard: CanDeactivateFn<any> = async (component: any) => {
  if (component && typeof component.canDeactivate === 'function') {
    return component.canDeactivate();
  }
  return true;
}

export const LoginGuard: CanActivateFn = async (route, state) => {
  const accessToken = inject(TokenService);
  const routeServ = inject(Router);
  await new Promise(resolve => setTimeout(resolve, 100));
  const token: string = await firstValueFrom(accessToken.getToken);
  return token == "" ? true : (routeServ.navigate(['/home']), false)
}

