import {
  GalleryItem,
  ItemImage,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, onHandleModal }) => (
  <GalleryItem>
    <ItemImage
      src={item.webformatURL}
      alt={item.tags}
      onClick={() => onHandleModal(item.largeImageURL, item.tags)}
    />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
  onHandleModal: PropTypes.func.isRequired,
};
