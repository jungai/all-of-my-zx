#!/usr/bin/env zx
import { $ } from "zx";
import { getSomeKey } from "../utils/get_env";

void (async () => {
  console.log(getSomeKey());
  console.log("deploy 🚀");
})();
