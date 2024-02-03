import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState<{
    file: File;
    previewURL: string | ArrayBuffer | null;
  }>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          // After reading the file, update the state with the file and its data URL
          setSelectedFile({
            file: file,
            previewURL: reader.result,
          });
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }
  };
  const handleContainerClick = () => {
    document.getElementById("avatar")?.click();
  };

  return (
    <div
      className="w-20 h-20 rounded-lg bg-gray-900 flex items-center justify-center my-3 bg-no-repeat bg-center bg-cover"
      onClick={handleContainerClick}
      style={
        selectedFile && { backgroundImage: `url(${selectedFile.previewURL})` }
      }
    >
      {!selectedFile && <CameraIcon className="h-10 w-10 text-white" />}

      <Input
        className="hidden"
        id="avatar"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleFileChange}
        name="avatar"
      />
    </div>
  );
};

function CameraIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
