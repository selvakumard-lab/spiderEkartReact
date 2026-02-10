import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import MarkerMapComp from './MarkerMap';
import DraggableMarker from './DraggableMarker';
import { Breadcrumbs } from '../../../AbstractElements';

const MapJsContain = () => {

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Map" parent="Apps" title="Map" />
      <Container fluid={true}>
        <Row>
          <MarkerMapComp />
          <DraggableMarker />
        </Row>
      </Container>
    </Fragment>
  );
};

export default MapJsContain;