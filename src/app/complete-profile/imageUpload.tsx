import { useState } from "react";

export const ImageUpload = ({ name }: { name: string }) => {
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
    document.getElementById(`uploadBtn-${name}`)?.click();
  };
  return (
    <div
      className="h-[250px] border-dashed border-2 border-gray-300 rounded-md p-12 flex justify-center items-center bg-no-repeat bg-center bg-cover"
      onClick={handleContainerClick}
      style={
        selectedFile && { backgroundImage: `url(${selectedFile.previewURL})` }
      }
    >
      {!selectedFile && <PlusIcon className="h-6 text-gray-400" />}
      <input
        name={name}
        type="file"
        accept="image/png, image/gif, image/jpeg"
        id={"uploadBtn-" + name}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
