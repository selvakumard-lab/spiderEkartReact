// @ts-nocheck
import { useState } from "react";
import { Accordion, Col } from "reactstrap";
import { Card, CardBody, Collapse } from "reactstrap";
import {
  AccordionOpenCloseIcon,
  LongLorem,
  SecondaryColorAccordionSpan,
} from "../../../../Constant";
import WithOperandDynamic from "./WithOperandDynamic";
import HeadingCommon from "../../../../Common/Component/HeadingCommon";
import AccordianHeadingCommon from "../common/AccordianHeadingCommon";

const WithOperand = () => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => (open === id ? setOpen("") : setOpen(id));

  return (
    <Col sm="12" lg="6" className="accordians">
      <Accordion open={open} toggle={toggle}>
        <Card>
          <HeadingCommon
            Heading={AccordionOpenCloseIcon}
            CardHeaderClassName="pb-0"
            span={SecondaryColorAccordionSpan}
          />
          <CardBody>
            <div className="default-according" id="accordion1">
              <Card>
                <AccordianHeadingCommon
                  icon="icofont-briefcase-alt-2"
                  toggle={toggle}
                  BtnSpanText={1}
                  BtnOnClickParameter={1}
                  CardHeaderClassName={"bg-primary"}
                />
                <Collapse in={open === "1"}>
                  <CardBody>{LongLorem}</CardBody>
                </Collapse>
              </Card>
              <WithOperandDynamic toggle={toggle} isOpen={open} />
            </div>
          </CardBody>
        </Card>
      </Accordion>
    </Col>
  );
};

export default WithOperand;
