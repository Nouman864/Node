const cloudinary = require('cloudinary')

const dotenv = require('dotenv')
 
dotenv.config()
 
cloudinary.config({
    cloud_name: process.envv.CLOUD_NAME,
    api_key: process.envv.CLOUDINARY_API_KEY,
    api_secret: process.envv.CLOUDINARY_API_SECRET
})

exports.uploads = (file, folder)=> {
    return new promise(resolve=>
        {
            cloudinary.uploader.upload(file, (result)=>
            {
                resolve({
                    url:result.url,
                    id:result.public_id
                })
            },
            {
                resource_type: "auto",
                folder:folder
            })
        })
}