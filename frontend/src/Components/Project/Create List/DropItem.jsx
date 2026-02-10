import React, { Fragment } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import CommonFileUpload from "../../../Common/CommonFileUpload";
import { UploadProjectFile } from "../../../Constant";

const DropItem = () => {
  return (
    <Fragment>
      <Row>
        <Col>
          <div className="mb-3">
            <FormGroup>
              <Label>{UploadProjectFile}</Label>
              <CommonFileUpload />
            </FormGroup>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
export default DropItem;
