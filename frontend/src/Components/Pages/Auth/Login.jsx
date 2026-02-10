import { Link } from "react-router-dom";
import { Col, Container, Row, TabPane } from "reactstrap";
import { Image } from "../../../AbstractElements";
import imgg from "../../../assets/images/login/login_bg.jpg";
import LoginTab from "../../../Auth/Tabs/LoginTab";
import { dynamicImage } from "../../../Services";

const LoginSample = () => {
  return (
    <Container fluid={true} className="p-0">
      <Row className="mx-0">
        <Col xs="12" className="px-0">
          <div
            className="login-card auth-login"
            style={{
              backgroundImage: `url(${imgg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <Link className="logo" to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                <Image attrImage={{ className: "img-fluid", src: dynamicImage("logo/logo2.png"), alt: "" }} />
              </Link>
            </div>
            <div className="login-main1 login-tab1 login-main">
              <div className="content-login">
                <TabPane className="fade show" tabId={"jwt"}>
                  <LoginTab />
                </TabPane>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginSample;
