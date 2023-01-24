import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { searchParams, notificationParams } from 'settings/settings';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { ModalInner } from 'components/Modal/ModalInner';
import { Container } from 'components/App.styled';

export function App() {
  const [processedQuery, setProcessedQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [receivedImages, setReceivedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [receivedImagesHits, setReceivedImagesHits] = useState([]);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchData(searchQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSearchFormSubmit = searchQuery => {
    if (searchQuery !== processedQuery) {
      setReceivedImages([]);
      setPage(1);
      setSearchQuery(searchQuery);
      return
    }
    setSearchQuery(searchQuery);
    
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModal = (url, alt) => {
    toggleModal();
    setUrl(url);
    setAlt(alt);
  };

  const fetchData = async () => {
    const { BASE_URL, API_KEY, IMAGE_TYPE, ORIENTATION, PER_PAGE } =
      searchParams;
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&per_page=${PER_PAGE}`
      );

      if (data.total === 0) {
        toast.error('No images found. Try again.', { notificationParams });
        return;
      }

      if (data.total > 0 && page === 1) {
        toast.success(`We found ${data.total} images!`, { notificationParams });
      } else if (data.total > 0 && page > 1 && data.hits.length < PER_PAGE) {
        toast.warning("You've reached the end of search results!", {
          notificationParams,
        });
      }
      setReceivedImagesHits(data);
      setReceivedImages(prevState => [...prevState, ...data.hits]);
      setProcessedQuery(searchQuery)
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      toast.error(`${error.message}. Try again.`, {
        notificationParams,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Searchbar onFormSubmit={handleSearchFormSubmit}></Searchbar>
      <ImageGallery items={receivedImages} onHandleModal={handleModal} />
      {isLoading && <Loader />}
      {receivedImages.length === 0 ||
        receivedImagesHits.totalHits === receivedImages.length || (
          <Button onLoadMoreBtnClick={onLoadMore} />
        )}
      <ToastContainer
        theme="colored"
        autoClose={notificationParams.autoClose}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalInner url={url} alt={alt} />
        </Modal>
      )}
    </Container>
  );
}
