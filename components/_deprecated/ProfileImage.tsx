import { useEffect, useState } from "react";
import { Image } from "react-native";
import { getProfileSource } from "../../utils/ImageUtils";
import { getProfileImgURL } from "../../api/storageAPI";

type ProfileImageProps = {
  userID: string;
  style: any;
};

const ProfileImage = ({ userID, style }: ProfileImageProps) => {
  const [imageURI, setImageURI] = useState(null);

  useEffect(() => {
    getProfileImgURL(userID).then((uri) => {
      setImageURI(uri);
    });
  }, []);

  return <Image style={style} source={getProfileSource(imageURI)} />;
};

export default ProfileImage;
