import { H4, P } from "../../../../AbstractElements";
import { FinalTesting, TimelineElement6Paragraph } from "../../../../Constant";

const VerticalTimelineElement6 = () => {
  return (
    <div className="cd-timeline-block">
      <div className="cd-timeline-img cd-movie bg-danger bounce-in">
        <i className="icon-pencil-alt" />
      </div>
      <div className="cd-timeline-content bounce-in">
        <H4>{FinalTesting}</H4>
        <P className="m-0">{TimelineElement6Paragraph}</P>
        <span className="cd-date f-w-600">
          Feb <span className="counter">26</span>
        </span>
      </div>
    </div>
  );
};

export default VerticalTimelineElement6;
