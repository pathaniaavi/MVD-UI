import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from './policy/policy.component';
import { AssetComponent } from './asset/asset.component';
import { ContractDefinitionComponent } from './contract-definition/contract-definition.component';
import { ContractComponent } from './contract/contract.component';
import { CatalogBrowserComponent } from './catalog-browser/catalog-browser.component';
import { Company1Component } from './company1/company1.component';
import { Company2Component } from './company2/company2.component';

export const routes: Routes = [
  {
    path: 'company1',
    component: Company1Component,
    children: [
      { path: 'asset', component: AssetComponent },
      { path: 'policy', component: PolicyComponent },
      { path: 'contractDefinition', component: ContractDefinitionComponent },
      { path: 'contract', component: ContractComponent },
      { path: 'catalogBrowser', component: CatalogBrowserComponent },
    ]
  },
  {
    path: 'company2',
    component: Company2Component,
    children: [
      { path: 'asset', component: AssetComponent },
      { path: 'policy', component: PolicyComponent },
      { path: 'contractDefinition', component: ContractDefinitionComponent },
      { path: 'contract', component: ContractComponent },
      { path: 'catalogBrowser', component: CatalogBrowserComponent },
    ]
  },
  { path: '', redirectTo: '/company1', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
