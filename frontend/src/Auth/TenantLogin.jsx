
import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
// import { Image } from "../AbstractElements";
// import imgg from "../assets/images/logo/logo2.png";
import TenantLoginTab from "../Auth/Tabs/TenantLoginTab";

const TenantLogin = () => {
  return (
    <Fragment>
      <Container fluid={true} className="p-0">
        <Row className="mx-0">
          <Col xs="12" className="px-0">
            <div className="login-card auth-login">
              {/* <div>
                <Link className="logo" to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                  <Image attrImage={{ src: `${imgg}`, alt: "" }} />
                </Link>
              </div> */}
              <div className="login-main1 login-tab1 login-main">
                <div className="content-login">
                  <TenantLoginTab />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default TenantLogin;
