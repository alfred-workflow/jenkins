import Jenkins from "@liangshen/jenkins";
import alfred from "@alfred-workflows/core";

const protocol = alfred.env['protocol']! as 'http' | 'https';
const port = +alfred.env['port']!;
const host = alfred.env['host']!;
const username = alfred.env['username']!;
const password = alfred.env['password']!;

export const jenkins = new Jenkins({
    port,
    host,
    username,
    password,
    protocol
});