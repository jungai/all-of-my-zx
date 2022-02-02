#!/usr/bin/env zx

import "zx/globals";

const pushTagArgs = {
  v: {
    alias: "version",
    value: "major | minor | patch",
    default: "patch",
  },
};

function checkIsValidVersion(v?: boolean | string) {
  const validVersions = ["major", "minor", "patch"];

  const version = validVersions.find((version) => version === v);

  if (!version) {
    throw new Error(`version value must be ${pushTagArgs["v"].value}`);
  }

  return version;
}

(async () => {
  const target = checkIsValidVersion(argv["v"]);
  const version = await $`npm version ${target}`;

  await $`git push origin master`;
  await $`git push origin ${version}`;
})().catch((error: any) => {
  console.log(`error ${error}`);
});
