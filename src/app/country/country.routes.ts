import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/country-layout/country-layout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';

export const countryRoutes: Routes = [

	{
		path: '',
	    component: CountryLayoutComponent,
		children: [
			{
				path: 'by-capital',
				component: ByCapitalPageComponent
			},
			{
				path: 'by/:code',
				component: ByCountryPageComponent
			},
			{
				path: 'by-region',
				component: ByRegionPageComponent
			},
			{
				path: '**',
				redirectTo: 'by-capital'
			}
		]
	},

	// {
	// 	path: 'country',

	// },

	// {
	// 	path: '**',
	// 	redirectTo: ''
	// }




];


export default countryRoutes
