The project using `socat` binding virtual serial port.

```
socat -d -d -v pty,raw,echo=0 pty,raw,echo=0

// logging
2019/04/05 23:03:00 socat[67968] N PTY is /dev/ttys004
2019/04/05 23:03:00 socat[67968] N PTY is /dev/ttys005
2019/04/05 23:03:00 socat[67968] N starting data transfer loop with FDs [5,5] and [7,7]
```

it's writing fake data to `/dev/ttys004`, another the device receive on `/dev/ttys005`.
