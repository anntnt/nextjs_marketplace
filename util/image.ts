interface ValidateImageDimensionsParams {
    file: File;
    requiredWidth: number;
    requiredHeight: number;
}

export const validateImageDimensions = (
    file: ValidateImageDimensionsParams['file'],
    requiredWidth: ValidateImageDimensionsParams['requiredWidth'],
    requiredHeight: ValidateImageDimensionsParams['requiredHeight']
  ): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
  
        img.onload = () => {
          const width = img.width;
          const height = img.height;
  
          // Calculate ratios
          const requiredRatio = requiredWidth / requiredHeight;
          const imageRatio = width / height;
  
          // Allow a tiny tolerance for floating‑point differences
          const isValid = Math.abs(imageRatio - requiredRatio) < 0.01;
  
          resolve(isValid);
        };
  
        img.src = e.target?.result as string;
      };
  
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  
  