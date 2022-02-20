import sharp from "sharp";
import path from "path";
import fs from "fs";
import sizeOf from "image-size";


async function crop(filename, fileWidth, fileHeight){
    await sharp(filename)
        .extract({ width: fileWidth, height: fileHeight, left: 0, top: 0 })
        .resize(fileHeight, fileHeight).jpeg({ mozjpeg: true })
        .rotate().toFile("croped-" + filename)
        .then(function() {
            console.log("Image cropped and saved");
        })
        .catch(function(err) {
            console.log("An error occured with:", filename, err);
        });
}

function main() {
    const directoryPath = path.join(path.resolve());
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
            if (file.includes('jpeg')) {
                console.log(file);
                var dimensions = sizeOf('./' + file);
                crop(file, dimensions.width, dimensions.height);
            }
        });
    });
}

main();