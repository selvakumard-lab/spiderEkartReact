import React,{  useContext, useEffect, useState } from 'react';
import { Col, Progress, Row } from 'reactstrap';
import { H6, P } from '../../../AbstractElements';
// import { Comment, Done, Issues, Resolved } from '../../../Constant';
// import ProjectAppContext from '../../../Helper/Project';
// import {dynamicImage} from '../../../Services/index';
import api from "../../../Services/api";


const  AllProjectData = () => {
  const [tenants, setTenants] = useState([]);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const response = await api.get("/tenants");
      setTenants(response.data.data);
    } catch (err) {
      console.error("Failed to load tenants", err);
    }
  };


  // const {allProject} = useContext(ProjectAppContext);
  return (

      <Row>
        {tenants.map((tenant) => (
          <Col lg="4" md="6" xxl="4" className="box-col-33" key={tenant.tenant_id}>

            
            <div className="project-box">
              <div className="project-img mb-3">
                <img
                  src={
                    tenant.project_image
                      ? `${BASE_URL}/${tenant.project_image}`
                      : "/assets/images/project/default.png"
                  }
                  alt={tenant.company_name}
                  className="img-fluid rounded"
                  style={{ height: "300px", width: "100%", objectFit: "cover" }}
                />
              </div>

              {/* STATUS BADGE */}
              <span
                className={`badge ${
                  tenant.status === "active"
                    ? "badge-success"
                    : "badge-danger"
                }`}
              >
                {tenant.status}
              </span>

              {/* COMPANY NAME */}
              <H6>{tenant.company_name}</H6>

              {/* CLIENT NAME */}
              <P className="mb-1">
                <strong>Client:</strong> {tenant.client_name}
              </P>

              {/* DOMAIN */}
              <P>
                <strong>Domain:</strong>{" "}
                <a href={tenant.domain_url} target="_blank" rel="noreferrer">
                  {tenant.domain_name}
                </a>
              </P>

              {/* DETAILS */}
              <Row className="details">
                <Col xs="6">
                  <span>Plan</span>
                </Col>
                <Col xs="6" className="font-primary">
                  #{tenant.plan_id}
                </Col>

                <Col xs="6">
                  <span>Start Date</span>
                </Col>
                <Col xs="6">
                  {tenant.start_date}
                </Col>

                <Col xs="6">
                  <span>End Date</span>
                </Col>
                <Col xs="6">
                  {tenant.end_date}
                </Col>
              </Row>

              {/* TENANT ACTIVE PROGRESS */}
              <div className="project-status mt-4">
                <div className="d-flex mb-1">
                  <P>{tenant.status === "active" ? "Active" : "Inactive"}</P>
                  <div className="flex-grow-1 text-end">
                    <span>Status</span>
                  </div>
                </div>

                <Progress
                  className="sm-progress-bar"
                  color={tenant.status === "active" ? "success" : "danger"}
                  value={tenant.status === "active" ? 100 : 30}
                  style={{ height: "5px" }}
                />
              </div>

            </div>
          </Col>
        ))}
      </Row>

      // <Row>
      //   {allProject.map(item => (
      //     <Col lg='4' md='6' xxl="4" className="box-col-33" key={item.id}>
      //       <div className="project-box">
      //         <span className={`badge ${item.badge === 'Done' ? 'badge-success' : 'badge-primary'}`}>{item.badge}</span>
      //         <H6>{item.title}</H6>
      //         <div className="d-flex">
      //           <Image attrImage={{ className: 'img-20 me-2 rounded-circle', src: `${dynamicImage(item.img)}`, alt: '' }} />
      //           <div className="flex-grow-1">
      //             <P attrPara={{className: 'mb-0'}}>{item.sites}</P>
      //           </div>
      //         </div>
      //         <P>{item.desc}</P>
      //         <Row className="details">
      //           <Col xs="6">
      //             <span>{Issues} </span>
      //           </Col>
      //           <Col xs="6" className={item.badge === 'Done' ? 'font-success' : 'font-primary'}>{item.issue}</Col>
      //           <Col xs="6">
      //             <span>{Resolved}</span>
      //           </Col>
      //           <Col xs="6" className={item.badge === 'Done' ? 'font-success' : 'font-primary'}>{item.resolved}</Col>
      //           <Col xs="6">
      //             <span>{Comment}</span>
      //           </Col>
      //           <Col xs="6" className={item.badge === 'Done' ? 'font-success' : 'font-primary'}>{item.comment}</Col>
      //         </Row>
      //         <div className="customers">
      //           <UL attrUL={{ className: 'simple-list' }}>
      //             <LI attrLI={{ className: 'd-inline-block' }}>
      //               <Image attrImage={{ className: 'img-30 rounded-circle', src: `${dynamicImage(item.customers_img1)}`, alt: '' }} />
      //             </LI>
      //             <LI attrLI={{ className: 'd-inline-block' }}>
      //               <Image attrImage={{ className: 'img-30 rounded-circle', src: `${dynamicImage(item.customers_img2)}`, alt: '' }} />
      //             </LI>
      //             <LI attrLI={{ className: 'd-inline-block' }}>
      //               <Image attrImage={{ className: 'img-30 rounded-circle', src: `${dynamicImage(item.customers_img3)}`, alt: '' }} />
      //             </LI>
      //             <LI attrLI={{ className: 'd-inline-block ms-2' }}>
      //               <P attrPara={{ className: 'f-12' }}>{`+${item.like} More`}</P>
      //             </LI>
      //           </UL>
      //         </div>
      //         <div className="project-status mt-4">
      //           <div className="d-flex mb-0">
      //             <P>{item.progress}% </P>
      //             <div className="flex-grow-1 text-end">
      //               <span>{Done}</span>
      //             </div>
      //           </div>
      //           {item.progress === '100' ?
      //             <Progress className="sm-progress-bar" color="success" value={item.progress} style={{ height: '5px' }} />
      //             :
      //             <Progress className="sm-progress-bar" striped color="primary" value={item.progress} style={{ height: '5px' }} />
      //           }
      //         </div>
      //       </div>
      //     </Col>
      //   ))}
      // </Row>
  );
};
export default AllProjectData;