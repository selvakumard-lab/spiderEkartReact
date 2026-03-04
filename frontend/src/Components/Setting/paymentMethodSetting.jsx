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
import { Breadcrumbs, H4, H6 } from "../../AbstractElements";
import api from "../../Services/api";
import { toast } from "react-toastify";

const PaymentMethodSetting = () => {

  const [formData, setFormData] = useState({
    codStatus: false,

    billplzStatus: false,
    billplzApiUrl: "",
    billplzAppUrl: "",
    billplzApiKey: "",
    billplzCollectionId: "",

    phonepeStatus: false,
    phonepeMerchantId: "",
    phonepeSecretKey: "",

    razorpayStatus: false,
    razorpayApiKey: "",
    razorpaySecretKey: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings/payment");
      setFormData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/settings/payment", formData);
      toast.success("Payment Settings Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /* ---------------- Custom Toggle ---------------- */
  const Toggle = ({ value, onClick }) => (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: "56px",
        height: "28px",
        borderRadius: "14px",
        backgroundColor: value ? "#4CAF50" : "#ccc",
        cursor: "pointer",
        padding: "3px",
        transition: "background-color 0.3s",
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          transform: value ? "translateX(28px)" : "translateX(0)",
          transition: "transform 0.3s",
        }}
      />
    </div>
  );

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Payment Methods Settings"
        parent="Settings"
        title="Payment Methods Settings"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <H4>Payment Methods Settings</H4>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleSubmit}>

                    <hr />
                    <H6>COD Payments</H6>
                    <hr />

                    <FormGroup>
                        <Label>COD Payments [ Enable / Disable ]</Label>
                        <div className="mt-2">
                        <Toggle
                            value={formData.codStatus}
                            onClick={() =>
                            setFormData({
                                ...formData,
                                codStatus: !formData.codStatus,
                            })
                            }
                        />
                        </div>
                    </FormGroup>

                    <hr />
                    <H6>Razorpay Payments</H6>
                    <hr />

                    <FormGroup>
                        <Label>Razorpay Payments [ Enable / Disable ]</Label>
                        <div className="mt-2">
                        <Toggle
                            value={formData.razorpayStatus}
                            onClick={() =>
                            setFormData({
                                ...formData,
                                razorpayStatus: !formData.razorpayStatus,
                            })
                            }
                        />
                        </div>
                    </FormGroup>

                    {formData.razorpayStatus && (
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label>Razorpay API Key</Label>
                                    <Input
                                    type="text"
                                    placeholder="Enter Razorpay API Key (e.g. rzp_test_xxxxx)"
                                    value={formData.razorpayApiKey}
                                    onChange={(e) =>
                                        setFormData({
                                        ...formData,
                                        razorpayApiKey: e.target.value,
                                        })
                                    }
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label>Razorpay Secret Key</Label>
                                    <Input
                                    type="text"
                                    placeholder="Enter Razorpay Secret Key"
                                    value={formData.razorpaySecretKey}
                                    onChange={(e) =>
                                        setFormData({
                                        ...formData,
                                        razorpaySecretKey: e.target.value,
                                        })
                                    }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    )}
                    <hr />

                    <H6>Billplz Payments</H6>
                    <hr />

                    <FormGroup>
                        <Label>Billplz Payments [ Enable / Disable ]</Label>
                        <div className="mt-2">
                        <Toggle
                            value={formData.billplzStatus}
                            onClick={() =>
                            setFormData({
                                ...formData,
                                billplzStatus: !formData.billplzStatus,
                            })
                            }
                        />
                        </div>
                    </FormGroup>

                  {formData.billplzStatus && (
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label>API URL</Label>
                                <Input
                                type="text"
                                placeholder="Enter Billplz API URL (e.g. https://www.billplz.com/api/)"
                                value={formData.billplzApiUrl}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    billplzApiUrl: e.target.value,
                                    })
                                }
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>APP API URL</Label>
                                <Input
                                type="text"
                                placeholder="Enter Billplz App URL (e.g. https://www.billplz.com/bills/)"
                                value={formData.billplzAppUrl}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    billplzAppUrl: e.target.value,
                                    })
                                }
                                />
                            </FormGroup>
                        </Col>

                        <Col md="6">
                            <FormGroup>
                                <Label>API Key</Label>
                                <Input
                                type="text"
                                placeholder="Enter Billplz API Key"
                                value={formData.billplzApiKey}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    billplzApiKey: e.target.value,
                                    })
                                }
                                />
                            </FormGroup>
                        </Col>

                        <Col md="6">
                            <FormGroup>
                                <Label>Collection ID</Label>
                                <Input
                                type="text"
                                placeholder="Enter Billplz Collection ID"
                                value={formData.billplzCollectionId}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    billplzCollectionId: e.target.value,
                                    })
                                }
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                  )}

                  <hr />

                  {/* ================= PHONEPE ================= */}
                  <H6>PhonePe Payments</H6>
                  <hr />

                  <FormGroup>
                    <Label>PhonePe Payments [ Enable / Disable ]</Label>
                    <div className="mt-2">
                      <Toggle
                        value={formData.phonepeStatus}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            phonepeStatus: !formData.phonepeStatus,
                          })
                        }
                      />
                    </div>
                  </FormGroup>

                  {formData.phonepeStatus && (
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label>Merchant ID</Label>
                                <Input
                                type="text"
                                placeholder="Enter PhonePe Merchant ID"
                                value={formData.phonepeMerchantId}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    phonepeMerchantId: e.target.value,
                                    })
                                }
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">

                            <FormGroup>
                                <Label>Secret Key</Label>
                                <Input
                                type="text"
                                placeholder="Enter PhonePe Secret Key"
                                value={formData.phonepeSecretKey}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    phonepeSecretKey: e.target.value,
                                    })
                                }
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                  )}

                  <hr />

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

export default PaymentMethodSetting;