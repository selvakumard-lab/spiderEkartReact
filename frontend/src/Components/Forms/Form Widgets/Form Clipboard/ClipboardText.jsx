import { useState } from "react";
import { Button, Card, CardBody, Col, Input } from "reactstrap";
import { P } from "../../../../AbstractElements";
import HeadingCommon from "../../../../Common/Component/HeadingCommon";
import { ClipboardOnTextInput, Copy, Cut, Cutandcopytext } from "../../../../Constant";

const ClipboardText = () => {
  const [clipboardTextValue, setClipboardTextValue] = useState("");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(clipboardTextValue);
    setClipboardTextValue(clipboardTextValue);
  };
  const handleCut = async () => {
    await navigator.clipboard.writeText(clipboardTextValue);
    setClipboardTextValue("");
  };
  return (
    <Col sm="12" md="6">
      <Card>
        <HeadingCommon CardHeaderClassName="pb-0" Heading={ClipboardOnTextInput} />
        <CardBody>
          <div className="clipboaard-container">
            <P attrPara={{ className: "card-description" }}>{Cutandcopytext}</P>
            <Input className="form-control" id="clipboardExample1" type="text" placeholder="type some text to copy / cut" onChange={({ target: { value } }) => clipboardTextValue(value)} />
            <div className="mt-3 text-end">
              <Button className="btn-clipboard me-1" color="primary" onClick={handleCopy}>
                <i className="fa fa-copy"></i> {Copy}
              </Button>
              <Button className="btn-clipboard-cut" onClick={handleCut}>
                <i className="fa fa-cut"></i> {Cut}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};
export default ClipboardText;
