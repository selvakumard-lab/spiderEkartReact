/* eslint-disable no-unused-vars */
import { Href, PortfolioTitle } from "../../Constant";
import { H4, P, Image } from "../../AbstractElements";
import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import axios from "axios";
import { dynamicImage } from "../../Services";

const PhotosTab = () => {
  const description =
    "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.";
  const [images, setImage] = useState([]);
  const [smallImages, setsmallImages] = useState([]);
  const initilindex = { index: 0, isOpen: false };
  const [photoIndex, setPhotoIndex] = useState(initilindex);

  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/api/image-light.json`)
      .then((response) => {
        setImage(response.data.src);
      });

    axios
      .get(`${process.env.PUBLIC_URL}/api/image-big-light.json`)
      .then((response) => {
        setsmallImages(response.data.src);
      });
  }, []);

  return (
    <Fragment>
      <Row>
        {smallImages && (
          <Col sm="12">
            <Card>
              <CardBody className="my-gallery gallery-with-description">
                <Row>
                  {smallImages &&
                    smallImages.map((item, i) => (
                      <Col xl="3" sm="6" key={i}>
                        <a href={Href} data-size="1600x950">
                          <Image
                            attrImage={{
                              src: dynamicImage(`${item}`),
                              alt: "Gallery",
                              className: "img-thumbnail",
                              onClick: () =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: 1,
                                  isOpen: true,
                                }),
                            }}
                          />
                          <div className="caption">
                            <H4>{PortfolioTitle}</H4>
                            <P attrPara={{ className: "mb-0" }}>
                              {description}
                            </P>
                          </div>
                        </a>
                      </Col>
                    ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </Fragment>
  );
};

export default PhotosTab;
