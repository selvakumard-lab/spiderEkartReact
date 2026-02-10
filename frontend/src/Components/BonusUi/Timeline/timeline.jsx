import { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import Timeline1Card from "./Timeline1";

const TimelineContain = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Timeline" parent="Bonus Ui" title="Timeline" />
      <Container fluid={true}>
        <Row>
          <Timeline1Card />
        </Row>
      </Container>
    </Fragment>
  );
};

export default TimelineContain;
