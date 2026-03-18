
// import React, { Fragment } from "react";
// import { Col, Container, Row } from "reactstrap";
// import TenantLoginTab from "../Auth/Tabs/TenantLoginTab";


// import { Link } from "react-router-dom";
// import { Image } from "../AbstractElements";
// import imgg from "../assets/images/logo/logo2.png";


import { Col, Container, Row } from 'reactstrap';
import TenantLoginTab from '../Auth/Tabs/TenantLoginTab';
import imgg from '../assets/images/login/2old.jpg';

const TenantLogin = () => {
  // return (
  //   <Fragment>
  //     <Container fluid={true} className="p-0">
  //       <Row className="mx-0">
  //         <Col xs="12" className="px-0">
  //           <div className="login-card auth-login">
  //             {/* <div>
  //               <Link className="logo" to={`${process.env.PUBLIC_URL}/dashboard/default`}>
  //                 <Image attrImage={{ src: `${imgg}`, alt: "" }} />
  //               </Link>
  //             </div> */}
  //             <div className="login-main1 login-tab1 login-main">
  //               <div className="content-login">
  //                 <TenantLoginTab />
  //               </div>
  //             </div>
  //           </div>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </Fragment>
  // );


  return (
            <Container fluid={true}>
                <Row>
                    <Col xl="6" style={{ backgroundImage: `url(${imgg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', display: 'block' }} ></Col>
                    <Col xl="6 p-0">
                        <div className="login-card">
                            {/* <div>
                                <Link className="logo" to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                                    <Image attrImage={{ className: 'img-fluid', src: dynamicImage('logo/logo2.png'), alt: '' }} />
                                </Link>
                            </div> */}
                            <TenantLoginTab />
                        </div>
                    </Col>
                </Row>
            </Container>
    );
};

export default TenantLogin;
