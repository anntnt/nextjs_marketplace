import { v2 as cloudinary } from 'cloudinary';

type CloudinaryResponse = {
  secure_url: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function cloudinaryUpload(formData: FormData, folder: string) {
  try {
    const file = formData.get('image') as File;
    if (!file) {
      return { error: 'No image selected' };
    }

    if (!file.name) {
      return { error: 'Please select an image' };
    }

    if (!file.type?.startsWith('image/')) {
      return { error: 'File is not an image' };
    }

    if (file.size > 1024 * 1024 * 5) {
      return { error: 'Image is too large' };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const response = await new Promise<CloudinaryResponse | undefined>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder,
              format: 'webp',
            },
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            },
          )
          .end(buffer);
      },
    );

    if (
      !response ||
      typeof response !== 'object' ||
      Array.isArray(response) ||
      !response.secure_url
    ) {
      return { error: 'Image upload failed' };
    }

    return {
      imageUrl: response.secure_url,
    };
  } catch (cloudinaryError) {
    return { error: (cloudinaryError as Error).message };
  }
}
