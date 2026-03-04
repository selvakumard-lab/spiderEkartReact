import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Input,
  Label,
  Button,
  Form,
  FormGroup,
} from "reactstrap";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import api from "../../Services/api";
import { toast } from "react-toastify";

const NotificationSetting = () => {
  const [fcmKey, setFcmKey] = useState("");

  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  const fetchNotificationSettings = async () => {
    try {
      const res = await api.get("/settings/notification");
      setFcmKey(res.data.fcmServerKey || "");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/settings/notification", {
        fcmServerKey: fcmKey,
      });

      toast.success("Notification Settings Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Notification Settings"
        parent="Settings"
        title="Update Notification Settings"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <H4>Update Notification Settings</H4>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>FCM Server Key :</Label>
                    <Input
                      type="textarea"
                      name="fcmServerKey"
                      value={fcmKey}
                      onChange={(e) => setFcmKey(e.target.value)}
                      rows="4"
                    />
                  </FormGroup>

                  <div className="mt-4">
                    <Button color="primary" type="submit">
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

export default NotificationSetting;