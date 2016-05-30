import { Component, Input, OnInit, ContentChild } from '@angular/core';
import { ContextualColor, DEFAULT, INFO, DANGER } from './contextual-color';
import { BootstrapHeaderComponent } from './bs-header.component';
import { BootstrapBodyComponent } from './bs-body.component';
import { BootstrapFooterComponent } from './bs-footer.component';

@Component({
  moduleId: module.id,
  selector: 'bs-panel',
  templateUrl: 'bs-panel.component.html',
  directives: [BootstrapHeaderComponent]
})
export class BootstrapPanelComponent implements OnInit {

  @ContentChild(BootstrapHeaderComponent) header;
  @ContentChild(BootstrapBodyComponent) body;
  @ContentChild(BootstrapFooterComponent) footer;
  
  @Input() contextType:ContextualColor = "default";
    
  constructor() {
  }
  
  ngOnInit() {
  }

}
