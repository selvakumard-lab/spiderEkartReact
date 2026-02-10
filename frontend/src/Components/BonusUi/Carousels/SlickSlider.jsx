import Slider from "react-slick";
import { Card, CardBody } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";
import { CarouselsData } from "../../../Data/Bonus-ui";

const SlickSlider = ({ slides, scroll, rtl, title, lazyLoad, autoplay, focusOnSelect, center }) => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: autoplay,
    speed: 1000,
    arrows: false,
    slidesToShow: slides,
    slidesToScroll: scroll,
    adaptiveHeight: true,
    centerPadding: "10px",
    centerMode: center ? true : false,
    rtl: rtl,
    focusOnSelect: focusOnSelect ? true : false,
    lazyLoad: lazyLoad ? true : false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Card>
      <HeaderCard title={title} />
      <CardBody>
        <Slider {...settings}>
          {CarouselsData.map((item, i) => (
            <div className="item" key={i}>
              <img src={item.img} alt="" className="img-fluid" />
            </div>
          ))}
        </Slider>
      </CardBody>
    </Card>
  );
};

export default SlickSlider;
