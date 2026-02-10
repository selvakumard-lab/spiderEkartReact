import { H4, Breadcrumbs } from '../../../AbstractElements';
// import { Pricing, SimplePricingCard } from '../../../Constant/index';
import Standards from './Standard';
import StandardPricingcard from './StandardProcingCard';
import { Card, Col, Container, Row, CardHeader } from 'reactstrap';
import React, { Fragment, useState  } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";


const PricingMembershipContain = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);


  return (
    <Fragment>
      <Breadcrumbs mainTitle="Package" parent="Master" title="Package" />
      <Container fluid={true} >
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="pb-0 d-flex justify-content-between align-items-center">
                <H4 className="mb-0">Package</H4>

                <Button attrBtn={{ color: 'danger', size: 'sm' }} onClick={toggleModal}>
                  Add Package
                </Button>
              </CardHeader>

              <Standards />
            </Card>
            <Card>
              <CardHeader className='pb-0'>
                <H4>Simple Package Card</H4>
              </CardHeader>
              <StandardPricingcard />
            </Card>
          </Col>
        </Row>


        <Modal isOpen={isModalOpen} toggle={toggleModal} centered>
          <ModalHeader toggle={toggleModal}>
            Add Package
          </ModalHeader>

          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Package Name</Label>
                <Input type="text" placeholder="Enter package name" />
              </FormGroup>

              <FormGroup>
                <Label>Price</Label>
                <Input type="number" placeholder="Enter price" />
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <Input type="select">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="primary">Save</Button>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

      </Container>
    </Fragment>
  );
};
export default PricingMembershipContain;