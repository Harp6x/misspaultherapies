"use client";

import { useEffect, useRef } from "react";

export function LeadMagnet() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Prevent double-injection
    if (containerRef.current.querySelector("form")) return;

    // Inject Kit form HTML
    containerRef.current.innerHTML = `
      <form action="https://app.kit.com/forms/9460942/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="9460942" data-uid="1d5b37459d" data-format="inline" data-version="6" data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"6"}' min-width="400 500 600 700 800" style="background-color: rgb(255, 255, 255); border-radius: 6px;">
        <div data-style="full">
          <div data-element="column" class="formkit-column" style="background-color: rgb(249, 250, 251);">
            <div class="formkit-background" style="opacity: 0.3;"></div>
            <div class="formkit-header" data-element="header" style="color: rgb(77, 77, 77); font-size: 20px; font-weight: 700;">
              <h2>Join the Newsletter</h2>
            </div>
            <div class="formkit-subheader" data-element="subheader" style="color: rgb(104, 104, 104); font-size: 15px;">Subscribe to get our latest content by email.</div>
            <div class="formkit-image formkit-image relative focus:outline-none" role="button" tabindex="0">
              <img class="cursor-pointer focus:outline-blue" src="https://embed.filekitcdn.com/e/c8AauRTJFGdxZ1DDbcHpvh/hPRsW5ZYdegN7F2u91uDXW" style="max-width: 100%;">
            </div>
          </div>
          <div data-element="column" class="formkit-column">
            <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
            <div data-element="fields" class="seva-fields formkit-fields">
              <div class="formkit-field">
                <input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400;">
              </div>
              <button data-element="submit" class="formkit-submit formkit-submit" style="color: rgb(255, 255, 255); background-color: rgb(22, 119, 190); border-radius: 24px; font-weight: 700;">
                <div class="formkit-spinner"><div></div><div></div><div></div></div>
                <span>Subscribe</span>
              </button>
            </div>
            <div class="formkit-guarantee" data-element="guarantee" style="color: rgb(77, 77, 77); font-size: 13px; font-weight: 400;">We respect your privacy. Unsubscribe at any time.</div>
          </div>
        </div>
      </form>
    `;

    // Inject Kit script (must be via createElement to execute)
    const script = document.createElement("script");
    script.src = "https://f.convertkit.com/ckjs/ck.6.js";
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-cream to-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} />
      </div>
    </section>
  );
}
