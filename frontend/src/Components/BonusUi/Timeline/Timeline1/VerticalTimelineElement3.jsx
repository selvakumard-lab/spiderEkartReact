import { H4, Image } from "../../../../AbstractElements";
import { TimelineElement3Heading } from "../../../../Constant";
import { dynamicImage } from "../../../../Services";

const VerticalTimelineElement3 = () => {
  return (
    <div className="cd-timeline-block">
      <div className="cd-timeline-img cd-picture bg-success bounce-in">
        <i className="icon-image" />
      </div>
      <div className="cd-timeline-content bounce-in">
        <H4>{TimelineElement3Heading}</H4>
        <Image
          attrImage={{
            className: "img-fluid p-t-20",
            src: dynamicImage("banner/1.jpg"),
            alt: "timelineImg1",
          }}
        />
        <span className="cd-date f-w-600">
          Jan <span className="counter">24</span>
        </span>
      </div>
    </div>
  );
};

export default VerticalTimelineElement3;
