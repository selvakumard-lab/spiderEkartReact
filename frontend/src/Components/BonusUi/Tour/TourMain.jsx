import React from "react";
import { Col, Container, Row } from "reactstrap";
import LeftbarProfile from "./Leftbar";
import PostFirst from "./PostFirst";
import PostSecond from "./PostSecond";
import PostThird from "./PostThird";
import UserProfile from "./UserProfile";

const TourMain = () => {
  return (
    <Container fluid={true}>
      <div className="user-profile tour">
        <Row>
          <UserProfile />
          <LeftbarProfile />
          <Col xl="9" md="7" className="xl-65 box-col-65">
            <Row>
              <PostFirst />
              <PostSecond />
              <PostThird />
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default TourMain;
