import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { ICloudinaryResponse, IFile } from '../app/interfaces/file';
import { config as fileConfig } from '../config';

cloudinary.config({
  cloud_name: fileConfig.cloudinary.cloud_name,
  api_key: fileConfig.cloudinary.api_key,
  api_secret: fileConfig.cloudinary.api_secret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// * cloudinary upload
const uploadToCloudinary = async (
  file: IFile,
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};