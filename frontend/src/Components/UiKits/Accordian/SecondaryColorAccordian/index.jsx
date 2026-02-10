// @ts-nocheck
import { useState } from "react";
import { Accordion, Col } from "reactstrap";
import { Card, CardBody, Collapse } from "reactstrap";
import {ColorAccordion,LongLorem,SecondaryColorAccordionSpan,} from "../../../../Constant";
import HeadingCommon from "../../../../Common/Component/HeadingCommon";
import AccordianHeadingCommon from "../common/AccordianHeadingCommon";
import SecondaryColorAccordianDynamic from "./SecondaryColorAccordianDynamic";

const SecondaryColorAccordian = () => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => (open === id ? setOpen('') : setOpen(id));
  return (
    <Col sm="12" lg="6">
      <Accordion open={open} toggle={toggle}>
        <Card>
          <HeadingCommon Heading={ColorAccordion} CardHeaderClassName="pb-0" span={SecondaryColorAccordionSpan}/>
          <CardBody>
            <div className="default-according" id="accordion1">
              <Card>
                <AccordianHeadingCommon
                  toggle={toggle}
                  BtnSpanText={1}
                  BtnOnClickParameter={1}
                  CardHeaderClassName={"bg-secondary"}
                />
                <Collapse isOpen={open === '1'}>
                  <CardBody>{LongLorem}</CardBody>
                </Collapse>
              </Card>
              <SecondaryColorAccordianDynamic isOpen={open} toggle={toggle} />
            </div>
          </CardBody>
        </Card>
      </Accordion>
    </Col>
  );
};

export default SecondaryColorAccordian;
