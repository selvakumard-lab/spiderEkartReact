import SocialAuth from "./SocialAuth";

const FormHeader = () => {
  return (
    <div>
      <ul className="simple-list login-social d-flex">
        <SocialAuth />
      </ul>
    </div>
  );
};
export default FormHeader;
