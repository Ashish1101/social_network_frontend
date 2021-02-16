import React from 'react'

const ImageSection = ({url , alt}) => {
    return (
        <>
        <img src={url} alt={alt} className="object-contain mx-auto" style={{height:250}}  />
        </>
    )
}

export default ImageSection
