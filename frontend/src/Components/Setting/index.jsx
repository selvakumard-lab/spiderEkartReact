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

const Settings = () => {

    const BASE_URL = "http://localhost:5000/uploads/settings";

    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get("/settings");

            setFormData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        await api.put("/settings", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Settings Updated Successfully");
    };

    return (
        <Fragment>
            <Breadcrumbs
                mainTitle="System Settings"
                parent="Settings"
                title="Update System Settings"
            />

            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <H4>Update System Settings</H4>
                            </CardHeader>

                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label>App Name</Label>
                                        <Input
                                            type="text"
                                            name="appName"
                                            value={formData.appName}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Whatsapp Number</Label>
                                        <Input
                                            type="text"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Support Number</Label>
                                        <Input
                                            type="text"
                                            name="supportNumber"
                                            value={formData.supportNumber}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Support Email</Label>
                                        <Input
                                            type="email"
                                            name="supportEmail"
                                            value={formData.supportEmail}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Upload Logo</Label>
                                        <Input type="file" name="logoimage" accept="image/*" onChange={handleFileChange} />

                                        {formData.logoimage && (
                                            <div className="mt-2">
                                                <p>Current Image:</p>
                                                <img
                                                src={`${BASE_URL}/${formData.logoimage}`}
                                                width="200"
                                                height="200"
                                                style={{ borderRadius: "8px" }}
                                                alt=""
                                                />
                                            </div>
                                        )}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>State :</Label>
                                        <Input
                                        type="select"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        >
                                        <option value="Selangor">Selangor</option>
                                        <option value="Kuala Lumpur">Kuala Lumpur</option>
                                        <option value="Penang">Penang</option>
                                        <option value="Johor">Johor</option>
                                        <option value="Perak">Perak</option>
                                        <option value="Sabah">Sabah</option>
                                        <option value="Sarawak">Sarawak</option>
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>City :</Label>
                                        <Input
                                            type="select"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                        >
                                            <option value="Bukit Beruntung">Bukit Beruntung</option>
                                            <option value="Shah Alam">Shah Alam</option>
                                            <option value="Petaling Jaya">Petaling Jaya</option>
                                            <option value="Subang Jaya">Subang Jaya</option>
                                            <option value="Klang">Klang</option>
                                            <option value="Rawang">Rawang</option>
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Zone :</Label>
                                        <Input
                                        type="select"
                                        name="zone"
                                        value={formData.zone}
                                        onChange={handleChange}
                                        >
                                        <option value="West India">West India</option>
                                        <option value="East India">East India</option>
                                        <option value="North India">North India</option>
                                        <option value="South India">South India</option>
                                        <option value="Central">Central</option>
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Store Map Api :</Label>
                                        <Input
                                        type="text"
                                        name="storeMapApi"
                                        value={formData.storeMapApi}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Address :</Label>
                                        <Input
                                        type="textarea"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="2"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Store Lattitude :</Label>
                                        <Input
                                        type="text"
                                        name="storeLatitude"
                                        value={formData.storeLatitude}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Store Longitude :</Label>
                                        <Input
                                        type="text"
                                        name="storeLongitude"
                                        value={formData.storeLongitude}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>GST Number :</Label>
                                        <Input
                                        type="text"
                                        name="gstNumber"
                                        value={formData.gstNumber}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>FSSAI Number :</Label>
                                        <Input
                                        type="text"
                                        name="fssaiNumber"
                                        value={formData.fssaiNumber}
                                        onChange={handleChange}
                                        placeholder="FSSAI Number"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Upload Stamp</Label>
                                        <Input type="file" name="stampimage" accept="image/*" onChange={handleFileChange} />

                                        {formData.logoimage && (
                                            <div className="mt-2">
                                                <p>Current Image:</p>
                                                <img
                                                    src={`${BASE_URL}/${formData.stampimage}`}
                                                    width="200"
                                                    height="200"
                                                    style={{ borderRadius: "8px" }}
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                    </FormGroup>

                                    <hr />

                                    <H4 className="mb-3">Version Settings</H4>

                                    <Row>
                                        <Col md="4">
                                        <FormGroup>
                                            <Label>Current Version Of App</Label>
                                            <Input
                                            type="text"
                                            name="currentVersion"
                                            value={formData.currentVersion}
                                            onChange={handleChange}
                                            />
                                        </FormGroup>
                                        </Col>

                                        <Col md="4">
                                        <FormGroup>
                                            <Label>Minimum Version Required</Label>
                                            <Input
                                            type="text"
                                            name="minVersion"
                                            value={formData.minVersion}
                                            onChange={handleChange}
                                            />
                                        </FormGroup>
                                        </Col>

                                        <Col md="4" className="d-flex align-items-center">
                                        <FormGroup check>
                                            <Label check>
                                            <Input
                                                type="checkbox"
                                                name="versionStatus"
                                                checked={formData.versionStatus}
                                                onChange={handleChange}
                                            />{" "}
                                            Version System Status
                                            </Label>
                                        </FormGroup>
                                        </Col>
                                    </Row>

                                    <hr />

                                    <FormGroup>
                                        <Label>
                                        Store Currency (Symbol or Code - $ or USD - Anyone)
                                        </Label>
                                        <Input
                                        type="text"
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Tax ( in percentage % )</Label>
                                        <Input
                                        type="number"
                                        name="tax"
                                        value={formData.tax}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Delivery Charge Amount (RM)</Label>
                                        <Input
                                        type="number"
                                        name="deliveryCharge"
                                        value={formData.deliveryCharge}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Minimum Amount for Free Delivery (RM)</Label>
                                        <Input
                                        type="number"
                                        name="freeDeliveryMin"
                                        value={formData.freeDeliveryMin}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>System Timezone</Label>
                                        <Input
                                        type="select"
                                        name="timezone"
                                        value={formData.timezone}
                                        onChange={handleChange}
                                        >
                                        <option value="Asia/Kuala_Lumpur">
                                            Asia/Kuala_Lumpur - GMT +08:00
                                        </option>
                                        <option value="Asia/Kolkata">
                                            Asia/Kolkata - GMT +05:30
                                        </option>
                                        <option value="UTC">UTC</option>
                                        </Input>
                                    </FormGroup>

                                    <hr />

                                    <H4 className="mb-3">Refer &amp; Earn System</H4>
                                    <hr />

                                    <FormGroup>
                                        <Label>Refer &amp; Earn System</Label>
                                        <div>
                                            <div
                                                onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    referEarnSystem: !formData.referEarnSystem,
                                                })
                                                }
                                                style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                width: "56px",
                                                height: "28px",
                                                borderRadius: "14px",
                                                backgroundColor: formData.referEarnSystem
                                                    ? "#4CAF50"
                                                    : "#ccc",
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
                                                    transform: formData.referEarnSystem
                                                    ? "translateX(28px)"
                                                    : "translateX(0)",
                                                    transition: "transform 0.3s",
                                                }}
                                            />
                                            </div>
                                        </div>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Minimum Refer &amp; Earn Order Amount (RM)</Label>
                                        <Input
                                        type="number"
                                        name="minReferEarnOrderAmount"
                                        value={formData.minReferEarnOrderAmount}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Refer &amp; Earn Bonus (RM OR %)</Label>
                                        <Input
                                        type="number"
                                        name="referEarnBonus"
                                        value={formData.referEarnBonus}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Refer &amp; Earn Method</Label>
                                        <Input
                                        type="select"
                                        name="referEarnMethod"
                                        value={formData.referEarnMethod}
                                        onChange={handleChange}
                                        >
                                        <option value="Percentage">Percentage</option>
                                        <option value="Fixed">Fixed</option>
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Maximum Refer &amp; Earn Amount (RM)</Label>
                                        <Input
                                        type="number"
                                        name="maxReferEarnAmount"
                                        value={formData.maxReferEarnAmount}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Minimum Withdrawal Amount</Label>
                                        <Input
                                        type="number"
                                        name="minWithdrawalAmount"
                                        value={formData.minWithdrawalAmount}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Max days to return item</Label>
                                        <Input
                                        type="number"
                                        name="maxDaysToReturn"
                                        value={formData.maxDaysToReturn}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <hr />

                                    <FormGroup>
                                        <Label>Delivery Boy Bonus (%)</Label>
                                        <Input
                                        type="number"
                                        name="deliveryBoyBonus"
                                        value={formData.deliveryBoyBonus}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <hr />

                                    <H4 className="mb-3">Mail Settings</H4>
                                    <hr />

                                    <FormGroup>
                                        <Label>
                                        From eMail ID:{" "}
                                        <small>
                                            ( This email ID will be used in Mail System )
                                        </small>
                                        </Label>
                                        <Input
                                        type="email"
                                        name="fromEmail"
                                        value={formData.fromEmail}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                        Reply To eMail Name:{" "}
                                        <small>
                                            ( This email ID will be used in Mail System )
                                        </small>
                                        </Label>
                                        <Input
                                        type="email"
                                        name="replyToEmail"
                                        value={formData.replyToEmail}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Username:</Label>
                                        <Input
                                        type="text"
                                        name="mailUsername"
                                        value={formData.mailUsername}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                        Mail Password: <small>( Mail Password for SMTP )</small>
                                        </Label>
                                        <Input
                                        type="password"
                                        name="mailPassword"
                                        value={formData.mailPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••••••••"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                        SMTP Host: <small>( SMTP Server )</small>
                                        </Label>
                                        <Input
                                        type="text"
                                        name="smtpHost"
                                        value={formData.smtpHost}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>SMTP Secure</Label>
                                        <Input
                                        type="select"
                                        name="smtpSecure"
                                        value={formData.smtpSecure}
                                        onChange={handleChange}
                                        >
                                        <option value="SSL">SSL</option>
                                        <option value="TLS">TLS</option>
                                        <option value="None">None</option>
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                        SMTP PORT: <small>( PORT Number )</small>
                                        </Label>
                                        <Input
                                        type="number"
                                        name="smtpPort"
                                        value={formData.smtpPort}
                                        onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup check className="mb-3">
                                        <Label check>
                                        <Input
                                            type="checkbox"
                                            name="loginWithSmsOtp"
                                            checked={formData.loginWithSmsOtp}
                                            onChange={handleChange}
                                        />{" "}
                                        Login With SMS OTP
                                        </Label>
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

export default Settings;

// import React, { Fragment, useState } from "react";
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Container,
//   Row,
//   Input,
//   Label,
//   Button,
//   Form,
//   FormGroup,
// } from "reactstrap";
// import { Breadcrumbs, H4 } from "../../AbstractElements";

// const SectionCard = ({ title, children }) => (
//   <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: "12px", overflow: "hidden" }}>
//     <CardHeader
//       style={{
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         color: "#fff",
//         fontWeight: 600,
//         fontSize: "15px",
//         padding: "14px 20px",
//         borderBottom: "none",
//       }}
//     >
//       {title}
//     </CardHeader>
//     <CardBody style={{ padding: "20px", background: "#fafbff" }}>
//       <Row>{children}</Row>
//     </CardBody>
//   </Card>
// );

// const GridField = ({ label, children, md = 4 }) => (
//   <Col md={md} className="mb-3">
//     <FormGroup className="mb-0">
//       <Label
//         style={{
//           fontSize: "12px",
//           fontWeight: 600,
//           color: "#6c757d",
//           textTransform: "uppercase",
//           letterSpacing: "0.5px",
//           marginBottom: "6px",
//         }}
//       >
//         {label}
//       </Label>
//       {children}
//     </FormGroup>
//   </Col>
// );

// const inputStyle = {
//   borderRadius: "8px",
//   border: "1px solid #e0e4f0",
//   fontSize: "14px",
//   padding: "8px 12px",
//   background: "#fff",
//   boxShadow: "none",
//   transition: "border-color 0.2s",
// };

// const Settings = () => {
//   const [formData, setFormData] = useState({
//     appName: "EC Services",
//     whatsapp: "+60 13-2439343",
//     supportNumber: "+6013-2439343",
//     supportEmail: "rrk@ecservices.com.my",
//     state: "Selangor",
//     city: "Bukit Beruntung",
//     zone: "West India",
//     storeMapApi: "",
//     address: "NO.3,JALAN INAI 5,SEK BB3,BANDAR BUKIT BERUTUNG ,48300 RAWANG,",
//     storeLatitude: "",
//     storeLongitude: "",
//     gstNumber: "IG27061622050",
//     fssaiNumber: "",
//     currentVersion: "1.0.1",
//     minVersion: "1.0.1",
//     versionStatus: true,
//     currency: "RM",
//     tax: 0,
//     deliveryCharge: 5,
//     freeDeliveryMin: 99,
//     timezone: "Asia/Kuala_Lumpur",
//     referEarnSystem: true,
//     minReferEarnOrderAmount: 80,
//     referEarnBonus: 7,
//     referEarnMethod: "Percentage",
//     maxReferEarnAmount: 30,
//     minWithdrawalAmount: 20,
//     maxDaysToReturn: 0,
//     deliveryBoyBonus: 0,
//     fromEmail: "rrk@ecservices.com.my",
//     replyToEmail: "rrk@ecservices.com.my",
//     mailUsername: "rathamages",
//     mailPassword: "",
//     smtpHost: "smtp.gmail.com",
//     smtpSecure: "SSL",
//     smtpPort: 587,
//     loginWithSmsOtp: true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     alert("Settings Saved Successfully!");
//   };

//   return (
//     <Fragment>
//       <Breadcrumbs
//         mainTitle="System Settings"
//         parent="Settings"
//         title="Update System Settings"
//       />

//       <Container fluid>
//         <Form onSubmit={handleSubmit}>

//           {/* ===== Basic Settings ===== */}
//           <SectionCard title="🏪 Basic Settings">
//             <GridField label="App Name">
//               <Input style={inputStyle} type="text" name="appName" value={formData.appName} onChange={handleChange} />
//             </GridField>
//             <GridField label="WhatsApp Number">
//               <Input style={inputStyle} type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
//             </GridField>
//             <GridField label="Support Number">
//               <Input style={inputStyle} type="text" name="supportNumber" value={formData.supportNumber} onChange={handleChange} />
//             </GridField>
//             <GridField label="Support Email">
//               <Input style={inputStyle} type="email" name="supportEmail" value={formData.supportEmail} onChange={handleChange} />
//             </GridField>
//             <GridField label="Upload Logo" md={4}>
//               <Input style={inputStyle} type="file" />
//             </GridField>
//             <GridField label="Upload Stamp" md={4}>
//               <Input style={inputStyle} type="file" name="stampUpload" accept="image/*" />
//             </GridField>
//           </SectionCard>

//           {/* ===== Store Location Settings ===== */}
//           <SectionCard title="📍 Store Location Settings">
//             <GridField label="State">
//               <Input style={inputStyle} type="select" name="state" value={formData.state} onChange={handleChange}>
//                 <option>Selangor</option>
//                 <option>Kuala Lumpur</option>
//                 <option>Penang</option>
//                 <option>Johor</option>
//                 <option>Perak</option>
//                 <option>Sabah</option>
//                 <option>Sarawak</option>
//               </Input>
//             </GridField>
//             <GridField label="City">
//               <Input style={inputStyle} type="select" name="city" value={formData.city} onChange={handleChange}>
//                 <option>Bukit Beruntung</option>
//                 <option>Shah Alam</option>
//                 <option>Petaling Jaya</option>
//                 <option>Subang Jaya</option>
//                 <option>Klang</option>
//                 <option>Rawang</option>
//               </Input>
//             </GridField>
//             <GridField label="Zone">
//               <Input style={inputStyle} type="select" name="zone" value={formData.zone} onChange={handleChange}>
//                 <option>West India</option>
//                 <option>East India</option>
//                 <option>North India</option>
//                 <option>South India</option>
//                 <option>Central</option>
//               </Input>
//             </GridField>
//             <GridField label="Store Map API">
//               <Input style={inputStyle} type="text" name="storeMapApi" value={formData.storeMapApi} onChange={handleChange} />
//             </GridField>
//             <GridField label="Store Latitude">
//               <Input style={inputStyle} type="text" name="storeLatitude" value={formData.storeLatitude} onChange={handleChange} />
//             </GridField>
//             <GridField label="Store Longitude">
//               <Input style={inputStyle} type="text" name="storeLongitude" value={formData.storeLongitude} onChange={handleChange} />
//             </GridField>
//             <GridField label="GST Number">
//               <Input style={inputStyle} type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
//             </GridField>
//             <GridField label="FSSAI Number">
//               <Input style={inputStyle} type="text" name="fssaiNumber" value={formData.fssaiNumber} onChange={handleChange} placeholder="FSSAI Number" />
//             </GridField>
//             <GridField label="Address" md={12}>
//               <Input style={inputStyle} type="textarea" name="address" value={formData.address} onChange={handleChange} rows="2" />
//             </GridField>
//           </SectionCard>

//           {/* ===== Version Settings ===== */}
//           <SectionCard title="🔄 Version Settings">
//             <GridField label="Current Version">
//               <Input style={inputStyle} type="text" name="currentVersion" value={formData.currentVersion} onChange={handleChange} />
//             </GridField>
//             <GridField label="Minimum Version Required">
//               <Input style={inputStyle} type="text" name="minVersion" value={formData.minVersion} onChange={handleChange} />
//             </GridField>
//             <Col md={4} className="mb-3 d-flex align-items-center">
//               <FormGroup check className="mb-0 mt-3">
//                 <Label check style={{ fontSize: "14px", fontWeight: 500, color: "#495057" }}>
//                   <Input
//                     type="checkbox"
//                     name="versionStatus"
//                     checked={formData.versionStatus}
//                     onChange={handleChange}
//                   />{" "}
//                   Version System Status
//                 </Label>
//               </FormGroup>
//             </Col>
//           </SectionCard>

//           {/* ===== Store Settings ===== */}
//           <SectionCard title="🛒 Store Settings">
//             <GridField label="Currency (Symbol or Code)">
//               <Input style={inputStyle} type="text" name="currency" value={formData.currency} onChange={handleChange} />
//             </GridField>
//             <GridField label="Tax (%)">
//               <Input style={inputStyle} type="number" name="tax" value={formData.tax} onChange={handleChange} />
//             </GridField>
//             <GridField label="Delivery Charge (RM)">
//               <Input style={inputStyle} type="number" name="deliveryCharge" value={formData.deliveryCharge} onChange={handleChange} />
//             </GridField>
//             <GridField label="Free Delivery Minimum (RM)">
//               <Input style={inputStyle} type="number" name="freeDeliveryMin" value={formData.freeDeliveryMin} onChange={handleChange} />
//             </GridField>
//             <GridField label="System Timezone" md={8}>
//               <Input style={inputStyle} type="select" name="timezone" value={formData.timezone} onChange={handleChange}>
//                 <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur - GMT +08:00</option>
//                 <option value="Asia/Kolkata">Asia/Kolkata - GMT +05:30</option>
//                 <option value="UTC">UTC</option>
//               </Input>
//             </GridField>
//           </SectionCard>

//           {/* ===== Refer & Earn Settings ===== */}
//           <SectionCard title="🎁 Refer & Earn Settings">
//             <Col md={12} className="mb-3">
//               <Label style={{ fontSize: "12px", fontWeight: 600, color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                 Refer &amp; Earn System
//               </Label>
//               <div>
//                 <div
//                   onClick={() => setFormData({ ...formData, referEarnSystem: !formData.referEarnSystem })}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     width: "56px",
//                     height: "28px",
//                     borderRadius: "14px",
//                     backgroundColor: formData.referEarnSystem ? "#4CAF50" : "#ccc",
//                     cursor: "pointer",
//                     padding: "3px",
//                     transition: "background-color 0.3s",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "22px",
//                       height: "22px",
//                       borderRadius: "50%",
//                       backgroundColor: "#fff",
//                       transform: formData.referEarnSystem ? "translateX(28px)" : "translateX(0)",
//                       transition: "transform 0.3s",
//                     }}
//                   />
//                 </div>
//               </div>
//             </Col>
//             <GridField label="Min Order Amount (RM)">
//               <Input style={inputStyle} type="number" name="minReferEarnOrderAmount" value={formData.minReferEarnOrderAmount} onChange={handleChange} />
//             </GridField>
//             <GridField label="Refer Bonus (RM or %)">
//               <Input style={inputStyle} type="number" name="referEarnBonus" value={formData.referEarnBonus} onChange={handleChange} />
//             </GridField>
//             <GridField label="Earn Method">
//               <Input style={inputStyle} type="select" name="referEarnMethod" value={formData.referEarnMethod} onChange={handleChange}>
//                 <option>Percentage</option>
//                 <option>Fixed</option>
//               </Input>
//             </GridField>
//             <GridField label="Max Earn Amount (RM)">
//               <Input style={inputStyle} type="number" name="maxReferEarnAmount" value={formData.maxReferEarnAmount} onChange={handleChange} />
//             </GridField>
//             <GridField label="Min Withdrawal Amount">
//               <Input style={inputStyle} type="number" name="minWithdrawalAmount" value={formData.minWithdrawalAmount} onChange={handleChange} />
//             </GridField>
//             <GridField label="Max Days to Return">
//               <Input style={inputStyle} type="number" name="maxDaysToReturn" value={formData.maxDaysToReturn} onChange={handleChange} />
//             </GridField>
//           </SectionCard>

//           {/* ===== Delivery Boy Settings ===== */}
//           <SectionCard title="🚴 Delivery Boy Settings">
//             <GridField label="Delivery Boy Bonus (%)" md={4}>
//               <Input style={inputStyle} type="number" name="deliveryBoyBonus" value={formData.deliveryBoyBonus} onChange={handleChange} />
//             </GridField>
//           </SectionCard>

//           {/* ===== Mail Settings ===== */}
//           <SectionCard title="📧 Mail / SMTP Settings">
//             <GridField label="From Email ID">
//               <Input style={inputStyle} type="email" name="fromEmail" value={formData.fromEmail} onChange={handleChange} />
//             </GridField>
//             <GridField label="Reply-To Email">
//               <Input style={inputStyle} type="email" name="replyToEmail" value={formData.replyToEmail} onChange={handleChange} />
//             </GridField>
//             <GridField label="Mail Username">
//               <Input style={inputStyle} type="text" name="mailUsername" value={formData.mailUsername} onChange={handleChange} />
//             </GridField>
//             <GridField label="Mail Password">
//               <Input style={inputStyle} type="password" name="mailPassword" value={formData.mailPassword} onChange={handleChange} placeholder="••••••••••••••" />
//             </GridField>
//             <GridField label="SMTP Host">
//               <Input style={inputStyle} type="text" name="smtpHost" value={formData.smtpHost} onChange={handleChange} />
//             </GridField>
//             <GridField label="SMTP Secure">
//               <Input style={inputStyle} type="select" name="smtpSecure" value={formData.smtpSecure} onChange={handleChange}>
//                 <option>SSL</option>
//                 <option>TLS</option>
//                 <option>None</option>
//               </Input>
//             </GridField>
//             <GridField label="SMTP Port">
//               <Input style={inputStyle} type="number" name="smtpPort" value={formData.smtpPort} onChange={handleChange} />
//             </GridField>
//             <Col md={12} className="mb-3 d-flex align-items-center">
//               <FormGroup check className="mb-0">
//                 <Label check style={{ fontSize: "14px", fontWeight: 500, color: "#495057" }}>
//                   <Input
//                     type="checkbox"
//                     name="loginWithSmsOtp"
//                     checked={formData.loginWithSmsOtp}
//                     onChange={handleChange}
//                   />{" "}
//                   Login With SMS OTP
//                 </Label>
//               </FormGroup>
//             </Col>
//           </SectionCard>

//           {/* Submit Button */}
//           <div className="d-flex justify-content-end mb-5">
//             <Button
//               color="primary"
//               type="submit"
//               style={{
//                 padding: "10px 36px",
//                 borderRadius: "8px",
//                 fontWeight: 600,
//                 fontSize: "15px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 border: "none",
//                 boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
//               }}
//             >
//               💾 Update Settings
//             </Button>
//           </div>

//         </Form>
//       </Container>
//     </Fragment>
//   );
// };

// export default Settings;
