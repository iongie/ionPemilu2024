import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InstallPwaAnimation } from './install-pwa.animation';

@Component({
  selector: 'app-install-pwa',
  templateUrl: './install-pwa.component.html',
  styleUrls: ['./install-pwa.component.scss'],
  animations: [InstallPwaAnimation]
})
export class InstallPwaComponent  implements OnInit {
  @Output() action = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}

  actionPwa(){
    this.action.emit('install')
  }


}
