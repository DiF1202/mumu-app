import { fetch } from "@/utils/http";
const overViewApi = () => {
  return fetch({
    method: "get",
    url: "/api/mini/get-production-view"
  });
};
const productionApi = params => {
  return fetch({
    method: "get",
    url: "/api/mini/get-production-detail",
    params
  });
};
const overViewGuardApi = () => {
  return fetch({
    method: "get",
    url: "/api/mini/get-house-env-view"
  });
};
const summaryApi = () => {
  return fetch({
    method: "get",
    url: "/api/mini/get-yesterday-summary"
  });
};
const dingListApi = () => {
  return fetch({
    method: "get",
    url: "/api/mini/get-ding-list"
  });
};
const riskStatementApi = (query) => {
  return fetch({
    method: "get",
    url: "/api/mini/get-guardian-risk-statement",
    params: query
  });
};
const getAiReportDaily = () => {
  return fetch({
    method: "get",
    url: "/api/mini/get-daily-briefing"
  });
};
export {
  overViewApi,
  productionApi,
  overViewGuardApi,
  summaryApi,
  dingListApi,
  riskStatementApi,
  getAiReportDaily
};
