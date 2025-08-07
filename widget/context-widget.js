(function () {
  async function summarizePage() {
    const title = document.title || "";
    const headings = Array.from(document.querySelectorAll("h1, h2")).map(h => h.textContent.trim());
    const paragraphs = Array.from(document.querySelectorAll("p")).map(p => p.textContent.trim()).filter(p => p.length > 50);

    const summaryLines = [title, ...headings.slice(0, 2), ...paragraphs.slice(0, 2)].filter(Boolean).slice(0, 5);

    // Placeholder for AI Summary (connect to OpenAI API later)
    const aiSummary = [
      "This article highlights key themes based on page content.",
      "It may interest readers who are exploring related topics."
    ];

    return {
      summary: summaryLines,
      aiInsights: aiSummary
    };
  }

  function applyStyles(widgetBox) {
    const bodyStyles = window.getComputedStyle(document.body);
    const textColor = bodyStyles.color || "#000";
    const bgColor = bodyStyles.backgroundColor || "#fff";
    const fontFamily = bodyStyles.fontFamily || "sans-serif";

    widgetBox.style.color = textColor;
    widgetBox.style.backgroundColor = "#f9f9f9";
    widgetBox.style.border = "1px solid #ccc";
    widgetBox.style.borderRadius = "10px";
    widgetBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    widgetBox.style.padding = "16px";
    widgetBox.style.margin = "16px";
    widgetBox.style.maxWidth = "400px";
    widgetBox.style.fontFamily = fontFamily;
    widgetBox.style.lineHeight = "1.5";
    widgetBox.style.fontSize = "14px";
    widgetBox.style.backgroundClip = "padding-box";
  }

  function renderWidget(data) {
    const widgetBox = document.createElement("div");
    widgetBox.id = "contextual-widget";
    applyStyles(widgetBox);

    const summaryHTML = data.summary.map(line => `<li>${line}</li>`).join("");
    const aiHTML = data.aiInsights.map(line => `<p>${line}</p>`).join("");

    const adPlaceholder = `
      <div style="margin-top: 12px; padding: 8px; background: #fff8dc; border: 1px dashed #999; font-size: 13px;">
        📢 <strong>Contextual Ad (Coming Soon)</strong><br>
        <em>This space will show relevant ad based on page category.</em>
      </div>
    `;

    widgetBox.innerHTML = `
      <h4 style="margin-top:0;">🔍 Page Summary</h4>
      <ul style="padding-left: 18px;">${summaryHTML}</ul>
      <h5 style="margin-top: 12px;">💡 AI Insight</h5>
      ${aiHTML}
      ${adPlaceholder}
    `;

    // Position on bottom right of page
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.bottom = "20px";
    wrapper.style.right = "20px";
    wrapper.style.zIndex = "9999";
    wrapper.appendChild(widgetBox);

    document.body.appendChild(wrapper);
  }

  // Run when page is ready
  window.addEventListener("DOMContentLoaded", async () => {
    const data = await summarizePage();
    renderWidget(data);
  });
})();
