import React from "react";
import Image from "gatsby-image";

const Img = props => {
  const objFit = props.objFit ? props.objFit : `cover`;
  const objPosition = props.objPosition ? props.objPosition : `50% 50%`;
  const fontFamily = `"object-fit: ${objFit}; object-position: ${objPosition}"`;

  const polyfillStyles = {
    objectFit: objFit,
    objectPosition: objPosition,
    fontFamily: fontFamily
  };

  return (
    <Image
      sizes={props.sizes}
      resolutions={props.resolutions}
      alt={props.alt}
      className={props.className}
      style={props.style}
      outerWrapperClassName={props.outerWrapperClassName}
      imgStyle={{ ...props.imgStyle, ...polyfillStyles }}
      position={props.position || `relative`}
      backgroundColor={props.backgroundColor || `transparent`}
      Tag={props.Tag || `div`}
    />
  );
};

export default Img;
