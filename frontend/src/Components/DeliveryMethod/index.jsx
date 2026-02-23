// import React, { Fragment, useState } from "react";
// import { H4, Breadcrumbs } from "../../AbstractElements";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardHeader,
//   CardBody,
//   Input,
//   Label,
//   Button,
//   FormGroup,
// } from "reactstrap";

// const DeliveryMethod = () => {

//   /* ---------------- STATE ---------------- */

//   const [storePickup, setStorePickup] = useState(false);
//   const [inPerson, setInPerson] = useState(false);
//   const [ownDelivery, setOwnDelivery] = useState(false);
//   const [donzo, setDonzo] = useState(false);

//   const [form, setForm] = useState({
//     firstKmCharge: "",
//     restKmCharge: "",
//     clientId: "",
//     clientSecret: "",
//   });

//   /* ---------------- HANDLERS ---------------- */

//   const handleStorePickup = () => {
//     setStorePickup(!storePickup);
//     if (!storePickup) {
//       // disable other options
//       setInPerson(false);
//       setOwnDelivery(false);
//       setDonzo(false);
//     }
//   };

//   const handleInPerson = () => {
//     setInPerson(!inPerson);
//     setStorePickup(false);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     let payload = {};

//     if (storePickup) {
//       payload = { deliveryType: 1 };
//     }

//     if (inPerson && ownDelivery) {
//       payload = {
//         deliveryType: 2,
//         method: "own_delivery",
//         firstKmCharge: form.firstKmCharge,
//         restKmCharge: form.restKmCharge,
//       };
//     }

//     if (inPerson && donzo) {
//       payload = {
//         deliveryType: 2,
//         method: "donzo",
//         clientId: form.clientId,
//         clientSecret: form.clientSecret,
//       };
//     }

//     console.log("SAVE DATA =>", payload);
//     alert("Check console — data ready to API");
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <Fragment>
//       <Breadcrumbs mainTitle="Delivery Method" parent="Settings" title="Delivery Method" />

//       <Container fluid>
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader className="pb-0">
//                 <H4>Delivery Configuration</H4>
//               </CardHeader>

//               <CardBody>

//                 {/* STORE PICKUP */}
//                 <FormGroup check className="mb-3">
//                   <Input type="checkbox" checked={storePickup} onChange={handleStorePickup} />
//                   <Label check className="ms-2">Store Pickup</Label>
//                 </FormGroup>

//                 {/* IN PERSON DELIVERY */}
//                 <FormGroup check className="mb-3">
//                   <Input type="checkbox" checked={inPerson} onChange={handleInPerson} />
//                   <Label check className="ms-2">In Person Delivery</Label>
//                 </FormGroup>

//                 {/* SUB OPTIONS */}
//                 {inPerson && (
//                   <div className="ms-4 mt-3">

//                     {/* OWN DELIVERY */}
//                     <FormGroup check className="mb-2">
//                       <Input type="checkbox" checked={ownDelivery} onChange={() => setOwnDelivery(!ownDelivery)} />
//                       <Label check className="ms-2">Own Delivery Boy</Label>
//                     </FormGroup>

//                     {ownDelivery && (
//                       <div className="ms-4 mt-3">
//                         <Row>
//                           <Col md="6">
//                             <Label>Delivery Charge for first per Km (₹)</Label>
//                             <Input
//                               type="number"
//                               name="firstKmCharge"
//                               value={form.firstKmCharge}
//                               onChange={handleChange}
//                               placeholder="45"
//                             />
//                           </Col>

//                           <Col md="6">
//                             <Label>Delivery Charge for rest of the kilometers (₹)</Label>
//                             <Input
//                               type="number"
//                               name="restKmCharge"
//                               value={form.restKmCharge}
//                               onChange={handleChange}
//                               placeholder="10"
//                             />
//                           </Col>
//                         </Row>
//                       </div>
//                     )}

