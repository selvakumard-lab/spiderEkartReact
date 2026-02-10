import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import SlickSlider from "./SlickSlider";

const Carousels = () => {
  return (
    <>
      <Breadcrumbs mainTitle="Carousel" parent="Bonus Ui" title="Carousel" />
      <Container fluid={true} className="carousal-page">
        <Row>
          <Col sm="12">
            <SlickSlider slides={5} scroll={5} title="Basic Example" rtl={false} lazyLoad={true} autoplay={false} />
            <SlickSlider slides={3} scroll={3} title="Responsive Example" rtl={false} lazyLoad={true} autoplay={false} />
            <SlickSlider slides={3} scroll={1} title="Center Example" rtl={false} lazyLoad={true} center={true} autoplay={false} />
            <SlickSlider slides={3} scroll={3} title="Right to Left Example" rtl={true} lazyLoad={false} autoplay={false} />
            <SlickSlider slides={3} scroll={3} title="Lazy load Example" rtl={false} lazyLoad={true} autoplay={false} />
            <SlickSlider slides={3} scroll={1} title="Auto Play Example" rtl={false} lazyLoad={false} autoplay={true} />
            <SlickSlider slides={3} scroll={3} title="FocusOnSelect" rtl={false} lazyLoad={true} focusOnSelect={true} autoplay={false} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Carousels;
