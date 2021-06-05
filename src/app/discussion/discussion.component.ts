import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ErrorLogService } from '../services/error-log.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ConfirmationDialog} from './confirmation-dialog.component';
@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

  DiscussionData :any;
  constructor(private commonService: CommonService,private errorLogService: ErrorLogService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDiscussionData()
    
  }

  archiveDiscussion(_id,Type){
    this.commonService.getData('adminReported/'+_id+'/'+Type).subscribe(
      response => {
        if (response.status) {
          this.getDiscussionData()
        } else {
          this.errorLogService.handleError(response.message)
        }
      },
      error => this.errorLogService.handleError(error)
    );
  }

  openDialog(_id,Type) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Are you sure want to delete this discussion?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.commonService.getData('adminReported/'+_id+'/'+Type).subscribe(
          response => {
            if (response.status) {
              this.getDiscussionData()
            } else {
              this.errorLogService.handleError(response.message)
            }
          },
          error => this.errorLogService.handleError(error)
        );
      }
    });
  }
  getDiscussionData(){
    this.commonService.getData('GetAllDiscussionAdmin').subscribe(
      response => {
        if (response) {
          this.DiscussionData = response
        } else {
          this.errorLogService.handleError(response.message)
        }
      },
      error => this.errorLogService.handleError(error)
    );
  }

}
