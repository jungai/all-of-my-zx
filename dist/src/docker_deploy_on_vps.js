#!/usr/bin/env zx
import "zx/globals";
import { getSomeKey } from "../utils/get_env/index.js";
void (async () => {
    console.log(getSomeKey());
    console.log("deploy 🚀");
})();
