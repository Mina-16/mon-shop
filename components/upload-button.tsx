"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function ImageUpload({
  onChange,
}: {
  onChange: (url: string) => void;
}) {
  return (
    <UploadButton<OurFileRouter, "imageUploader">
      endpoint="imageUploader"

      onClientUploadComplete={(res) => {
        if (res?.[0]) {
          onChange(res[0].ufsUrl);
        }
      }}

      onUploadError={(error: Error) => {
        alert(error.message);
      }}
    />
  );
}
