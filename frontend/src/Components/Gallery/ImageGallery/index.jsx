import GalleryContext from '../../../Helper/Gallery';
import ListOfImage from './ListOfImages';
import { Container, Row } from 'reactstrap';
import React, { Fragment, useState, useContext, useCallback } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';

const ImageGalleryContain = () => {

    const { smallImages } = useContext(GalleryContext);
    const initilindex = { index: 0, isOpen: false };
    const [photoIndex, setPhotoIndex] = useState(initilindex);
    // eslint-disable-next-line
    const callback = useCallback((photo) => {
        setPhotoIndex(photo);
    });

    return (
      <Fragment>
          <Breadcrumbs mainTitle="Image Gallery" parent="Gallery" title="Image Gallery" />
        <Container fluid={true}>
          <Row>
            <ListOfImage smallImages={smallImages} setPhotoIndex={callback} photoIndex={photoIndex} />
          </Row>
        </Container>
      </Fragment>
    );
};

export default ImageGalleryContain;