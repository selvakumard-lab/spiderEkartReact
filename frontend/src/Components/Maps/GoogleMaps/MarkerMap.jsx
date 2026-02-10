import { GoogleMap, InfoWindow } from "@react-google-maps/api";
import React, { Fragment, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import { MarkerMap } from "../../../Constant";

const containerStyle = {
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MarkerMapComp = (props) => {
  const [location] = useState({
    address: false,
    mapPosition: { lat: 18.5204, lng: 73.8567 },
    markerPosition: { lat: 18.5204, lng: 73.8567 },
  });
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "https://maps.googleapis.com/maps/api/js?key=your_api_key",
  // });

  return (
    <Fragment>
      <Col lg="6" md="12">
        <Card>
          <HeadingCommon Heading={MarkerMap} />
          <CardBody>
            <div className="map-js-height">
              <div id="gmap-simple" className="map-block">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                  {location.address ? (
                    <InfoWindow
                      position={{
                        lat: location.markerPosition.lat + 0.0018,
                        lng: location.markerPosition.lng,
                      }}
                    >
                      <div>
                        <span style={{ padding: 0, margin: 0 }}>{"Current Location"}</span>
                      </div>
                    </InfoWindow>
                  ) : (
                    ""
                  )}
                </GoogleMap>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};
export default MarkerMapComp;
