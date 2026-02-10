import React,{  useContext, useEffect, useState } from 'react';
import { Col, Media, Progress, Row } from 'reactstrap';
import { H6, LI, P, UL, Image } from '../../../AbstractElements';
// import { Comment, Done, Issues, Resolved } from '../../../Constant';
// import ProjectAppContext from "../../../Helper/Project";
// import { dynamicImage } from '../../../Services';

import api from "../../../Services/api";

const DoneProjectData = () => {

  const [tenants, setTenants] = useState([]);
  const BASE_URL = "http://localhost:5000";
    
      useEffect(() => {
        loadTenants();
      }, []);
    
      const loadTenants = async () => {
        try {
          const response = await api.get("/tenants");
  
          const inactiveTenants = response.data.data.filter(
            (tenant) => tenant.status === "active"
          );
          setTenants(inactiveTenants);
  
        } catch (err) {
          console.error("Failed to load tenants", err);
        }
      };
  //  const {doneProject } = useContext(ProjectAppContext);

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
      //   {doneProject.map((item) =>
      //     <Col lg="4" xxl="4" md="6" className='box-col-33' key={item.id}>
      //       <div className="project-box">
      //         <span className="badge badge-success">{item.badge}</span>
      //         <H6 attrH6={{ className: 'f-w-600' }}>{item.title}</H6>
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
      //           <Col xs="6" className="font-success">{item.issue}</Col>
      //           <Col xs="6">
      //             <span>{Resolved}</span>
      //           </Col>
      //           <Col xs="6" className="font-success">{item.resolved}</Col>
      //           <Col xs="6">
      //             <span>{Comment}</span>
      //           </Col>
      //           <Col xs="6" className="font-success">{item.comment}</Col>
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
      //               <P attrPara={{ className: 'f - 12' }}>{item.like}</P>
      //             </LI>
      //           </UL>
      //         </div>
      //         <div className="project-status mt-4">
      //           <Media className="mb-0 d-flex">
      //             <P>{item.progress}% </P>
      //             <Media body className="text-end flex-grow-1">
      //               <span>{Done}</span>
      //             </Media>
      //           </Media>
      //           {item.progress === '100' ?
      //             <Progress className="sm-progress-bar" color="success" value={item.progress} style={{ height: '5px' }} />
      //             :
      //             <Progress className="sm-progress-bar" striped color="success" value={item.progress} style={{ height: '5px' }} />
      //           }
      //         </div>
      //       </div>
      //     </Col>
      //   )}
      // </Row>
  );
};
export default DoneProjectData;