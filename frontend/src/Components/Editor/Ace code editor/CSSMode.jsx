import { Card, CardBody, Col } from "reactstrap";
import { Highlight, themes } from "prism-react-renderer";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import { CssModes } from "../../../Constant";
import { CssData } from "./data";

const CssMode = () => {
  return (
    <Col xl="6">
      <Card>
        <HeadingCommon CardHeaderClassName="pb-0" Heading={CssModes} />
        <CardBody>
          <Highlight theme={themes.vsDark} code={CssData} language="css">
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
export default CssMode;
