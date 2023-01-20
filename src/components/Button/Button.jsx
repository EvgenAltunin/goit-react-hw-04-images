import { LoadMoreBtn } from 'components/Button/Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMoreBtnClick }) => (
  <LoadMoreBtn type="button" onClick={onLoadMoreBtnClick}>
    Load more
  </LoadMoreBtn>
);

Button.propTypes = {
  onLoadMoreBtnClick: PropTypes.func,
};
