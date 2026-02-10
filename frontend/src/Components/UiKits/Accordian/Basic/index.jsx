// @ts-nocheck
import { useState } from "react";
import { Accordion, Col, Card, CardBody, Collapse } from "reactstrap";
import { AccordionSpan, BasicAccordion, LongLorem } from "../../../../Constant";
import HeadingCommon from "../../../../Common/Component/HeadingCommon";
import DynamicAccordion from "./DynamicAccordion";
import AccordianHeadingCommon from "../common/AccordianHeadingCommon";

const BasicAccordions = () => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => (open === id ? setOpen('') : setOpen(id));
  let Id = ['2', '3'];
  
  return (
    <Col sm="12" lg="6">
      <Accordion open={open} toggle={toggle}>
        <Card>
          <HeadingCommon
            CardHeaderClassName="pb-0"
            Heading={BasicAccordion}
            span={AccordionSpan}
          />
          <CardBody>
            <div className="default-according" id="accordion">
              <Card>
                <AccordianHeadingCommon
                  toggle={toggle}
                  BtnSpanText={1}
                  BtnOnClickParameter={1}
                />
                <Collapse isOpen={open === '1'}>
                  <CardBody>{LongLorem}</CardBody>
                </Collapse>
              </Card>
              <DynamicAccordion toggle={toggle} isOpen={open} id={Id} />
            </div>
          </CardBody>
        </Card>
      </Accordion>
    </Col>
  );
};

export default BasicAccordions;
