import multer from "multer";

const storage = multer.diskStorage({
    destination: './src/storage/imgs',
    filename: (req,file,cb)=>{
        cb(null,`UserImage-${Date.now()}.${file.originalname.slice(file.originalname.length-3)}`);
    }
})

const upload = multer({storage});

export {upload};