//                     {/* DONZO */}
//                     <FormGroup check className="mt-4 mb-2">
//                       <Input type="checkbox" checked={donzo} onChange={() => setDonzo(!donzo)} />
//                       <Label check className="ms-2">Donzo</Label>
//                     </FormGroup>

//                     {donzo && (
//                       <div className="ms-4 mt-3">
//                         <Row>
//                           <Col md="6">
//                             <Label>Client ID</Label>
//                             <Input
//                               type="text"
//                               name="clientId"
//                               value={form.clientId}
//                               onChange={handleChange}
//                               placeholder="Enter Client ID"
//                             />
//                           </Col>

//                           <Col md="6">
//                             <Label>Client Secret Key</Label>
//                             <Input
//                               type="text"
//                               name="clientSecret"
//                               value={form.clientSecret}
//                               onChange={handleChange}
//                               placeholder="Enter Secret Key"
//                             />
//                           </Col>
//                         </Row>
//                       </div>
//                     )}

//                   </div>
//                 )}

//                 {/* SAVE BUTTON */}
//                 <div className="text-end mt-4">
//                   <Button color="primary" onClick={handleSubmit}>
//                     Save Settings
//                   </Button>
//                 </div>

//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </Fragment>
//   );
// };

// export default DeliveryMethod;


import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Input, Label, Button, FormGroup,Row, Col } from "reactstrap";
import { H4 } from "../../AbstractElements";
import api from "../../Services/api";
import { toast } from "react-toastify";

