"use strict";

const os = require("os");
const ifaces = os.networkInterfaces();
let address = [] as any;
Object.keys(ifaces).forEach((ifname) => {
  let alias = 0;
  ifaces[ifname].forEach((iface: any) => {
    if ("IPv4" !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // console.log(ifname + ":" + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      // console.log(ifname, iface.address);
    }
    address.push(iface.address);
    ++alias;
  });
});
if (address.length < 1) address = "";
else if (address.length === 1) address = address[0];
export default address;
