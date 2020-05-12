import { Referral } from "./eventModels/referral.js";
import { socialReferral } from "./utils/variables.js";
function init() {
    let referral = new Referral(socialReferral);
    referral.validateAndSend();

}

init();