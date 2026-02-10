import { H4, H6, P } from "../../../../AbstractElements";
import React, { Fragment, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col } from "reactstrap";

const ClipboardPara = () => {
  const vall = "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const [clipBoardValues, setClipBoardValues] = useState(vall);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(clipBoardValues);
    setClipBoardValues(clipBoardValues);
  };
  return (
    <Fragment>
      <Col sm="12" md="6">
        <Card>
          <CardHeader className="pb-0">
            <H4>Clipboard On Paragraph</H4>
          </CardHeader>
          <CardBody>
            <div className="clipboaard-container">
              <P className="card-description">Copy from Paragraph</P>
              <H6 attrH6={{ className: "border rounded card-body f-w-300" }}>{vall}</H6>
              <div className="mt-3">
                <Button className="btn-clipboard" color="primary" onClick={handleCopy}>
                  <i className="fa fa-copy"></i> Copy
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};
export default ClipboardPara;
