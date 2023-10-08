import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads', 
    filename: (req, file, cb) => {
      const uniqueFilename = `${uuidv4()}.${file.originalname.split('.').pop()}`;
      cb(null, uniqueFilename);
    },
  }),
}

export const FileUploadInterceptor = FileInterceptor('file', multerOptions);