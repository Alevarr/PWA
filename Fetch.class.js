"use strict";

export class Fetch {
  constructor(url, method = "POST", async = true) {
      this.url = url;
      this.method = method;
      this.async = async;
  }
  /**
   * Returns fetch() response in format specified by attribute.
   * @param {string} dataType "text", "json", "formData" or "blob".
   */
   async request(dataType = "json") {

       let response = await fetch(this.url);
       switch (dataType) {
           case "text":
              return await response.text();
          case "json":
              return await response.json();
          case "formData":
              return await response.formData();
          case "blob":
              return await response.arrayBuffer();
           default:
               throw new Error("Invalid attribute given");
       }
      
      
   }
}

