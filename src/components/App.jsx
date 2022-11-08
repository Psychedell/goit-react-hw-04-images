import { useState, useEffect } from 'react';
import { WrapperApp } from './App.styled';
import SearchBar from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from 'services/api';
import Modal from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import MyLoader from 'components/Loader/Loader';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [resultList, setResultList] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    fetchImages(imageName, page)
      .then(data => {
        const { totalHits, hits } = data;

        if (!hits.length) {
          return toast.error(
            'There is no images found with this search request'
          );
        }

        setResultList(prevState => [...prevState, ...hits]);
        setTotalPages(Math.ceil(totalHits / 12));
        setIsVisible(totalHits / 12 > page);
      })
      .catch(error => {
        toast.error('Please, try again later!');
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [imageName, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setLoading(true);
    setResultList([]);
    setPage(1);
  };

  const largeImageFinder = event => {
    const openImage = resultList.find(
      image => image.webformatURL === event.currentTarget.src
    ).largeImageURL;

    return openImage;
  };

  const onImageClick = event => {
    setModalImage(largeImageFinder(event));
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    // this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      {!imageName && <p>No results yet.</p>}
      <WrapperApp>
        <ImageGallery resultList={resultList} onImageClick={onImageClick} />
        <Toaster
          toastOptions={{
            duration: 2500,
            style: {
              background: '#fff',
              color: '#3f51b5',
              marginTop: 30,
              marginRight: 50,
            },
          }}
          position="top-right"
        />
      </WrapperApp>
      {isVisible && totalPages > page && <Button onLoadMore={loadMore} />}
      {loading && <MyLoader />}
      {showModal && <Modal modalImage={modalImage} closeModal={toggleModal} />}
    </>
  );
};
