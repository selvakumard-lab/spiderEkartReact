import { Card, CardBody, Col, Form } from "reactstrap";
import CommonFileUpload from "../../../Common/CommonFileUpload";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import { SingleFileUpload } from "../../../Constant";

const Dropzone1 = () => {
  return (
    <Col lg="6">
      <Card>
        <HeadingCommon Heading={SingleFileUpload} CardHeaderClassName="pb-0" />
        <CardBody>
          <Form>
            <div className="dz-message needsclick">
              <CommonFileUpload />
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Dropzone1;
