import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {GeoDbClientModule} from "../client/geodb-client.module";

import {AppMaterialModule} from "../app.material.module";

import {CountryControlComponent} from "./components/country-control/country-control.component";
import {RegionControlComponent} from "./components/region-control/region-control.component";

import {environment} from "../../environments/environment";

@NgModule({
  declarations: [
    CountryControlComponent,
    RegionControlComponent
  ],
  imports: [
    // Third-Party
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Our App
    AppMaterialModule,
    GeoDbClientModule.forRoot({
      apiKey: environment.service.apiKey,
      serviceUri: environment.service.uri
    })
  ],
  exports: [
    AppMaterialModule,
    GeoDbClientModule,

    CountryControlComponent,
    RegionControlComponent
  ]
})
export class GeoDbCommonModule {

}
