import React, { Fragment } from "react";
import { Card, CardBody, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { Btn, H5 } from "../../../AbstractElements";
import CommonFileUpload from "../../../Common/CommonFileUpload";
import { Add, Cancel, Price, ProductImage, SelectSize, Size } from "../../../Constant";

const Rightformdesc = ({ handlesavechange, register, handleSubmit, errors }) => {
  return (
    <Fragment>
      <Col lg="6">
        <Card>
          <CardBody>
            <div className="product-info">
              <H5>{ProductImage}</H5>
              <Form id="form1" onSubmit={handleSubmit(handlesavechange)}>
                <FormGroup>
                  <CommonFileUpload />
                </FormGroup>
                <H5 attrH5={{ className: "mt-4" }}>{SelectSize}</H5>
                <div className="product-group">
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Label>{Size}</Label>
                        <select id="exampleFormControlSelect6" name="size" className={`form-select ${errors.size && "is-invalid"}`} {...register("size", { required: true })}>
                          <option value={"S"}>S</option>
                          <option value={"M"}>M</option>
                          <option value={"L"}>L</option>
                          <option value={"XL"}>XL</option>
                          <option value={"XXL"}>XXL</option>
                        </select>
                        <span className="text-danger">{errors.size && "Select Size of product "}</span>
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label>{Price}</Label>
                        <input type="number" placeholder="Enter Product Price" className={`form-control ${errors.price && "is-invalid"}`} name="price" {...register("price", { required: true })} />
                        <span className="text-danger">{errors.price && "Add Price of product "}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
            <div className="mt-4">
              <div className="text-end">
                <Btn attrBtn={{ color: "primary me-3", type: "submit", form: "form1" }}>{Add}</Btn>
                <Btn attrBtn={{ color: "danger" }}>{Cancel}</Btn>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default Rightformdesc;
