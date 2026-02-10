import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { H4, Image, P } from "../../AbstractElements";
import { PortfolioTitle } from "../../Constant";
import { dynamicImage } from "../../Services";
import PagesSort from "./Pages";

const PhotosTab = () => {
  const description = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.";

  const [smallImages, setsmallImages] = useState([]);
  const initilindex = { index: 0, isOpen: false };
  const [photoIndex, setPhotoIndex] = useState(initilindex);

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/api/image-big-light.json`).then((response) => {
      setsmallImages(response.data.src);
    });
  }, []);
  return (
    <Fragment>
      <Row>
        {smallImages && (
          <Col sm="12">
            <Card>
              <CardBody className="my-gallery row gallery-with-description">
                {smallImages &&
                  smallImages.map((item, i) => {
                    return (
                      <figure className="col-xl-3 col-sm-6" key={i}>
                        <a href="#javascript" data-size="1600x950">
                          <Image
                            attrImage={{
                              src: `${dynamicImage(item)}`,
                              alt: "Gallery",
                              className: "img-thumbnail",
                              onClick: () =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: i,
                                  isOpen: true,
                                }),
                            }}
                          />
                          <div className="caption">
                            <H4>{PortfolioTitle}</H4>
                            <P>{description}</P>
                          </div>
                        </a>
                      </figure>
                    );
                  })}
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
      <PagesSort />
    </Fragment>
  );
};

export default PhotosTab;
