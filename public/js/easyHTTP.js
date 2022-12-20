class easyHTTP {
  //mAKE AN HTTP get request
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  //Make an HTTP POST request
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    //alert(resData.name);
    return resData;
  }
}
