import { Component, Input, OnInit, ContentChild } from '@angular/core';
// import { ContextType, } from './context-type';
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

  // private ctxEnum = ContextType;
  
  @ContentChild(BootstrapHeaderComponent) header;
  @ContentChild(BootstrapBodyComponent) body;
  @ContentChild(BootstrapFooterComponent) footer;
  
  @Input() contextType:ContextualColor = "default";
  // @Input() contextType:ContextualColor = INFO;
    
  constructor() {
  }
  
  ngOnInit() {
    console.log("set ctx type is :" + this.contextType);
  }

}
