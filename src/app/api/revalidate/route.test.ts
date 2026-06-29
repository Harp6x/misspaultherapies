import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const cacheMocks = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

vi.mock("next/cache", () => cacheMocks);

import { POST } from "./route";

function webhookRequest(body: Record<string, unknown>, secret = "test-secret") {
  return new NextRequest("https://mspaultherapies.in/api/revalidate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-sanity-revalidate-secret": secret,
    },
    body: JSON.stringify(body),
  });
}

describe("Sanity revalidation webhook", () => {
  beforeEach(() => {
    cacheMocks.revalidatePath.mockReset();
    cacheMocks.revalidateTag.mockReset();
    process.env.SANITY_REVALIDATE_SECRET = "test-secret";
  });

  it("rejects requests when revalidation is not configured", async () => {
    delete process.env.SANITY_REVALIDATE_SECRET;

    const response = await POST(webhookRequest({ _type: "service" }));

    expect(response.status).toBe(503);
    expect(cacheMocks.revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects an invalid secret", async () => {
    const response = await POST(webhookRequest({ _type: "service" }, "wrong-secret"));

    expect(response.status).toBe(401);
    expect(cacheMocks.revalidateTag).not.toHaveBeenCalled();
  });

  it("ignores lead captures without invalidating public pages", async () => {
    const response = await POST(webhookRequest({ _type: "leadCapture" }));
    const payload = await response.json();

    expect(payload).toMatchObject({ revalidated: false, ignored: true });
    expect(cacheMocks.revalidateTag).not.toHaveBeenCalled();
    expect(cacheMocks.revalidatePath).not.toHaveBeenCalled();
  });

  it("invalidates service data, shared pages, sitemap, and the changed slug", async () => {
    const response = await POST(
      webhookRequest({
        _type: "service",
        slug: { current: "individual-therapy" },
      })
    );

    expect(response.status).toBe(200);
    expect(cacheMocks.revalidateTag).toHaveBeenCalledWith("service", "max");
    expect(cacheMocks.revalidatePath).toHaveBeenCalledWith("/services");
    expect(cacheMocks.revalidatePath).toHaveBeenCalledWith("/sitemap.xml");
    expect(cacheMocks.revalidatePath).toHaveBeenCalledWith("/services/individual-therapy");
  });

  it("uses the singleton page tag for about-page publishes", async () => {
    const response = await POST(webhookRequest({ _type: "aboutPage" }));

    expect(response.status).toBe(200);
    expect(cacheMocks.revalidateTag).toHaveBeenCalledWith("aboutPage", "max");
    expect(cacheMocks.revalidatePath).toHaveBeenCalledWith("/about");
  });
});