const DeliveryMethod = () => {

  const [storePickup, setStorePickup] = useState(false);
  const [inPerson, setInPerson] = useState(false);
  const [courier, setCourier] = useState(false);

  // sub options
  const [ownBoy, setOwnBoy] = useState(false);
  const [dunzo, setDunzo] = useState(false);

  // own delivery
  const [firstKm, setFirstKm] = useState("");
  const [restKm, setRestKm] = useState("");

  // dunzo
  const [clientId, setClientId] = useState("");
  const [secretKey, setSecretKey] = useState("");

  // courier
  const [zone1, setZone1] = useState("");
  const [zone2, setZone2] = useState("");
  const [zone3, setZone3] = useState("");
  const [zone4, setZone4] = useState("");

  // LOAD DATA
  useEffect(() => {
    api.get("/delverymethod").then((res) => {
      res.data.forEach((m) => {

        if (m.type === "store_pickup")
          setStorePickup(m.is_active);

        if (m.type === "in_person") {
          setInPerson(m.is_active);

          setOwnBoy(m.config?.own_delivery?.enabled || false);
          setFirstKm(m.config?.own_delivery?.first_km_charge || "");
          setRestKm(m.config?.own_delivery?.rest_km_charge || "");

          setDunzo(m.config?.dunzo?.enabled || false);
          setClientId(m.config?.dunzo?.client_id || "");
          setSecretKey(m.config?.dunzo?.client_secret || "");
        }

        if (m.type === "courier") {
          setCourier(m.is_active);
          setZone1(m.config?.zone1 || "");
          setZone2(m.config?.zone2 || "");
          setZone3(m.config?.zone3 || "");
          setZone4(m.config?.zone4 || "");
        }

      });
    });
  }, []);

  // SAVE
  const handleSave = async () => {

    const payload = {
      methods: [
        {
          type: "store_pickup",
          is_active: storePickup,
          config: null,
        },
        {
          type: "in_person",
          is_active: inPerson,
          config: {
            own_delivery: {
              enabled: ownBoy,
              first_km_charge: firstKm,
              rest_km_charge: restKm,
            },
            dunzo: {
              enabled: dunzo,
              client_id: clientId,
              client_secret: secretKey,
            }
          },
        },
        {
          type: "courier",
          is_active: courier,
          config: { zone1, zone2, zone3, zone4 },
        },
      ],
    };

    await api.post("/delverymethod", payload);
    toast.success("Saved Successfully");
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <H4>Delivery Method</H4>
      </CardHeader>
      <hr />
      <CardBody>

        {/* STORE PICKUP */}
        <FormGroup check>
          <Input
            type="checkbox"
            checked={storePickup}
            onChange={(e) => setStorePickup(e.target.checked)}
            style={{ transform: "scale(2.5)", marginRight: "20px" }}
          />
          <Label check style={{ fontSize: "16px" }}>Store Pickup</Label>
        </FormGroup>


        <hr />

        {/* IN PERSON */}
        <FormGroup check>
          <Input type="checkbox" checked={inPerson}
            onChange={(e) => setInPerson(e.target.checked)} 
            style={{ transform: "scale(2.5)", marginRight: "20px" }}
            />
          <Label check>In Person Delivery</Label>
        </FormGroup>

        {inPerson && (
          <div className="ms-3 mt-3">

            {/* OWN DELIVERY BOY */}
            <FormGroup check>
              <Input type="checkbox" checked={ownBoy}
                onChange={(e) => setOwnBoy(e.target.checked)} style={{ transform: "scale(2.5)", marginRight: "20px" }} />
              <Label check>Own Delivery Boy</Label>
            </FormGroup>

            {ownBoy && (
              <Row className="mt-2 g-2">
                <Col md="3">
                  <Label>First KM Charge</Label>
                  <Input
                    placeholder="First KM Charge"
                    value={firstKm}
                    onChange={(e) => setFirstKm(e.target.value)}
                  />
                </Col>

                <Col md="3">
                  <Label>Rest KM Charge</Label>
                  <Input
                    placeholder="Rest KM Charge"
                    value={restKm}
                    onChange={(e) => setRestKm(e.target.value)}
                  />
                </Col>
              </Row>
            )}


            {/* DUNZO */}
            <FormGroup check className="mt-3">
              <Input type="checkbox" checked={dunzo}
                onChange={(e) => setDunzo(e.target.checked)} style={{ transform: "scale(2.5)", marginRight: "20px" }}/>
              <Label check>Dunzo</Label>
            </FormGroup>

            {dunzo && (
              <Row className="mt-2 g-2">
                <Col md="3">
                  <Label>Dunzo Client ID</Label>
                  <Input
                    placeholder="Dunzo Client ID"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                </Col>

                <Col md="3">
                  <Label>Dunzo Secret Key</Label>
                  <Input
                    placeholder="Dunzo Secret Key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                  />
                </Col>
              </Row>
            )}


          </div>
        )}

        <hr />

        {/* COURIER */}
        <FormGroup check>
          <Input type="checkbox" checked={courier}
            onChange={(e) => setCourier(e.target.checked)} style={{ transform: "scale(2.5)", marginRight: "20px" }}/>
          <Label check>Delivery By Courier</Label>
        </FormGroup>

        {courier && (
          <Row className="mt-2 g-2">
            <Col md="3">
              <Label>Zone 1</Label>
              <Input
                placeholder="Zone 1 Charge"
                value={zone1}
                onChange={(e) => setZone1(e.target.value)}
              />
            </Col>

            <Col md="3">
            <Label>Zone 2</Label>
              <Input
                placeholder="Zone 2 Charge"
                value={zone2}
                onChange={(e) => setZone2(e.target.value)}
              />
            </Col>

            <Col md="3">
            <Label>Zone 3</Label>
              <Input
                placeholder="Zone 3 Charge"
                value={zone3}
                onChange={(e) => setZone3(e.target.value)}
              />
            </Col>

            <Col md="3">
            <Label>Zone 4</Label>
              <Input
                placeholder="Zone 4 Charge"
                value={zone4}
                onChange={(e) => setZone4(e.target.value)}
              />
            </Col>
          </Row>
        )}


        <Button color="primary" className="mt-4" onClick={handleSave}>
          Save Settings
        </Button>

      </CardBody>
    </Card>
  );
};

export default DeliveryMethod;
