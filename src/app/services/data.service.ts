import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  statesList: string[] = [];

  constructor(private http: HttpClient) { }

  getStateWiseData() {
    return this.http.get('https://api.rootnet.in/covid19-in/stats/latest')
      .pipe(
        map((data: any) => {
          return data.data.regional;
        }),
        map((data: Array<any>) => {
          data = data.map(item => {
            return {
              stateName: item.loc,
              confirmedCases: item.totalConfirmed,
              deaths: item.deaths,
              recovered: item.discharged
            }
          })
          return data;
        })
      )
  }

  getTotalCasesIndia() {
    return this.http.get('https://api.rootnet.in/covid19-in/stats/latest')
      .pipe(
        map((data: any) => {
          return data.data.summary;
        }),
        map((data: any) => {
          return {
            confirmed: data.total,
            deaths: data.deaths,
            recovered: data.discharged
          }
        })
      )
  }

  getStateNames() {
    return this.http.get('https://api.rootnet.in/covid19-in/stats/latest')
      .pipe(
        map((data: any) => {
          return data.data.regional;
        }),
        map((data: Array<any>) => {
          data = data.map(item => item.loc)
          return data;
        })
      )
  }

  statesListForCompare(selectedStates: string[]) {
    this.statesList = selectedStates;
  }
}
