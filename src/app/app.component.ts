import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHead: boolean = false;
  constructor(
    private router: Router,
    private commonService: CommonService) {
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          this.commonService.ChangeRoute(event['url']);
          // console.log("///",event['url']);
          if (event['url'] === '/login') {
            // alert('ok');
            this.showHead = false;
          } else {
            this.showHead = true;
          }
        }
      });
  }
}
