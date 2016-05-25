import { Component } from '@angular/core';
import { UserComponent } from './+user';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { SettingsComponent } from './+settings';

import {AlertComponent} from 'ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'book-trade-app',
  templateUrl: 'book-trade.component.html',
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/user', component: UserComponent},
  {path: '/settings', component: SettingsComponent}
])
export class BookTradeAppComponent {
  title = 'book-trade works!';
  
  
  
    public alerts:Array<Object> = [
    {
      type: 'danger',
      msg: 'Oh snap! Change a few things up and try submitting again.'
    },
    {
      type: 'success',
      msg: 'Well done! You successfully read this important alert message.',
      closable: true
    }
  ];

  public closeAlert(i:number):void {
    this.alerts.splice(i, 1);
  }

  public addAlert():void {
    this.alerts.push({msg: 'Another alert!', type: 'warning', closable: true});
  }
}
