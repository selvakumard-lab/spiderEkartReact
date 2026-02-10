// @ts-nocheck
import React, { useState } from 'react';
import { Accordion, Col } from 'reactstrap';
import { Card, CardBody,  Collapse } from 'reactstrap';
import { AllCloseAccordion, AllCloseSpan, LongLorem } from '../../../../Constant';
import HeadingCommon from '../../../../Common/Component/HeadingCommon';
import AccordianHeadingCommon from '../common/AccordianHeadingCommon';
import AllCloseDynamic from './AllCloseDynamic';

const AllClose = () => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => (open === id ? setOpen('') : setOpen(id));

  return (
    <Col sm="12" lg="6">
      <Accordion open={open} toggle={toggle}>
        <Card>
          <HeadingCommon Heading={AllCloseAccordion} CardHeaderClassName="pb-0" span={AllCloseSpan} />
          <CardBody>
            <div className="default-according" id="accordion">
              <Card>
                <AccordianHeadingCommon toggle={toggle} BtnSpanText={1} BtnOnClickParameter={1}/>
                <Collapse isOpen={open === '1'}>
                  <CardBody>{LongLorem}</CardBody>
                </Collapse>
              </Card>
              <AllCloseDynamic toggle={toggle} isOpen={open} />
            </div>
          </CardBody>
        </Card>
      </Accordion>
    </Col>
  );
};

export default AllClose;