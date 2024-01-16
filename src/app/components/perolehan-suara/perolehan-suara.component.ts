import { Component, Input } from '@angular/core';
import { TotalTps, defaultTotalTps } from 'src/app/app.interface';

@Component({
  selector: 'app-perolehan-suara',
  templateUrl: './perolehan-suara.component.html',
  styleUrls: ['./perolehan-suara.component.scss'],
})
export class PerolehanSuaraComponent {
  @Input() totalTps: TotalTps = defaultTotalTps;
  constructor(
  ) {
    
   }
}
