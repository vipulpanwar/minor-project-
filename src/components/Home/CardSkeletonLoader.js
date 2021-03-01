import React from "react"
import ContentLoader from "react-content-loader"

const CardSkeletonLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={362}
    height={363}
    viewBox="0 0 362 363"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="61" cy="92" r="38" /> 
    <rect x="23" y="158" rx="5" ry="5" width="317" height="30" /> 
    <rect x="23" y="205" rx="5" ry="5" width="317" height="128" />
  </ContentLoader>
)

export default CardSkeletonLoader;