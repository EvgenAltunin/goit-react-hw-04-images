import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from 'components/ImageGallery/ImageGallery.styled';
import PropTypes from 'prop-types';


export const ImageGallery = ({ items, onHandleModal }) => {
  return (
    <Gallery>
      {items.length > 0 && items.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            item={item}
            onHandleModal={onHandleModal}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array,
  onHandleModal: PropTypes.func.isRequired,
};
