import { Component } from '@angular/core';
import { Photo } from '../models/photo.interface';
import { PhotoService } from '../photo.service';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { Stock } from '../models/stock';
const {Camera, Filesystem, Storage} = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  public photos: Photo[] = [];
  public stock: Stock;
  constructor(private photoSvc: PhotoService) { this.initializeStock();} 

ngOnInit(){
 /* this.photoSvc.loadSaved().then(()=>{
    this.photos = this.photoSvc.getPhotos();
  });*/
  this.photoSvc.createStock(this.stock)
                .subscribe((result:any)=>{
                  console.log(result);
                }, (err)=>{
                  console.log(err.error.msg);
                  
                })
}
  /*public newPhoto(): void{
    this.photoSvc.addNewToGallery()
  }*/
  initializeStock() { 
    this.stock = {
      name: '',
      code: '',
    }
     }
    
  async newPhoto () {
    const { Camera} = Plugins;
    const photo = await Camera.getPhoto({
      quality: 100, // 0-100
      source: CameraSource.Camera, // Prompt | Camera | Photos
      saveToGallery: true,
      resultType: CameraResultType.Base64
    });
  }

}