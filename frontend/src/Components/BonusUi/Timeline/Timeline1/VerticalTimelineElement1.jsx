import { H4, P } from "../../../../AbstractElements";
import { TimelineElement1Heading, TimelineElement1Paragraph } from "../../../../Constant";

const VerticalTimelineElement1 = () => {
  return (
    <div className="cd-timeline-block">
      <div className="cd-timeline-img cd-picture bg-primary">
        <i className="icon-pencil-alt" />
      </div>
      <div className="cd-timeline-content">
        <H4>{TimelineElement1Heading}</H4>
        <P className="m-0">{TimelineElement1Paragraph}</P>
        <span className="cd-date f-w-600">
          Jan <span className="counter"> 14</span>
        </span>
      </div>
    </div>
  );
};

export default VerticalTimelineElement1;
