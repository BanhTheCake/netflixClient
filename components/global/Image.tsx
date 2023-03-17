import Image from 'next/image';
import React, { FC, useState } from 'react';
interface ImageProps {
    [key: string]: any;
    alt: string;
    src: string;
}


const ImageCustom: FC<ImageProps> = ({ alt, src, ...props }) => {
    const [srcImage, setSrcImage] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    const onError = () => {
        setSrcImage('/images/SM-placeholder.png')
    }

    return (
        <Image
            src={srcImage}
            alt={alt}
            fill
            sizes="auto"
            blurDataURL='/images/SM-placeholder.png'
            placeholder='blur'
            {...props}
            style={{
                objectFit: 'cover',
                objectPosition: 'top center',
                transition: 'all .2s ease-in-out',
                ...(isLoading ? { filter: 'blur(10px)' } : {})
            }}
            onError={onError}
            onLoadingComplete={() => setIsLoading(false)}
        />
    );
};

export default ImageCustom;
