const fs = require("fs");
const SERIAL_PORT = process.env.SERIAL_PORT || "/dev/ttys004";
const INTERVAL = process.env.INTERVAL || 500;
console.log(`Serial Port: ${SERIAL_PORT}`);
console.log(`Interval Time: ${INTERVAL}ms`);
console.log("");

console.log("[x] opening virtual serial port..");
const tty = fs.createWriteStream(SERIAL_PORT);

console.log("[x] loading fake data..");
const messages = require("./fake_messages");

setInterval(() => {
    const random = Math.floor(Math.random() * messages.length);
    const message = messages[random];
    tty.write(message);
    console.log(message);
}, INTERVAL);
