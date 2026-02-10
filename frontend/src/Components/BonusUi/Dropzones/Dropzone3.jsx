import { Col, Card, CardBody, Form } from "reactstrap";
import { MultipleImageVideoAudioUpload } from "../../../Constant";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import CommonFileUpload from "../../../Common/CommonFileUpload";

const Dropzone3 = () => {
  return (
    <Col lg="6">
      <Card>
        <HeadingCommon Heading={MultipleImageVideoAudioUpload} CardHeaderClassName="pb-0" />
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

export default Dropzone3;
