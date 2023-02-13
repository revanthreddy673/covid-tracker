import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Totalcases } from '../models/totalcases.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-totalstats',
  templateUrl: './totalstats.component.html',
  styleUrls: ['./totalstats.component.css']
})
export class TotalstatsComponent implements OnInit {

  totalCases!: Totalcases;
  dataLoaded!: Promise<boolean>;

  constructor(private dataService: DataService, private router: Router) {

  }
  ngOnInit(): void {
    this.dataService.getTotalCasesIndia().subscribe({
      next: (data) => {
        this.totalCases = data;
        this.dataLoaded = Promise.resolve(true);
      }, error: (error) => {
        console.log(error);
        this.dataLoaded = Promise.reject();
      }
    })
  }

  viewStateData() {
    this.router.navigate(['statedata']);
  }

}
