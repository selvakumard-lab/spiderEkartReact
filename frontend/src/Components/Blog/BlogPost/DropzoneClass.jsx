import { Form } from "reactstrap";
import CommonFileUpload from "../../../Common/CommonFileUpload";

const DropzoneClass = () => {
  return (
    <Form className="m-b-20">
      <div className="m-0 dz-message needsclick">
        <CommonFileUpload />
      </div>
    </Form>
  );
};

export default DropzoneClass;
