const { spawn } = require("child_process");

const services = [
  { name: "IDENTITY", path: "./identity-service", color: "\x1b[36m" },
  { name: "PRODUCT", path: "./catalog-service", color: "\x1b[32m" },
  { name: "CATEGORY", path: "./taxonomy-service", color: "\x1b[33m" },
  { name: "ORDER", path: "./purchase-service", color: "\x1b[35m" },
  { name: "GATEWAY", path: "./gateway-hub", color: "\x1b[31m" }
];

function startService(service) {
  const proc = spawn("node", ["server.js"], {
    cwd: service.path,
    shell: true
  });

  proc.stdout.on("data", (data) => {
    console.log(`${service.color}[${service.name}] ${data}\x1b[0m`);
  });

  proc.stderr.on("data", (data) => {
    console.error(`${service.color}[${service.name} ERROR] ${data}\x1b[0m`);
  });

  proc.on("close", (code) => {
    console.log(
      `${service.color}[${service.name}] stopped with code ${code}. Restarting...\x1b[0m`
    );
    setTimeout(() => startService(service), 2000);
  });
}

console.log("\nStarting Microservices...\n");

services.forEach(startService);