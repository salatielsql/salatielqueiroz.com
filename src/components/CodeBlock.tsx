import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import styled from "styled-components";
import theme from "prism-react-renderer/themes/dracula";
import Copy from "./CopyToClipboard";

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

const CodeTitle = styled.div`
  background-color: #d2c7ec;
  color: var(--theme-ui-colors-black);
  font-size: 0.875rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-family: "Roboto Mono", monospace;
  margin-left: 0;
  margin-right: 0;
`;

function getParams(className = ``) {
  const [lang = ``, params = ``] = className.split(`:`);

  return [
    // @ts-ignore
    lang.split(`language-`).pop().split(`{`).shift(),
  ].concat(
    // @ts-ignore
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`);
      // @ts-ignore
      merged[key] = value;
      return merged;
    }, {})
  );
}

export const CodeBlock = (props): JSX.Element => {
  const className = props.children.props.className || "";
  const params = getParams(className);
  console.log(params);
  const [language, { title = `` }] = getParams(className);
  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {title && <CodeTitle>{title}</CodeTitle>}
          <Copy content={props.children.props.children.trim()} title={title} />
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        </>
      )}
    </Highlight>
  );
};
