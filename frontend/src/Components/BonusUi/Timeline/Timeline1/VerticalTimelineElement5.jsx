import React from "react";
import { H4, Image } from "../../../../AbstractElements";
import { TimelineElement5Heading } from "../../../../Constant";
import { dynamicImage } from "../../../../Services";

const VerticalTimelineElement5 = () => {
  return (
    <div className="cd-timeline-block">
      <div className="cd-timeline-img cd-location bg-warning bounce-in">
        <i className="icon-image" />
      </div>
      <div className="cd-timeline-content bounce-in">
        <H4>{TimelineElement5Heading}</H4>
        <Image
          attrImage={{
            className: "img-fluid p-t-20",
            src: dynamicImage("banner/3.jpg"),
            alt: "timelineImg2",
          }}
        />
        <span className="cd-date f-w-600">
          Feb <span className="counter">18</span>
        </span>
      </div>
    </div>
  );
};

export default VerticalTimelineElement5;
