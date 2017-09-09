
import {FormControl} from "@angular/forms";
import {City} from "../../domain/geo/city.model";
import {GeoResponse} from "../../domain/common/geo-response.model";
import {Country} from "../../domain/geo/country.model";
import {RestConstants} from "../../common/rest-constants.class";
import {Component, OnInit} from "@angular/core";
import {GeoDataService} from "../../domain/geo/geo-data.service";

@Component({
  selector: "app-search-cities-component",
  templateUrl: "./find-cities.component.html",
  styleUrls: ["./find-cities.component.css"]
})
export class FindCitiesComponent implements OnInit {

  readonly CITY_RESULTS_COLUMNS_NO_COUNTRY = [{name: "ID"}, {name: "City"}, {name: "Region"}];
  readonly CITY_RESULTS_COLUMNS = [...this.CITY_RESULTS_COLUMNS_NO_COUNTRY, {name: "Country"}];

  countryCode: string;

  cityControl: FormControl;
  minPopulationControl: FormControl;

  cityResultsColumns = [];
  cityResultsCurrent = new Array<City>();
  cityResultsTotalCount = 0;
  cityResultsCurrentPage = 0;
  cityResultsPageSize = RestConstants.MAX_PAGING_LIMIT;

  constructor(private geoDataService: GeoDataService) { }

  ngOnInit() {
    this.cityControl = new FormControl();
    this.cityControl.disable();

    this.minPopulationControl = new FormControl();
    this.minPopulationControl.disable();

    this.updateResults();
  }

  onCountryCodeSelected(countryCode: string) {
    this.countryCode = countryCode;
  }

  onCountryControlEnabled(enabled: boolean) {
    if (!enabled) {
      this.countryCode = null;
    }
  }

  setCityResultsPage(page: number) {
    this.cityResultsCurrentPage = page;

    const offset = page * this.cityResultsPageSize;

    const namePrefix = this.cityControl.enabled ? this.cityControl.value : null;
    const minPopulation = this.minPopulationControl.enabled ? this.minPopulationControl.value : null;

    this.cityResultsColumns = this.countryCode
      ? this.CITY_RESULTS_COLUMNS_NO_COUNTRY
      : this.CITY_RESULTS_COLUMNS;

    this.geoDataService.findCities(namePrefix, this.countryCode, minPopulation, this.cityResultsPageSize, offset)
      .retry(RestConstants.MAX_RETRY)
      .subscribe(
        (response: GeoResponse<City[]>) => {
          this.cityResultsTotalCount = response.metadata.totalCount;

          this.cityResultsCurrent = [...response.data];
        });
  }

  updateResults() {
    this.setCityResultsPage(0);
  }
}
