import Image from "next/image";
import { FC } from "react";

interface ImageTileProps {
  name: string;
  src: string;
}

const ImageTile: FC<ImageTileProps> = ({ name, src }) => {
  return (
    <div>
      <Image
        src={src}
        width={200}
        height={200}
        alt={name}
        className="rounded-full object-cover w-[200px] h-[200px]"
      />
    </div>
  );
};
export default ImageTile;
