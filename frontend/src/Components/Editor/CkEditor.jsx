import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { CKEditorExample } from "../../Constant";
import { Breadcrumbs } from "../../AbstractElements";
import HeadingCommon from "../../Common/Component/HeadingCommon";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CkEditorContain = () => {

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Ck Editor" parent="Editor" title="Ck Editor" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeadingCommon
                CardHeaderClassName="pb-0"
                Heading={CKEditorExample}
              />
              <CardBody>
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>Hello from CKEditor 5!</p>"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default CkEditorContain;
