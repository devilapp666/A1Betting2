// Safe compiled version of AdvancedAnalyticsHub to prevent Chart.js errors
import React from "react";
import { default as TSXComponent } from "./AdvancedAnalyticsHub.tsx";

// Simply re-export the TypeScript version which has SafeChart
export default TSXComponent;
export { TSXComponent as AdvancedAnalyticsHub };
