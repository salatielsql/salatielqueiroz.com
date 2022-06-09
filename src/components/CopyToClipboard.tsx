import * as React from "react";
import { useState } from "react";

// import copyToClipboard from "../utils/copy-to-clipboard"
const copyToClipboard = (str: string) => {
  const { clipboard } = window.navigator;
  /*
   * fallback to older browsers (including Safari)
   * if clipboard API is not supported
   */
  if (!clipboard || typeof clipboard.writeText !== `function`) {
    const textarea = document.createElement(`textarea`);
    textarea.value = str;
    textarea.setAttribute(`readonly`, `true`);
    textarea.setAttribute(`contenteditable`, `true`);
    textarea.style.position = `absolute`;
    textarea.style.left = `-9999px`;
    document.body.appendChild(textarea);
    textarea.select();
    const range = document.createRange();
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    textarea.setSelectionRange(0, textarea.value.length);
    document.execCommand(`copy`);
    document.body.removeChild(textarea);

    return Promise.resolve(true);
  }

  return clipboard.writeText(str);
};

const delay = (duration: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

type CopyProps = {
  content: string;
  duration?: number;
  fileName?: string;
  trim?: boolean;
};

const Copy = ({
  content,
  duration = 5000,
  fileName = ``,
  trim = false,
}: CopyProps) => {
  const [copied, setCopied] = useState(false);
  console.log("copybutton");
  const label = copied
    ? `${fileName ? `${fileName} ` : ``}copied to clipboard`
    : `${fileName ? `${fileName}: ` : ``}copy code to clipboard`;

  return (
    <button
      type="button"
      name={label}
      disabled={copied}
      className="code-copy-button"
      sx={{
        variant: `copyButton`,
      }}
      onClick={async () => {
        await copyToClipboard(trim ? content.trim() : content);
        setCopied(true);
        await delay(duration);
        setCopied(false);
      }}
    >
      {copied ? `Copied` : `Copy`}
      <span hidden aria-roledescription="status">
        {label}
      </span>
    </button>
  );
};

export default Copy;
