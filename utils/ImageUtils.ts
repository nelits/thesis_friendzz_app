export const getProfileSource = (uri?: string) => {
  return uri ? { uri: uri } : require("../assets/profile_img.png");
};

export const getAddImageSource = (uri?: string) => {
  return uri ? { uri: uri } : require("../assets/add-image.png");
};
