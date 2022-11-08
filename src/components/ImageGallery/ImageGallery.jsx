import { ImageGallaryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GallaryUl } from './ImageGallery.styled';

const ImageGallery = ({ resultList, onImageClick }) => {
  return (
    <GallaryUl>
      {resultList.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGallaryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onImageClick={onImageClick}
          />
        );
      })}
    </GallaryUl>
  );
};

export default ImageGallery;
