const axios = require("axios");
const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ1MzBkMzQwNDIzMDFmZWFjNWRhYTE2Zjk0MDE5NjUxNTRkZjI3MmJiMjljMTkxNTI0MTE3YTVmOWQ0YTFlZjg0ZDYxZjU3YmE3ZTUwOTcyIn0.eyJhdWQiOiIxMTkxMSIsImp0aSI6ImQ1MzBkMzQwNDIzMDFmZWFjNWRhYTE2Zjk0MDE5NjUxNTRkZjI3MmJiMjljMTkxNTI0MTE3YTVmOWQ0YTFlZjg0ZDYxZjU3YmE3ZTUwOTcyIiwiaWF0IjoxNjA4MDIwODI3LCJuYmYiOjE2MDgwMjA4MjcsImV4cCI6MTYxMDUyNjQyNywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.sw-E84HmxjmCcFZwqpmu-V_Io8ak_tN2vRfYfEZCEtvccgEelu6kIJ4XgbKho9XqFx-0tZYSfVUHNa4EE6LAH9yH15oEHT-VV4BL9jbUGkuWZg5Pv5Z8m6ql9tl7mVobAEcxCU2f3MGNoMr1Ivv1KwYpf6rxPyXhZn_NV6rEmtlcrmbHAc_8SIRz1w116viSNMwj-6Mcr8gvwm3u_4g0-OHZv81pWgrRYhc8C5DC51JAGIYagIGXHqP8i3VurKw2msdin8y6gEw78mz1lU2f0eim8LY0ug-EMnvp4wjCA7iYWqgVFB_xLxodqLfe5Bsd8uInnyYJ025Q3aDzS39BtA";
const HttpHandler = require("./http-error");
async function getCoordsForAddress(address) {
  // const body = JSON.stringify({ text: "تهران" });
  // let response;
  // var config = {
  //   method: "post",
  //   url: "https://map.ir/search/v2",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-api-key": API_KEY,
  //   },
  //   data: body,
  // };
  // try {
  //   response = await axios(config);
  // } catch (error) {
  //   console.log(error);
  // }

  // const data = response.data;
  // if (!data || data.status === "ZERO_RESULTS") {
  //   const error = new HttpHandler(
  //     "Could not find location for the specified address",
  //     422
  //   );
  //   throw error;
  // }
  // const coordinates = {
  //   lat: data.value[0].geom.coordinates[0],
  //   lng: data.value[0].geom.coordinates[1]
  // };
  const coordinates = {
    lat: 36.3073889,
    lng: 59.5959445,
  };
  return coordinates;
}

module.exports = getCoordsForAddress;
