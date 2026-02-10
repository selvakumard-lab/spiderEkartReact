import { Fragment } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import MainList from './MainList';

const CreateListContain = () => {
  return (
    <Fragment>
        <Breadcrumbs mainTitle="Tenant Create" parent="Tenant" title="Tenant Create" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <MainList />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default CreateListContain;