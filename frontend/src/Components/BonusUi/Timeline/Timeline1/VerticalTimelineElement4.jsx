import React from "react";
import { H4 } from "../../../../AbstractElements";
import { TimelineElement4Heading } from "../../../../Constant";

const VerticalTimelineElement4 = () => {
  return (
    <div className="cd-timeline-block">
      <div className="cd-timeline-img cd-location bg-info bounce-in">
        <i className="icon-pulse" />
      </div>
      <div className="cd-timeline-content bounce-in">
        <H4>{TimelineElement4Heading}</H4>
        <audio controls preload="none">
          <source src={require("../../../../assets/audio/horse.ogg")} type="audio/ogg" />
          {"Your browser does not support the audio element."}
        </audio>
        <span className="cd-date f-w-600">
          Feb <span className="counter">14</span>
        </span>
      </div>
    </div>
  );
};

export default VerticalTimelineElement4;
