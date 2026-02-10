import  { Fragment } from "react";
import { Container, Row } from "reactstrap";
import ProjectDataList from "./Project Data/ProjectDataList";
import { Breadcrumbs } from "../../AbstractElements";
const ProjectListContain = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Tenant List" parent="Tenant" title="Tenant List"/>
      <Container fluid={true}>
        <Row className="project-cards">
          <ProjectDataList />
        </Row>
      </Container>
    </Fragment>
  );
};
export default ProjectListContain;
