import { PolicyComponent } from './policy/policy.component';
import { Routes } from '@angular/router';
import { AssetComponent } from './asset/asset.component';
import { ContractDefinitionComponent } from './contract-definition/contract-definition.component';
import { ContractComponent } from './contract/contract.component';
import { CatalogBrowserComponent } from './catalog-browser/catalog-browser.component';

export const routes: Routes = [
  {
    path: 'asset',
    component: AssetComponent
  },
  {
    path: 'policy',
    component: PolicyComponent
  },
  {
    path: 'contractDefinition',
    component: ContractDefinitionComponent
  },
  {
    path: 'contract',
    component: ContractComponent
  },
  {
    path: 'catalogBrowser',
    component:CatalogBrowserComponent
  },

];
