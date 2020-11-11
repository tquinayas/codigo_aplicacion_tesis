import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { Photo } from './models/photo.interface';
import { HttpClient } from '@angular/common/http';
import { Stock } from './models/stock';
import { Observable } from 'rxjs';
const {Camera, Filesystem, Storage} = Plugins;
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photos: Photo[] = [];
  private PHOTO_STORAGE = 'photos';
  private imageSrc;
  constructor(private http: HttpClient) { }

  createStock(stock: Stock): Observable<any> {
     return this.http.post('http://ec2-3-92-215-78.compute-1.amazonaws.com:3000/upload', stock);
}

  async addPhoto () {
    const photo = await Camera.getPhoto({
      source: CameraSource.Prompt,
      saveToGallery: false,
      resultType: CameraResultType.DataUrl
    });
    this.imageSrc = photo.dataUrl;
    console.log("********", photo);

  }


public async addNewToGallery(){
  const capturedPhoto= await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality:100
  });

  const saveImageFile= await this.savePicture(capturedPhoto);
  this.photos.unshift(saveImageFile);

  Storage.set({
    key: this.PHOTO_STORAGE,
    value: JSON.stringify(this.photos.map(p => {
      const photoCopy = { ...p };
      delete photoCopy.base64;
      return photoCopy;
    }))
  });

}

  public async loadSaved(){
    const photos = await Storage.get({
      key: this.PHOTO_STORAGE

    });
    this.photos = JSON.parse(photos.value) || [];

      for(let photo of this.photos){
        const readFile = await Filesystem.readFile({
          path: photo.filePath,
          directory: FilesystemDirectory.Data
        });
        photo.base64 = `data:image/jpeg;base64,${readFile.data}`;
      }
  }


  public getPhotos(): Photo[] {
    return this.photos;
  }

  private async savePicture(cameraPhoto: CameraPhoto){

    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = 'fototania' + '.jpg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    const finalPhotoUri = await Filesystem.getUri({
      directory: FilesystemDirectory.Data,
      path: fileName
    });

    let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);
    console.log(photoPath);
    alert(photoPath)

    return await this.getPhotoFile(cameraPhoto, fileName);
  }

  private async getPhotoFile(cameraPhoto: CameraPhoto, fileName:string): Promise<Photo>{
    return {
      filePath: fileName,
      webviewPath: cameraPhoto.webPath
    }
  }
  private async readAsBase64(cameraPhoto: CameraPhoto){
    const response = await fetch(cameraPhoto.webPath);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;

  }

  convertBlobToBase64 = (blob: Blob) => new Promise ((resolve, reject)=> {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);

  });



}
