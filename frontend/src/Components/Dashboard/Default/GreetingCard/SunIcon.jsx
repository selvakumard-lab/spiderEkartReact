import { H2, P } from "../../../../AbstractElements";
import { BeautifulSunnyDayWalk, SunnyDay } from "../../../../Constant";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const currentDay = days[today.getDay()]; // getDay() returns 0-6


const SunIcon = () => {
  return (
    <div className="flex-grow-1">
      <div className="weather d-flex">
        <H2 attrH2={{ className: "f-w-400" }}>
          <span>
            28
            <sup>
              <i className="fa fa-circle-o f-10"></i>
            </sup>
            C
          </span>
        </H2>
        <div className="span sun-bg">
          <i className="icofont icofont-sun font-primary"></i>
        </div>
      </div>
      <span className="font-primary f-w-700">{currentDay}</span>

      {/* <P>{BeautifulSunnyDayWalk}</P> */}
    </div>
  );
};

export default SunIcon;