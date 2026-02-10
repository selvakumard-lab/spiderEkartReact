import { GoogleMap } from "@react-google-maps/api";
import { Card, CardBody, Col } from "reactstrap";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import { Polylines } from "../../../Constant";

const containerStyle = {
  height: "500px",
};
const center = {
  lat: -3.745,
  lng: -38.523,
};

const PolylinesMapComp = () => {
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "https://maps.googleapis.com/maps/api/js?key=your_api_key",
  // });

  return (
    <Col lg="6" md="12">
      <Card>
        <HeadingCommon Heading={Polylines} />
        <CardBody>
          <div className="map-js-height">
            <div id="gmap-simple" className="map-block">
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}></GoogleMap>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PolylinesMapComp;
