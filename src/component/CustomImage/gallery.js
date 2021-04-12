import { useCallback } from "react";
import Gallery from "react-photo-gallery";

import CustomImage from "./CustomImage";

const MyGallery = ({ photos }) => {
  const imageRenderer = useCallback(({ index, photo }) => {
    const { id, image_url, display, product_id } = photo;

    let selected;

    if ("product_id" in photo) {
      selected = false;
    } else {
      selected = display;
    }

    return (
      <CustomImage
        selected={selected}
        key={id}
        index={index}
        photo={image_url}
        canDelete={product_id ? false : true}
      />
    );
  });

  return <Gallery photos={photos} renderImage={imageRenderer} />;
};

export default MyGallery;