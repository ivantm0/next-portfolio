import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) < 768;

test.beforeEach(async ({ page }) => {
  // El contador de visitas no debe sumar visitas reales durante los tests
  await page.route("**/api/views", (route) => route.fulfill({ json: { views: 1234 } }));
});

test.describe("portada", () => {
  test("muestra el nombre, las secciones y los 11 proyectos", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Iván Terol" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Trabajo" })).toBeVisible();
    await expect(page.locator("#work li")).toHaveCount(11);
    await expect(page.locator("#work li").first()).toContainText("ACCIONA Atlas");
  });

  test("«Ver proyectos» lleva a la sección de trabajo", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Ver proyectos/ }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.getByRole("heading", { level: 2, name: "Trabajo" })).toBeInViewport();
  });

  test("la navegación lleva a cada sección", async ({ page }) => {
    test.skip(isMobile(page), "En móvil los enlaces de la barra están ocultos");
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await nav.getByRole("link", { name: "Contacto" }).click();
    await expect(page.getByRole("heading", { name: "¿Hablamos?" })).toBeInViewport();
    await nav.getByRole("link", { name: "Sobre mí" }).click();
    await expect(page.locator("#about")).toBeInViewport();
  });

  test("no hay scroll horizontal", async ({ page }) => {
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
});

test.describe("idioma y tema", () => {
  test("cambia a inglés y lo recuerda al recargar", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Switch to English" }).click();
    await expect(page.getByRole("heading", { level: 2, name: "Work" })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.reload();
    await expect(page.getByRole("heading", { level: 2, name: "Work" })).toBeVisible();
  });

  for (const scheme of ["light", "dark"] as const) {
    test(`parte del tema del sistema (${scheme}) y cambia al contrario`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto("/");
      const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      const [current, other] = scheme === "light" ? ["Claro", "Oscuro"] : ["Oscuro", "Claro"];
      const [currentBg, otherBg] = scheme === "light" ? ["rgb(243, 241, 236)", "rgb(18, 18, 20)"] : ["rgb(18, 18, 20)", "rgb(243, 241, 236)"];

      const toggle = page.getByRole("button", { name: new RegExp(`^Tema: ${current}`) });
      await expect(toggle).toBeVisible();
      expect(await bg()).toBe(currentBg);

      await toggle.click();
      await expect(page.getByRole("button", { name: new RegExp(`^Tema: ${other}`) })).toBeVisible();
      expect(await bg()).toBe(otherBg);

      // Dura la sesión: al recargar no vuelve al del sistema
      await page.reload();
      expect(await bg()).toBe(otherBg);
    });
  }
});

test.describe("proyectos", () => {
  test("al pasar el ratón aparece la foto del proyecto", async ({ page }) => {
    test.skip(isMobile(page), "Sin ratón no hay vista previa flotante");
    await page.goto("/");
    const preview = page.locator("#work .fixed img.opacity-100");
    await expect(preview).toHaveCount(0);
    const row = page.locator("#work li").nth(2);
    await row.scrollIntoViewIfNeeded();
    await row.hover();
    await expect(preview).toHaveCount(1);
    await expect(preview).toHaveAttribute("src", /19-trazo/);
    await page.mouse.move(5, 5);
    await expect(preview).toHaveCount(0);
  });

  test("en móvil cada fila muestra su miniatura", async ({ page }) => {
    test.skip(!isMobile(page), "Solo en móvil");
    await page.goto("/");
    await expect(page.locator("#work li img")).toHaveCount(11);
    await page.locator("#work li").first().scrollIntoViewIfNeeded();
    await expect(page.locator("#work li img").first()).toBeVisible();
  });

  test("abre un proyecto, muestra su ficha y enlaza al siguiente", async ({ page }) => {
    await page.goto("/");
    await page.locator("#work li").nth(2).getByRole("link").click();
    await expect(page).toHaveURL(/\/proyectos\/design-system$/);
    await expect(page.getByRole("heading", { level: 1, name: "Design system de web components" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Código/ })).toHaveAttribute("href", "https://github.com/ivantm0/trazo-design-system");

    await page.getByRole("link", { name: /Tablero kanban de tareas/ }).click();
    await expect(page).toHaveURL(/\/proyectos\/carril-kanban$/);
    await page.getByRole("link", { name: /Volver al trabajo/ }).click();
    await expect(page).toHaveURL(/\/#work$/);
  });

  test("un proyecto que no existe devuelve 404", async ({ page }) => {
    const res = await page.goto("/proyectos/no-existe");
    expect(res?.status()).toBe(404);
  });
});

test.describe("detalles", () => {
  test("el nombre se redimensiona arrastrando y se restaura con doble clic", async ({ page }) => {
    test.skip(isMobile(page), "El arrastre se prueba con ratón");
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    const handle = page.locator(".cursor-nwse-resize");
    await expect(handle).toBeVisible();
    const initial = (await h1.boundingBox())!.width;

    const box = (await handle.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x - 300, box.y + box.height / 2, { steps: 8 });
    await page.mouse.up();
    const smaller = (await h1.boundingBox())!.width;
    expect(smaller).toBeLessThan(initial - 200);
    await expect(page.getByText(new RegExp(`^${Math.round(smaller)} × \\d+$`))).toBeVisible();

    await handle.dblclick();
    await expect.poll(async () => Math.round((await h1.boundingBox())!.width)).toBe(Math.round(initial));
  });

  test("copia el email al portapapeles", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "Permisos de portapapeles solo en Chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page.getByRole("button", { name: /Copiar/ }).click();
    await expect(page.getByText("¡Copiado!")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("iterolmartinez@gmail.com");
  });

  test("el CV se puede descargar", async ({ page, request }) => {
    await page.goto("/");
    const href = await page.getByRole("link", { name: /CV · PDF/ }).getAttribute("href");
    const res = await request.get(href!);
    expect(res.ok()).toBe(true);
    expect(res.headers()["content-type"]).toContain("pdf");
  });

  test("la imagen para compartir existe y es un PNG de 1200×630", async ({ page, request }) => {
    await page.goto("/");
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    const res = await request.get(new URL(og!).pathname + new URL(og!).search);
    expect(res.ok()).toBe(true);
    expect(res.headers()["content-type"]).toBe("image/png");
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  });
});

// Revisión automática de accesibilidad (WCAG 2.1 AA) en claro y oscuro
for (const scheme of ["light", "dark"] as const) {
  for (const path of ["/", "/proyectos/acciona-atlas"]) {
    test(`sin errores de accesibilidad en ${path} (${scheme === "light" ? "claro" : "oscuro"})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
      await page.goto(path);
      // Las secciones aparecen al hacer scroll: se recorre la página para mostrarlas todas
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 60));
        }
      });
      await page.waitForTimeout(800);
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        // El botón flotante de Next.js solo existe en desarrollo
        .exclude("nextjs-portal")
        .analyze();
      expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  }
}
