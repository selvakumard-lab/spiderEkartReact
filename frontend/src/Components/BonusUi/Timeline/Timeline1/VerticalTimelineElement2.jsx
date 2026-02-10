import React from "react";
import { H4 } from "../../../../AbstractElements";
import { TimelineElement2Heading } from "../../../../Constant";

const VerticalTimelineElement2 = () => {
  return (
    <div className="cd-timeline-block">
      <div className="cd-timeline-img cd-movie bg-secondary">
        <i className="icon-video-camera" />
      </div>
      <div className="cd-timeline-content">
        <H4>2{TimelineElement2Heading}</H4>
        <div className="ratio ratio-21x9 m-t-20">
          <iframe src="https://www.youtube.com/embed/wpmHZspl4EM" allowFullScreen title="myFrame" />
        </div>
        <span className="cd-date f-w-600">
          Jan <span className="counter">18</span>
        </span>
      </div>
    </div>
  );
};

export default VerticalTimelineElement2;
