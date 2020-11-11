import { Component } from "@angular/core";
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
} from "@capacitor/core";
const { Camera, Filesystem, Storage } = Plugins;

//var AWS = require("aws-sdk");
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import {  writeFile, readFileSync } from 'fs';


let awsConfig = {
  region: "us-east-1",
  endpoint: "http://dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "AKIAY5JXDKKBQADVFWO6",
  secretAccessKey: "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",
};
AWS.config.update(awsConfig);
const s3 = new AWS.S3(
  {
      accessKeyId: "AKIAY5JXDKKBQADVFWO6",
      secretAccessKey: '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'
  }
) 
let docClient = new AWS.DynamoDB.DocumentClient();

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  public imageSrc;
  constructor() {}

  np
  mifunc() {
    (async function () {
      const photo = await Camera.getPhoto({
        source: CameraSource.Photos,
        saveToGallery: false,
        resultType: CameraResultType.DataUrl,
      });

     // console.log("********", photo);
     var datos = photo.dataUrl
      const words = datos.split(",");
      console.log("<<<<<<<<<" , words[words.length-1]);
      let photoSelected = words[words.length-1];
      
      let imageName = "IMAGE_"+new Date().toISOString()+'.jpg';
      let bufferObj = Buffer.from(photoSelected, "base64");

      setTimeout(()=>{
    
        //console.log(photoSelected);
            const params = {
                Bucket: 'adjuntostestemail',
                Key: 'IMAGE_'+new Date().toISOString()+'.jpg',
                Body: bufferObj
            }
            s3.upload(params, (error, data)=>{
                if(error){
                    alert("Error subiendo foto a s3"+ error)
                }else {
                console.log("Archivo guardado satisfactoriamente en s3")
                }
            })
      },2000);


            /*setTimeout(()=>{
              (function () {
                var date = new Date();
          
                var input = {
                  "imageData": "IMAGE_" + new Date().toISOString(),
                  "imageInfo": {
                    "fileData": words[words.length-1]
                  },
                };
                var params = {
                  TableName: "tania",
                  Item: input,
                };
                docClient.put(params, function (err, data) {
                  if (err) {
                    alert("users::save::error - " + JSON.stringify(err, null, 2));
                  } else {
                    alert("users::save::success");
                  }
                });
              })();
            },2000);*/
      //alert("Guardado en base de datos")
    })();
  }

          /*guardarImagenDynamo(imagetoSave) {
            (function () {
              var date = new Date();

              var input = {
                "imageData": "IMAGE_" + new Date().toISOString(),
                "imageInfo": {
                  "fileData": imagetoSave
                },
              };
              var params = {
                TableName: "tania",
                Item: input,
              };
              docClient.put(params, function (err, data) {
                if (err) {
                  console.log("users::save::error - " + JSON.stringify(err, null, 2));
                } else {
                  console.log("users::save::success");
                }
              });
            })();
          }*/
}
