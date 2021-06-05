import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ErrorLogService } from '../services/error-log.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appURL } from "../shared/app.constants";

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  @ViewChild('LogoPopupDailog', { static: true }) LogoPopupDailog: TemplateRef<any>;
  LogoPopupRef: BsModalRef;
  @ViewChild('AddPopupDailog', { static: true }) AddPopupDailog: TemplateRef<any>;
  AddPopupRef: BsModalRef;
  @ViewChild('EditPopupDailog', { static: true }) EditPopupDailog: TemplateRef<any>;
  EditPopupRef: BsModalRef;
  AdvertisementData :any;
  addForm: FormGroup;
  editForm: FormGroup;
  imagePreview: any = '';
  Advimage: any;
  UrlBase = appURL.uploadsPath;
  changeImage:boolean=false;
  constructor(private commonService: CommonService,
    private errorLogService: ErrorLogService,
    private modalService: BsModalService,
    public formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    console.log(this.LogoPopupDailog)
    // this.LogoPopupRef = this.modalService.show(this.LogoPopupDailog)
    this.getAdvertisementData()
  }
  getAdvertisementData(){
    this.commonService.getData('GetAllAdvertisement').subscribe(
      response => {
        if (response) {
          this.AdvertisementData = response
        } else {
          this.errorLogService.handleError(response.message)
        }
      },
      error => this.errorLogService.handleError(error)
    );
  }

  AddForm(){
    this.addForm = this.formBuilder.group({
      displayOrder: ['', Validators.required],
      image: ['', Validators.required],
      old_image: [''],
      link: ['', Validators.required],
    });
    this.AddPopupRef = this.modalService.show(this.AddPopupDailog)
  }
  EditForm(id){
    this.commonService.getData('GetSingleAdvertisement/'+id).subscribe(
      response => {
        if (response) {
          this.editForm = this.formBuilder.group({
            displayOrder: [response[0].displayOrder, Validators.required],
            image: [response[0].imageUrl, Validators.required],
            link: [response[0].link, Validators.required],
            id: [response[0]._id, Validators.required],
            old_image: [response[0].imageUrl, Validators.required],
          });
          
          this.imagePreview = this.UrlBase + response[0].imageUrl
          this.EditPopupRef = this.modalService.show(this.EditPopupDailog)
        } else {
          this.errorLogService.handleError(response.message)
        }
      },
      error => this.errorLogService.handleError(error)
    );
   
  }

  onUploadImage(files,formName) {
    if (files.length) {
      this.changeImage=true
      var $this = this
      console.log(files,'files')
      this.Advimage = files[0];
      if(formName == 'add'){
        this.addForm.controls['image'].setValue(this.Advimage['name']);
      }else{
        this.editForm.controls['image'].setValue(this.Advimage['name']);
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        $this.imagePreview = e['target']['result'];
      }
      reader.readAsDataURL(files[0]);
    }
  }

  
  onSubmitaddForm() {
    this.addForm.controls['image'].markAsTouched()
    this.addForm.controls['link'].markAsTouched()
    this.addForm.controls['displayOrder'].markAsTouched()
    console.log(this.addForm.value)
    if (this.addForm.valid) {
      const formData: FormData = new FormData()
      formData.append("image", this.Advimage);
      formData.append("link", this.addForm.controls['link'].value);
      formData.append("displayOrder", this.addForm.controls['displayOrder'].value);
      console.log(formData,'formData')
      this.commonService.addData('uploadAdvertisement', formData).subscribe(
        response => {
          if (response.status) {
            this.errorLogService.handleSuccess(response.message);
            this.AddPopupRef.hide();
            this.getAdvertisementData();
          } else {
            this.errorLogService.handleError(response.message)
          }
        },
        error => this.errorLogService.handleError(error)
      );
    }
  }
  onSubmiteditForm() {
    this.editForm.controls['image'].markAsTouched()
    this.editForm.controls['link'].markAsTouched()
    this.editForm.controls['displayOrder'].markAsTouched()
    console.log(this.editForm.value)
    if (this.editForm.valid) {
      const formData: FormData = new FormData()
      formData.append("image", this.Advimage);
      formData.append("link", this.editForm.controls['link'].value);
      formData.append("displayOrder", this.editForm.controls['displayOrder'].value);
      formData.append("id", this.editForm.controls['id'].value);
      formData.append("imageUrl", this.editForm.controls['old_image'].value);
      console.log(formData,'formData')
      this.commonService.addData('uploadAdvertisement', formData).subscribe(
        response => {
          if (response.status) {
            this.errorLogService.handleSuccess(response.message);
            this.EditPopupRef.hide();
            this.getAdvertisementData();
          } else {
            this.errorLogService.handleError(response.message)
          }
        },
        error => this.errorLogService.handleError(error)
      );
    }
  }

  DeleteAdv(id){
    this.commonService.getData('deleteAdvertisement/'+id).subscribe(
      response => {
        if (response) {
          this.errorLogService.handleSuccess(response.Message);
          this.getAdvertisementData();
        } else {
          this.errorLogService.handleError(response.message)
        }
      },
      error => this.errorLogService.handleError(error)
    );
  }

}
