// import React, { Fragment } from 'react'
// import { Card, CardBody, Container } from 'reactstrap'
// import { Breadcrumbs, H4 } from '../../AbstractElements'

// const index = () => {
//   return (
//     <Fragment>
//        <Breadcrumbs mainTitle="Sample Card" parent="Apps" title="Sample Card" />
//         <Container fluid={true}>
//             <div className="row">
//               <div className="col-sm-12">
//                 <Card>
//                   <div className="card-header pb-0">
//                     <H4>Sample Card</H4><span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
//                   </div>
//                   <CardBody>
//                     <p className="mb-0">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
//                   </CardBody>
//                 </Card>
//               </div>
//             </div>
//           </Container>
//         </Fragment>
//   )
// }

// export default index


import React, { Fragment, useState, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { Breadcrumbs, H4 } from "../../AbstractElements";

const Index = () => {

  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>

      <Breadcrumbs mainTitle="Maintenance" parent="System" title="Under Maintenance" />

      <Container fluid={true}>
        <div className="row">
          <div className="col-sm-12">

            <Card>
              <div className="card-header pb-0 text-center">
                <H4>⚙ System Under Maintenance</H4>
                <span>We are currently improving the system. Please check back later.</span>
              </div>

              <CardBody className="text-center">

                {/* Maintenance Image */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2917/2917242.png"
                  alt="maintenance"
                  style={{ width: "180px", marginBottom: "20px" }}
                />

                {/* Maintenance Message */}
                <p className="mb-2">
                  Our website is currently undergoing scheduled maintenance.
                </p>

                <p className="mb-2">
                  Some features may not be available during this time.
                </p>

                {/* Timer */}
                <h5 style={{ marginTop: "20px" }}>
                  Current Time : <strong>{time}</strong>
                </h5>

              </CardBody>
            </Card>

          </div>
        </div>
      </Container>

    </Fragment>
  );
};

export default Index;