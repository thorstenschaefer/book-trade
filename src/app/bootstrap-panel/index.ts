export { ContextType } from './context-type';
export { ContextualColor, INFO } from './contextual-color';

import { BootstrapPanelComponent } from './bs-panel.component';
import { BootstrapHeaderComponent } from './bs-header.component';
import { BootstrapBodyComponent } from './bs-body.component';
import { BootstrapFooterComponent } from './bs-footer.component';

// expert { BootstrapHeaderComponent, BootstrapBodyComponent, BootstrapFooterComponent, BootstrapPanelComponent} as BOOTSTRAP_PANEL_DIRECTIVES;

export const BS_PANEL_DIRECTIVES: any[] = [BootstrapPanelComponent, BootstrapHeaderComponent, BootstrapBodyComponent, BootstrapFooterComponent];
