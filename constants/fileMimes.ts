const mimeTypes = {
  PDF: "application/pdf",
  JPEG: "image/jpeg",
  PNG: "image/png",
  BMP: "image/bmp",
};

export type MimeType = (typeof mimeTypes)[keyof typeof mimeTypes];

export { mimeTypes };
