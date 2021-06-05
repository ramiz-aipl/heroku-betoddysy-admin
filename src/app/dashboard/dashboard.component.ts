import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CommonService } from '../services/common.service';
import { ErrorLogService } from '../services/error-log.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showHead: boolean = true;
  TotalDiscussion: any = 0;
  constructor(private commonService: CommonService,
    private errorLogService: ErrorLogService,
    ) { }
  ngOnInit() {
   
    this.commonService.getData('CountDiscussion').subscribe(
      response => {
        if (response) {
          this.TotalDiscussion = response.count
        } else {
          this.errorLogService.handleError(response.message)
        }
      },
      error => this.errorLogService.handleError(error)
    );

      //start animation for the Emails Subscription Chart
      // this.startAnimationForBarChart(websiteViewsChart);
  }

}
