import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { EditorComponent } from '../editor/editor.component';

export interface CanDeactivate<T> {
  
  canDeactivate(component: T, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
      Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({ providedIn: 'root' })
export class UnsavedPostGuard implements CanDeactivate<EditorComponent> {

  canDeactivate(component: EditorComponent) {
    return component.canClosePost();
  }
}
