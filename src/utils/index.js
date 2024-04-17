export const imageFormats = [
  {
    type: "image/png",
    extension: ".png",
  },
  {
    type: "image/jpg",
    extension: ".jpg",
  },
  {
    type: "image/jpeg",
    extension: ".jpeg",
  },
  {
    type: "image/webp",
    extension: ".webp",
  },
];

export const formatFileSize = (sizeInBytes) => {
  const KB = 1024;
  const MB = KB * KB;

  if (sizeInBytes < KB) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < MB) {
    const sizeInKB = Math.ceil(sizeInBytes / KB);
    return `${sizeInKB} KB`;
  } else {
    const sizeInMB = Math.ceil(sizeInBytes / MB);
    return `${sizeInMB} MB`;
  }
};
