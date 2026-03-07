import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
  Form
} from "reactstrap";

import { Breadcrumbs, H4, H6 } from "../../AbstractElements";
import api from "../../Services/api";
import { toast } from "react-toastify";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CmsSettings = () => {

  const [data, setData] = useState({
    about_us: "",
    contact_us: "",
    terms_conditions: "",
    privacy_policy: "",
    refund_policy: "",
  });

  useEffect(() => {
    fetchCms();
  }, []);

  const fetchCms = async () => {
    try {
      const res = await api.get("/settings/cms");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/settings/cms", data);

      toast.success("CMS Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEditorChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const renderEditor = (label, field) => (
    <>
      <H6 className="mt-4">{label}</H6>

      <CKEditor
        editor={ClassicEditor}
        data={data[field]}
        onChange={(event, editor) => {
          const value = editor.getData();
          handleEditorChange(field, value);
        }}
      />
    </>
  );

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="CMS Settings"
        parent="Settings"
        title="Update Information"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <H4>CMS Content Settings</H4>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleSubmit}>

                  {renderEditor("About Us", "about_us")} <hr />

                  {renderEditor("Contact Us", "contact_us")} <hr />

                  {renderEditor("Terms & Conditions", "terms_conditions")} <hr />

                  {renderEditor("Privacy Policy", "privacy_policy")} <hr />

                  {renderEditor("Refund Policy", "refund_policy")} <hr />

                  <div className="mt-4">
                    <Button color="primary">
                      Update
                    </Button>
                  </div>

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CmsSettings;