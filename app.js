const fs = require("fs");
const SERIAL_PORT = process.env.SERIAL_PORT;
const INTERVAL = process.env.INTERVAL || 500;
const socat = require("./socat");

async function main() {
    try {
        console.log(
            `============================ starting ============================`
        );
        let port = SERIAL_PORT;
        if (!SERIAL_PORT) {
            const ptys = await socat();
            port = ptys.stdin;
            console.log(
                `Serial port binding: ${ptys.stdin} <======> ${ptys.stdout}`
            );
        }

        console.log(`Serial port: ${port}`);
        console.log(`Interval Time: ${INTERVAL}ms`);
        console.log(
            `===================================================================\n`
        );

        console.log(`[x] opening virtual serial port: ${port}`);

        const tty = fs.createWriteStream(port);

        console.log("[x] loading fake data..");
        const messages = require("./fake_messages");

        const loop = () => {
            const random = Math.floor(Math.random() * messages.length);
            const message = messages[random];
            tty.write(message);
            console.log(message);
        };
        console.log(`[x] writing fake data to ${port}`);

        setTimeout(setInterval(loop, INTERVAL), 2000);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
