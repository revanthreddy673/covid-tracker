import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { States } from '../models/states.model';
import { DataService } from '../services/data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  statesData: States[] = [];
  stateNamesList: string[] = [];
  colors: string[] = ['#44b9df', '#f8d84e', '#f48885', '#f6af50', '#6db36e'];

  constructor(private dataService: DataService, private router: Router) { }


  ngOnInit(): void {
    if (this.dataService.statesList.length === 0) {
      this.router.navigate(['compare']);
      return;
    }

    this.stateNamesList = this.dataService.statesList;

    this.dataService.getStateWiseData().subscribe({
      next: (data) => {
        for (let index in this.dataService.statesList) {
          for (let tempIndex in data) {
            if (
              data[tempIndex].stateName === this.dataService.statesList[index]
            ) {
              this.statesData.push(data[tempIndex]);
              break;
            }
          }
        }
        this.drawPieChart('confirmedChart');
        this.drawPieChart('deathsChart');
        this.drawPieChart('recoveredChart');
      }, error:
        (error) => {
          console.log(error);
        }
    })
  }

  calculateWidthOfStateDiv(): object {
    return { width: `calc(100%/${this.stateNamesList.length})` };
  }

  getBorderForSpan(index: number): object {
    return { border: `6px solid ${this.colors[index]}` };
  }

  drawPieChart(className: string) {
    (<HTMLElement>document.querySelector(`.${className}`)).innerText = '';

    let data = [];

    if (className === 'confirmedChart') {
      for (let index in this.statesData) {
        data.push(this.statesData[index].confirmedCases);
      }
    } else if (className === 'deathsChart') {
      for (let index in this.statesData) {
        data.push(this.statesData[index].deaths);
      }
    } else if (className === 'recoveredChart') {
      for (let index in this.statesData) {
        data.push(this.statesData[index].recovered);
      }
    }

    //to use some variable inside anonymous functions , as only arrow fns have that acces
    //let self = this;

    let chart = d3.select(`.${className}`);
    let width = chart.style('width');
    let height = chart.style('height');

    let radius = d3.min([parseFloat(width), parseFloat(height)]) * 0.3;

    let svg = chart.append('svg').attr('width', width).attr('height', height);

    let g = svg
      .append('g')
      .attr(
        'transform',
        `translate(${parseFloat(width) / 2}, ${parseFloat(height) / 2})`
      );

    let pie = d3.pie().sort(null);

    let arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)
      .padAngle(0.02);

    let arcs = g
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    let path = arcs
      .append('path')
      .attr('fill', (d, i) => this.colors[i])
      .attr('d', <any>arc)
      .append('title')
      .text((d: any, i: number) => this.stateNamesList[i] + ' : ' + d.data);
  }

  drawBarChart(className: string) {
    (<HTMLElement>document.querySelector(`.${className}`)).innerText = '';
    let data = [];

    if (className === 'confirmedChart') {
      for (let index in this.statesData) {
        let tempObj = {};
        tempObj['name'] = this.statesData[index].stateName;
        tempObj['value'] = this.statesData[index].confirmedCases;
        data.push(tempObj);
      }
    } else if (className === 'deathsChart') {
      for (let index in this.statesData) {
        let tempObj = {};
        tempObj['name'] = this.statesData[index].stateName;
        tempObj['value'] = this.statesData[index].deaths;
        data.push(tempObj);
      }
    } else if (className === 'recoveredChart') {
      for (let index in this.statesData) {
        let tempObj = {};
        tempObj['name'] = this.statesData[index].stateName;
        tempObj['value'] = this.statesData[index].recovered;
        data.push(tempObj);
      }
    }

    //to use some variable inside anonymous functions , as only arrow fns have that acces
    //let self = this;

    let chart = d3.select(`.${className}`);
    let width = chart.style('width');
    let height = chart.style('height');

    let svg = chart.append('svg').attr('height', height).attr('width', width);

    let g = svg.append('g').attr('transform', 'translate(10,10)');

    let xScale = d3
      .scaleBand()
      .range([0, parseFloat(width) - 20])
      .padding(0.4);

    let yScale = d3.scaleLinear().range([parseFloat(height) - 50, 0]);

    xScale.domain(
      data.map(function (d) {
        return d.name;
      })
    );

    yScale.domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }) +
      d3.max(data, function (d) {
        return d.value;
      }) /
      20,
    ]);

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return xScale(d.name);
      })
      .attr('y', function (d) {
        return yScale(d.value);
      })
      .attr('width', xScale.bandwidth())
      .attr('height', function (d) {
        if (parseFloat(height) - yScale(d.value) > 30) {
          return parseFloat(height) - 30 - yScale(d.value);
        } else {
          return parseFloat(height) - yScale(d.value);
        }
      })
      .attr('fill', (d, i) => this.colors[i]);

    g.selectAll('.text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', function (d) {
        return xScale(d.name);
      })
      .attr('y', function (d) {
        return yScale(d.value) - 10;
      })
      .text(function (d) {
        return d.value;
      })
      .style('fill', '#fff');
  }

  changeChartType() {
    if (document.querySelector('.pietext').classList.length === 2) {
      document.querySelector('.pietext').classList.toggle('highlight');
      document.querySelector('.bartext').classList.toggle('highlight');
      (<HTMLElement>document.querySelector('.imgSliderPie')).style.display =
        'none';
      (<HTMLElement>document.querySelector('.imgSliderBar')).style.display =
        'inline-block';
      this.drawBarChart('confirmedChart');
      this.drawBarChart('deathsChart');
      this.drawBarChart('recoveredChart');
    } else if (document.querySelector('.bartext').classList.length === 2) {
      document.querySelector('.bartext').classList.toggle('highlight');
      document.querySelector('.pietext').classList.toggle('highlight');
      (<HTMLElement>document.querySelector('.imgSliderBar')).style.display =
        'none';
      (<HTMLElement>document.querySelector('.imgSliderPie')).style.display =
        'inline-block';
      this.drawPieChart('confirmedChart');
      this.drawPieChart('deathsChart');
      this.drawPieChart('recoveredChart');
    }
  }

  onHomeClick() {
    this.router.navigate(['info']);
  }

}
