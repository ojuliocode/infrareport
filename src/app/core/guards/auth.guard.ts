import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CitizenService } from '../services/citizen.service';
import { Observable, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private citizenService: CitizenService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.citizenService.citizen$.pipe(
      take(1),
      map((user) => !!user),
      tap((looged) => {
        if (!looged) {
          console.log('not logged');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
