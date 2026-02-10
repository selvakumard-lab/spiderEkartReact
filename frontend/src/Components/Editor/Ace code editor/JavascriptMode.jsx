import { Highlight, themes } from "prism-react-renderer";
import { Card, CardBody, Col } from "reactstrap";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import { JavascriptModes } from "../../../Constant";
import { Javadata } from "./data";

const JavascriptMode = () => {
  return (
    <Col xl="6">
      <Card>
        <HeadingCommon CardHeaderClassName="pb-0" Heading={JavascriptModes} />
        <CardBody>
          <Highlight theme={themes.vsDark} code={Javadata} language="javascript">
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
export default JavascriptMode;
