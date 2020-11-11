import { Component } from '@angular/core';
import { Photo } from '../models/photo.interface';
import { PhotoService } from '../photo.service';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
const {Camera, Filesystem, Storage} = Plugins;


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public photos: Photo[] = [];
  public imageSrc;



  constructor(private photoSvc: PhotoService) {
    
  }
  ngOnInit(){
    /*this.photoSvc.loadSaved().then(()=>{
      this.photos = this.photoSvc.getPhotos();
    });*/
    /*
    (async function () {
      const photo = await Camera.getPhoto({
        source: CameraSource.Photos,
        saveToGallery: false,
        resultType: CameraResultType.DataUrl
      });
      this.imageSrc = photo.dataUrl;
      
      console.log("********", photo);

    })();*/
  }
 

  
  


  


}
