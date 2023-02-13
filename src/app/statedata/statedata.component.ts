import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { States } from '../models/states.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-statedata',
  templateUrl: './statedata.component.html',
  styleUrls: ['./statedata.component.css']
})
export class StatedataComponent implements OnInit {

  statesData: States[] = [];
  dataLoaded!: Promise<boolean>;

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getStateWiseData().subscribe({
      next: (data) => {
        this.statesData = data;
        this.dataLoaded = Promise.resolve(true);
      }, error: (error) => {
        this.dataLoaded = Promise.reject();
      }
    })
  }

  onHomeClick() {
    this.router.navigate(['info']);
  }

  compareData() {
    this.router.navigate(['compare']);
  }

}
