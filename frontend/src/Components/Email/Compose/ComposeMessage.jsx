import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { Fragment } from "react";
import { Card, Form, Input, Label } from "reactstrap";
import { Btn, H4, LI, UL } from "../../../AbstractElements";
import CommonFileUpload from "../../../Common/CommonFileUpload";
import { Cancel, Messages, NewMessage, Save, Send, Subject, To } from "../../../Constant";

const ComposeMessage = () => {
  return (
    <Fragment>
      <div className="email-right-aside">
        <Card className="email-body">
          <div className="email-profile">
            <div className="email-body">
              <div className="email-compose">
                <div className="email-top compose-border">
                  <div className="compose-header">
                    <H4 attrH4={{ className: "mb-0" }}>{NewMessage}</H4>
                    <Btn attrBtn={{ color: "primary", type: "button" }}>
                      <i className="fa fa-file me-2"></i> {Save}
                    </Btn>
                  </div>
                </div>
                <div className="email-wrapper">
                  <Form className="theme-form">
                    <div className="form-group">
                      <Label className="col-form-label pt-0">{To}</Label>
                      <Input className="form-control" id="exampleInputEmail1" type="email" />
                    </div>
                    <div className="form-group">
                      <Label className="col-form-label pt-0">{Subject}</Label>
                      <Input className="form-control" id="exampleInputPassword1" type="text" />
                    </div>
                    <div className="form-group">
                      <Label className="col-form-label pt-0">{Messages}</Label>
                      <CKEditor editor={ClassicEditor} data="<p>Hello from CKEditor 5!</p>" />
                    </div>
                    <div className="form-group">
                      <CommonFileUpload />
                    </div>
                  </Form>
                  <div className="action-wrapper">
                    <UL attrUL={{ className: "simple-list actions" }}>
                      <LI>
                        <a className="btn btn-warning  me-2 mt-1" href="#javascript">
                          <i className="fa fa-paper-plane me-2"></i>
                          {Send}
                        </a>
                      </LI>
                      <LI>
                        <a className="btn btn-danger mt-1" href="#javascript">
                          <i className="fa fa-times me-2"></i>
                          {Cancel}
                        </a>
                      </LI>
                    </UL>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Fragment>
  );
};
export default ComposeMessage;
