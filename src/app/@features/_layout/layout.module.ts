import { PageInfoService } from './core/page-info.service';
import { LayoutService } from './core/layout.service';
import { LayoutInitService } from './core/layout-init.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule, Routes } from '@angular/router';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../../@shared/i18n';
import { LayoutComponent } from './layout.component';
import { ExtrasModule } from '../../@shared/partials/layout/extras/extras.module';
import { Routing } from '../routing';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScriptsInitComponent } from './components/scripts-init/scripts-init.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WorkspaceAsideMenuComponent } from './components/aside/workspace-aside-menu/workspace-aside-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PageTitleComponent } from './components/header/page-title/page-title.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import { DrawersModule, DropdownMenusModule,  EngagesModule} from '../../@shared/partials';
import {EngagesComponent} from "../../@shared/partials/layout/engages/engages.component";
import { PromoterAsideMenuComponent } from './components/aside/promoter-aside-menu/promoter-aside-menu.component';
import { AdminAsideMenuComponent } from './components/aside/admin-aside-menu/admin-aside-menu.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    ToolbarComponent,
    WorkspaceAsideMenuComponent,
    TopbarComponent,
    PageTitleComponent,
    HeaderMenuComponent,
    EngagesComponent,
    PromoterAsideMenuComponent,
    AdminAsideMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslationModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    ExtrasModule,
    DrawersModule,
    EngagesModule,
    DropdownMenusModule,
    NgbTooltipModule,
    TranslateModule,
  ],
  exports: [RouterModule],
  providers:[
    // LayoutInitService,
    // LayoutService,
    // PageInfoService
  ],
})
export class LayoutModule {}
