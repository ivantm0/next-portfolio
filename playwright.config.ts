import { defineConfig, devices } from "@playwright/test";

// BASE_URL=https://ivanterol.com npm run test:e2e prueba la web publicada
const remote = process.env.BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: remote ?? "http://localhost:3123", locale: "es-ES" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: remote
    ? undefined
    : {
        command: "npm run dev -- -p 3123",
        url: "http://localhost:3123",
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
