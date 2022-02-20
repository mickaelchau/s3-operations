// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client.js"; // Helper function that creates an Amazon S3 service client module.
import path from "path";
import fs from "fs";

async function upload(directoryPath, filename) {
  const file = directoryPath + "/" + filename; // Path to and name of object. For example '../myFiles/index.js'.
  console.log(file)
  const fileStream = fs.createReadStream(file);

  const uploadParams = {
    Bucket: "angela-instagram",
    Key: path.basename(file),
    Body: fileStream,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; 
  } catch (err) {
    console.log("Error", err);
  }
}

function main() {
  const directoryPath = path.join(path.resolve(), "angela-pictures-v1");
  fs.readdir(directoryPath, function (err, files) {
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      files.forEach(function (file) {
        if (file.includes('jpeg')) {
          upload(directoryPath, file);
        }
      });
  });
}

main();
