import React, { useContext } from "react";
import { EnvButton } from "./EnvButton";
import { Keys } from "./Keys";
import { appStore } from "./../state/app";

import "./DialogActions";

const MATCHES = {
  YOUR_DESIRED_APP_NAME: "[YOUR_DESIRED_APP_NAME]",
  NFT_DESCRIPTION: "[NFT_DESCRIPTION]",
  API_ORIGIN: "[API_ORIGIN]",
  YOUR_APP_NAME: "[YOUR_APP_NAME]",
  YOUR_API_KEY: "[YOUR_API_KEY]",
  ACCOUNT_ID: "[ACCOUNT_ID]",
  YOUR_DESIRED_COLLECTION_TITLE: "[YOUR_DESIRED_COLLECTION_TITLE]",
  SERIES_ID: "[SERIES_ID]",
  NUMBER_OF_LINKS: "[NUMBER_OF_LINKS]",
};

const allowNoInput = [MATCHES.NFT_DESCRIPTION];

const isValidInput = (match, input) => {
  if (!input && !allowNoInput.includes(match)) return false;
  if (input && match === MATCHES.YOUR_DESIRED_APP_NAME) {
    if (/[/]/.test(input) || input.length > 32) return false;
  }
  if (input && match === MATCHES.YOUR_DESIRED_COLLECTION_TITLE) {
    if (input.length > 32) return false;
  }
  if (input && match === MATCHES.NUMBER_OF_LINKS) {
    return !isNaN(Number(input));
  }
  return true;
};

export const TryItNow = ({ requiresKeys }) => {
  const {
    state: {
      app: { env, keys },
    },
  } = useContext(appStore);
  const key = keys[env]?.__selected;

  return (
    <button
      className="custom-button table-of-contents__link"
      disabled={
        (!key && requiresKeys) ||
        (env === "mainnet" && !/ENV=mainnet/.test(window.location.href))
      }
      onClick={async ({ target }) => {
        const { appName, apiKey } = requiresKeys ? key : {};

        if (document.querySelector("section.modal")) {
          return;
        }

        let code = target.previousSibling.textContent;

        const matches = code.match(/\[.*?\]/gi).filter((m) => m.length > 2);

        try {
          for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            let input;
            switch (match) {
              case MATCHES.API_ORIGIN:
                code = code.replace(
                  match,
                  `https://spearmint-${env}.satdev.workers.dev`
                );
                continue;
              case MATCHES.YOUR_APP_NAME:
                input = appName;
                break;
              case MATCHES.YOUR_API_KEY:
                input = apiKey;
                break;
            }
            const tag = !allowNoInput.includes(match) ? " (required)" : "";
            if (!input) input = await window.prompt(match + tag);
            if (!isValidInput(match, input)) {
              i--;
              continue;
            }
            if (input && match === MATCHES.SERIES_ID && !code.includes("body"))
              input = encodeURIComponent(input); // SERIES_ID contains a slash, so needs to be uri-encoded (unless it is in the request body, hence !code.includes(body))
            if (input && match === MATCHES.ACCOUNT_ID)
              input = '"' + input + '"'; // ACCOUNT_ID has dots, potentially dashes, and will become object property - so needs to be wrapped in quotes
            code = code.replace(match, input);
          }
          eval(`(async () => {
					const res = ${code.substr(0, code.length - 4)};
					let ret
					switch (res.ok) {
						case true: ret = await res.json(); break;
						case false: ret = await res.text(); break;
						case undefined: ret = res; break;
					}
					console.log(ret);
					return alert(ret);
				})()`);
        } catch (e) {
          console.log("error: ", e);
          return;
        }
      }}
    >
      Try it now!
    </button>
  );
};

/// TryItNow has to be first
export const TryItNowWithEnv = ({ requiresKeys = true }) => (
  <>
    <TryItNow {...{ requiresKeys }} />
    {requiresKeys && <Keys />}
    <EnvButton />
  </>
);
