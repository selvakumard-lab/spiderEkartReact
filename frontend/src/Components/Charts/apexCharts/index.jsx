import  { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import ApexLineChartClass from './ApexLineChart';
import AreaSpalineChartClass from './AreaSpalineChart';
import BarChartClass from './BarChart';
import BasicAreaChartClass from './BasicAreaChartClass';
import BubbleChartClass from './BubbleChart';
import CandlestickChartClass from './CandlestickChart';
import ColumnChartClass from './ColumnChart';
import MixedChartClass from './MixedChart';
import RadarChartClass from './RadarChart';
import SteplineChartClass from './SteplineChart';

const ApexchartsContain = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Apex charts" parent="Charts" title="Apex charts" />
      <Container fluid={true}>
        <Row>
          <BasicAreaChartClass />
          <AreaSpalineChartClass />
          <BarChartClass />
          <ColumnChartClass />
          <BubbleChartClass />
          <SteplineChartClass />
          <ApexLineChartClass />
          <MixedChartClass />
          <CandlestickChartClass />
          <RadarChartClass />
        </Row>
      </Container>
    </Fragment>
  );
};

export default ApexchartsContain;