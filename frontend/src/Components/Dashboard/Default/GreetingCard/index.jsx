import { useState, useEffect } from "react";
import SunIcon from "./SunIcon";
import ClockIcon from "./ClockIcon";
import ProfileVector from "./ProfileVector";
import { H4 } from "../../../../AbstractElements";
import { Card, CardBody, Col } from "reactstrap";
import { Link } from "react-router-dom";
// import { John, TaskIsPending, WelcomeBack, Your } from "../../../../Constant";

const Greetingcard = () => {
  // const today = new Date();
  // const curHr = today.getHours();
  // const curMi = today.getMinutes();
  // const [meridiem, setMeridiem] = useState("AM");

  // useEffect(() => {
  //   if (curHr >= 12) {
  //     setMeridiem("PM");
  //   } else {
  //     setMeridiem("AM");
  //   }
  // }, []);

  const [time, setTime] = useState({
    hour: 12,
    minute: "0",
    meridiem: "AM",
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      let hour = now.getHours();
      const minute = now.getMinutes();

      const meridiem = hour >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      hour = hour % 12 || 12;

      setTime({
        hour,
        minute: minute.toString().padStart(1, "0"),
        meridiem,
      });
    };

    updateClock(); // run immediately
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  
  return (
    <Col xxl="6" xl="5" lg="6" className="dash-45 box-col-40">
      <Card className="profile-greeting">
        <CardBody>
          <div className="d-sm-flex d-block justify-content-between">
            <SunIcon />
            {/* <ClockIcon curHr={curHr} curMi={curMi} meridiem={meridiem} /> */}

            <ClockIcon
              curHr={time.hour}
              curMi={time.minute}
              meridiem={time.meridiem}
            />
          </div>
          <div className="greeting-user">
            <ProfileVector />
            <H4>
              <Link to={`${process.env.PUBLIC_URL}/users/user-profile`}>
                <span>Welcome Back</span>{" "}{user?.name || "User"}
              </Link>
              <span className="right-circle">
                <i className="fa fa-check-circle font-primary f-14 middle"></i>
              </span>
            </H4>
            <div>
              <span className="badge badge-primary">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1): "User"}</span>
              {/* <span className="font-primary f-12 middle f-w-500 ms-2"> {TaskIsPending}</span> */}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Greetingcard;
