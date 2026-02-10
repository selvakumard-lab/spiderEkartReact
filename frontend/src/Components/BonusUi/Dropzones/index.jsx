import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import Dropzone1 from "./Dropzone1";
import Dropzone2 from "./Dropzone2";
import Dropzone3 from "./Dropzone3";
import Dropzone4 from "./Dropzone4";
import Dropzone5 from "./Dropzone5";

const DropzonesContain = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Bonus Ui" title="Dropzone" mainTitle="Dropzone" />
      <Container fluid={true}>
        <Row>
          <Dropzone1 />
          <Dropzone2 />
          <Dropzone3 />
          <Dropzone4 />
          <Dropzone5 />
        </Row>
      </Container>
    </Fragment>
  );
};

export default DropzonesContain;
