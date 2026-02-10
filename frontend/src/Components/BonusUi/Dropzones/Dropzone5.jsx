import { Card, CardBody, Col, Form } from "reactstrap";
import CommonFileUpload from "../../../Common/CommonFileUpload";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import { CustomFileUpload } from "../../../Constant";

const Dropzone5 = () => {
  return (
    <Col sm="12">
      <Card>
        <HeadingCommon Heading={CustomFileUpload} CardHeaderClassName="pb-0" />
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

export default Dropzone5;
