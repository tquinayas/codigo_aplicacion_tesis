import { Component } from '@angular/core';
import { PhotoService } from '../photo.service';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, FilesystemEncoding,CameraPhoto, CameraSource } from '@capacitor/core';
const {Camera, Filesystem, Storage} = Plugins;
import * as fs from 'fs'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public imageSrc;
  constructor(private photoSvc: PhotoService) {}
/*
  public mimetodo(){
    alert("kskskfkf");
    this.photoSvc.addPhoto();
  }*/

  async mimetodo () {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      saveToGallery: false,
      resultType: CameraResultType.DataUrl
    });
    this.imageSrc = photo.dataUrl;
    
    console.log("********", photo);

  }

async mimetodo2 () {
  const { Camera} = Plugins;
  const photo = await Camera.getPhoto({
    quality: 100, // 0-100
    source: CameraSource.Camera, // Prompt | Camera | Photos
    saveToGallery: true,
    resultType: CameraResultType.Base64
  });
}

async mimetodo3 () {
  alert("directorio" + FilesystemDirectory.Data);
    /*let contents = await Filesystem.readFile({
      path: 'text.txt',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    console.log(contents);*/
    try {
      const result = await Filesystem.writeFile({
        path: 'secrets/dinosaurio123.txt',
        data: "This is a test",
        directory: FilesystemDirectory.ExternalStorage,
        encoding: FilesystemEncoding.UTF8
      })
      alert('Wrote file'+ result);
    } catch(e) {
      alert('Unable to write file'+ e);
    }
  

}


}
