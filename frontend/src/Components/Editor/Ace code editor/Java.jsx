import { Highlight, themes } from "prism-react-renderer";
import { Card, CardBody, Col } from "reactstrap";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import { JavaModes } from "../../../Constant";
import { Typescript } from "./data";

const JavaMode = () => {
  return (
    <Col xl="6">
      <Card>
        <HeadingCommon CardHeaderClassName="pb-0" Heading={JavaModes} />
        <CardBody>
          <Highlight theme={themes.vsDark} code={Typescript} language="tsx">
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </CardBody>
      </Card>
    </Col>
  );
};
export default JavaMode;
