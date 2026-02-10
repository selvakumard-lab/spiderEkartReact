import { ToastContainer } from "react-toastify";
import { Card, CardBody, Col, Form } from "reactstrap";
import CommonFileUpload from "../../../Common/CommonFileUpload";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import { MultiImageUpload } from "../../../Constant";

const Dropzone2 = () => {
  return (
    <Col lg="6">
      <Card>
        <HeadingCommon Heading={MultiImageUpload} CardHeaderClassName="pb-0" />
        <CardBody>
          <Form>
            <ToastContainer />
            <div className="dz-message needsclick">
              <CommonFileUpload multiple />
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Dropzone2;
