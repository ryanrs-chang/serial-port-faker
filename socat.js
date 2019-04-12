const { spawn } = require("child_process");

module.exports = function() {
    return new Promise((resolve, reject) => {
        const ptys = { stdin: null, stdout: null };
        let lock = false;

        let socat = spawn("socat", [
            "-d",
            "-d",
            "-v",
            "pty,raw,echo=0",
            "pty,raw,echo=0"
        ]);

        socat.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
        });
        socat.stderr.on("data", buf => {
            const str = buf.toString();
            if (str && !lock) {
                const found = str.match(/N PTY is .*.\n/i);
                if (found) {
                    const pty = found[0]
                        .replace(/N PTY is /, "")
                        .replace(/\n/, "");
                    if (!ptys.stdin) {
                        ptys.stdin = pty;
                    } else if (ptys.stdin && !ptys.stdout) {
                        lock = true;
                        ptys.stdout = pty;
                        resolve(ptys);
                    }
                }
            }
        });

        socat.on("close", code => {
            console.log(`child process exited with code ${code}`);
            socat.stdin.end();
            reject();
        });
    });
};
