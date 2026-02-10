import { Card, CardBody, Col, Row } from 'reactstrap';
import { P } from '../../../../AbstractElements';
import WeatherWidgets from '../Whether/WeatherWidget';
import { Clock } from 'react-feather';

const MobileWidgets = () => {
  const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  var d = new Date();
  let dateshow = month[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  
  return (
      <Col xxl="6" xl="12" sm="12" className="box-col-12 xl-100">
        <Card className='o-hidden'>
          <div className="weather-widget-two">
            <CardBody>
              <Row>
                <Col xl='5' md='6'>
                  <div className="mobile-clock-widget">
                    <div>
                      <Clock width='200px' height='200px' />
                      <div id="date" className="date f-24 mb-2">
                        <span>{dateshow}</span>
                        <P attrPara={{ className: 'm-0 f-14 text-light' }}>Kolkata, India</P>
                      </div>
                    </div>
                  </div>
                </Col>
                <WeatherWidgets />
              </Row>
            </CardBody>
          </div>
        </Card>
      </Col>
  );
};
export default MobileWidgets;