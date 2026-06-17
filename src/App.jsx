import { useState } from "react";

const REPLO_URL = "https://replo.vercel.app";
const CLARITY_URL = "https://clarity-lemon-five.vercel.app";
const OWNER_NAME = "Goodluck Meshack Akoh";

const ALL_TEMPLATES = {
  "Price Inquiry": {
    icon: "💰",
    desc: "Reply to customers asking about prices",
    templates: [
      { text: "Thank you for your interest! The price for [product] is [price]. This includes [details]. Would you like to place an order?", tags: ["price", "inquiry"] },
      { text: "Hello! [Product] is currently [price]. We offer quality products and fast delivery. Shall I reserve one for you?", tags: ["price", "reserve"] },
      { text: "Hi! Our [product] goes for [price]. We have it available now. How many would you like?", tags: ["price", "available"] },
      { text: "Good day! The price for [product] is [price] including delivery. Payment via [payment method]. Ready to order?", tags: ["price", "delivery"] },
      { text: "Hello! [Product] costs [price]. We also have [related product] for [price2]. Which would you prefer?", tags: ["price", "options"] },
      { text: "Hi there! Our prices start from [price] for [product]. We have different options depending on your budget. What are you looking for?", tags: ["price", "budget"] },
    ]
  },
  "Payment Follow Up": {
    icon: "💳",
    desc: "Follow up on pending payments",
    templates: [
      { text: "Hello! Just checking in regarding your order. Kindly make payment to [account] so we can process it immediately.", tags: ["payment", "follow-up"] },
      { text: "Hi! Your order is ready and waiting. Please complete payment at your earliest convenience so we can dispatch it.", tags: ["payment", "ready"] },
      { text: "Good day! We noticed your payment is pending. Kindly send to [account]. Let us know once done!", tags: ["payment", "pending"] },
      { text: "Hello [name]! Your order of [product] is confirmed. Please make payment of [amount] to [account details] to proceed.", tags: ["payment", "confirmed"] },
      { text: "Hi! Just a friendly reminder that payment for your order is due. Bank: [bank] | Account: [number] | Name: [name].", tags: ["payment", "reminder"] },
      { text: "Good morning! Payment of [amount] is pending for your order. Please send to [account] and share receipt. Thank you!", tags: ["payment", "morning"] },
    ]
  },
  "Delivery Update": {
    icon: "🚚",
    desc: "Update customers on their deliveries",
    templates: [
      { text: "Great news! Your order has been dispatched and is on its way. Expected delivery: [date]. We'll keep you updated!", tags: ["delivery", "dispatched"] },
      { text: "Hello! Your package is out for delivery today. Our rider will contact you shortly. Please keep your phone accessible.", tags: ["delivery", "today"] },
      { text: "Hi! Your order is ready. Please confirm your delivery address: [address] so we can send it right away.", tags: ["delivery", "confirm"] },
      { text: "Your order is on its way! Tracking: [tracking number]. Expected arrival: [date/time]. Please be available to receive it.", tags: ["delivery", "tracking"] },
      { text: "Hello! We're sorry for the delay in your delivery. Your order will arrive by [new date]. We apologize for any inconvenience.", tags: ["delivery", "delay"] },
      { text: "Hi! Your delivery has been scheduled for [date] between [time range]. Please ensure someone is available to receive it.", tags: ["delivery", "scheduled"] },
    ]
  },
  "Out of Stock": {
    icon: "📦",
    desc: "Handle out of stock situations professionally",
    templates: [
      { text: "Hello! Unfortunately [product] is currently out of stock. We expect restocking by [date]. Shall I notify you when it arrives?", tags: ["stock", "restock"] },
      { text: "Hi! We've sold out of [product] but more is coming soon. Would you like to be on our waiting list?", tags: ["stock", "waitlist"] },
      { text: "Good day! [Product] is temporarily unavailable. However we have [alternative] which is similar. Would you like to see it?", tags: ["stock", "alternative"] },
      { text: "Hello! We're sorry, [product] in [size/color] is currently out of stock. We have [other variant] available. Interested?", tags: ["stock", "variant"] },
      { text: "Hi there! [Product] just sold out but we're restocking soon. Drop your number and we'll call you first when it's available!", tags: ["stock", "notify"] },
      { text: "Thank you for your interest in [product]. It's currently unavailable but will be back in [timeframe]. Can I take your details?", tags: ["stock", "interest"] },
    ]
  },
  "Complaint Handling": {
    icon: "🙏",
    desc: "Handle complaints professionally and retain customers",
    templates: [
      { text: "We sincerely apologize for this experience. This is not our standard. Please share more details and we will resolve this immediately.", tags: ["complaint", "apologize"] },
      { text: "Hello! We are very sorry to hear this. Your satisfaction is our priority. Please allow us to make it right for you.", tags: ["complaint", "sorry"] },
      { text: "We deeply apologize for the inconvenience. Kindly send us your order details and we will personally handle this matter today.", tags: ["complaint", "resolve"] },
      { text: "Hello [name], we're truly sorry about your experience. We've escalated your complaint and someone will contact you within [time] hours.", tags: ["complaint", "escalate"] },
      { text: "Thank you for bringing this to our attention. We take all feedback seriously. Please send us your order number so we can investigate.", tags: ["complaint", "investigate"] },
      { text: "We apologize for the inconvenience caused. As a token of apology, we'd like to offer you [discount/replacement/refund]. Please let us know.", tags: ["complaint", "compensation"] },
    ]
  },
  "Thank You Messages": {
    icon: "🎉",
    desc: "Thank customers after purchase",
    templates: [
      { text: "Thank you so much for your purchase! We truly appreciate your support. Please leave us a review and come back soon!", tags: ["thanks", "review"] },
      { text: "Thank you for choosing us! Your order has been noted. We hope you absolutely love it. Don't hesitate to return!", tags: ["thanks", "choose"] },
      { text: "We're so grateful for your business! Tell a friend and enjoy 10% off your next order with code: THANKYOU", tags: ["thanks", "referral"] },
      { text: "Hello [name]! Thank you for your order. We've packed it with care. We hope you love your [product]!", tags: ["thanks", "packed"] },
      { text: "Your support means everything to us! Thank you for ordering. We'd love to see you share your purchase on Instagram and tag us!", tags: ["thanks", "instagram"] },
      { text: "Thank you! Your order is confirmed. We value your trust and will always ensure you get the best quality from us.", tags: ["thanks", "quality"] },
    ]
  },
  "Price Negotiation": {
    icon: "🤝",
    desc: "Handle price bargaining professionally",
    templates: [
      { text: "We understand your budget concern. Our prices are already competitive for the quality offered. However for bulk orders we can discuss.", tags: ["negotiate", "bulk"] },
      { text: "Hello! Our pricing reflects the quality and service we provide. We unfortunately cannot go lower but we can offer free delivery!", tags: ["negotiate", "delivery"] },
      { text: "Hi! We appreciate your interest. Our best price for [product] is [price]. This is our final offer but we guarantee quality!", tags: ["negotiate", "final"] },
      { text: "Thank you for your interest! Unfortunately [price] is already our lowest price. However I can include [bonus item] as a gift!", tags: ["negotiate", "bonus"] },
      { text: "Hello! We understand budgets are tight. Our minimum for this quality is [price]. If you buy [quantity], we can do [discount].", tags: ["negotiate", "quantity"] },
      { text: "Hi! Our prices are fixed to maintain quality standards. But if you refer a friend who buys, you both get [discount]. Deal?", tags: ["negotiate", "refer"] },
    ]
  },
  "No Response Follow Up": {
    icon: "📱",
    desc: "Follow up with customers who haven't replied",
    templates: [
      { text: "Hello! Just following up on your inquiry about [product]. Are you still interested? We're here to help!", tags: ["followup", "interest"] },
      { text: "Hi! We noticed you haven't replied yet. Your order slot is still available. Shall we proceed?", tags: ["followup", "slot"] },
      { text: "Good day! Just checking if you had any questions about your inquiry. We'd love to assist you today!", tags: ["followup", "questions"] },
      { text: "Hello [name]! We wanted to check back in about [product]. We still have it available. Any questions we can answer?", tags: ["followup", "available"] },
      { text: "Hi! We haven't heard back from you. If you changed your mind, no worries! We'll be here whenever you're ready.", tags: ["followup", "ready"] },
      { text: "Hello! Just a quick follow up. We're running a limited offer on [product] this week. Don't miss out!", tags: ["followup", "offer"] },
    ]
  },
  "Refund & Returns": {
    icon: "↩️",
    desc: "Handle refund and return requests",
    templates: [
      { text: "Hello! We're sorry to hear you'd like a refund. Please share your order number and reason so we can process this promptly.", tags: ["refund", "process"] },
      { text: "Hi! We accept returns within [days] days of purchase. Please send the item back in original condition and we'll refund you.", tags: ["return", "policy"] },
      { text: "Thank you for reaching out. We'll process your refund of [amount] within [days] business days. You'll receive confirmation shortly.", tags: ["refund", "confirm"] },
      { text: "Hello! We're sorry about the issue. Please send photos of the item and we'll arrange an exchange or full refund for you.", tags: ["refund", "exchange"] },
      { text: "Hi! We've received your return request. Kindly send the item to [address] and notify us once sent. Refund will follow within [days] days.", tags: ["return", "address"] },
      { text: "Your refund has been approved! [Amount] will be sent to your [bank/mobile money] within [days] days. Thank you for your patience.", tags: ["refund", "approved"] },
    ]
  },
  "Business Hours": {
    icon: "🕐",
    desc: "Inform customers about your availability",
    templates: [
      { text: "Hello! Our business hours are [days] from [time] to [time]. We'll get back to you as soon as we open. Thank you!", tags: ["hours", "hours"] },
      { text: "Hi! We're currently closed but will respond to your message when we open at [time] tomorrow. Thank you for your patience!", tags: ["hours", "closed"] },
      { text: "Thank you for your message! We are open Monday to Saturday, [time] - [time]. We'll reply shortly during business hours.", tags: ["hours", "open"] },
      { text: "Hello! We've received your message. Our team responds within [hours] hours during business days. We'll get back to you soon!", tags: ["hours", "response"] },
      { text: "Hi! We're on a brief break and will return at [time]. For urgent matters, please call [number]. Thank you!", tags: ["hours", "break"] },
      { text: "Good [morning/afternoon/evening]! We're currently at capacity for today but will respond to all messages first thing tomorrow morning.", tags: ["hours", "capacity"] },
    ]
  },
  "Bulk Order": {
    icon: "📊",
    desc: "Handle wholesale and bulk inquiries",
    templates: [
      { text: "Hello! Thank you for your bulk inquiry. For orders of [quantity]+ units, we offer [discount]% discount. Shall we discuss further?", tags: ["bulk", "discount"] },
      { text: "Hi! We do accommodate wholesale orders. Minimum order is [quantity] units at [price] per unit. Are these quantities suitable for you?", tags: ["bulk", "wholesale"] },
      { text: "Thank you for your interest in bulk orders! Please share your required quantity and we'll prepare a custom quote for you.", tags: ["bulk", "quote"] },
      { text: "Hello! For bulk orders we have special pricing. Order [qty1] get [discount1]%, order [qty2]+ get [discount2]%. Which works for you?", tags: ["bulk", "tiers"] },
      { text: "Hi! We love bulk buyers! For your quantity of [qty], our price will be [price] per unit totaling [total]. Payment terms: [terms].", tags: ["bulk", "pricing"] },
      { text: "Good day! Our wholesale price list is: [tier 1]: [price], [tier 2]: [price], [tier 3]: [price]. Which quantity suits your needs?", tags: ["bulk", "list"] },
    ]
  },
  "New Product Launch": {
    icon: "🚀",
    desc: "Announce new products to customers",
    templates: [
      { text: "🚨 NEW ARRIVAL! [Product name] is finally here! [Key feature]. Only [quantity] available. Order now before it sells out!", tags: ["launch", "new"] },
      { text: "Hello [name]! We just launched [product] and thought of you immediately. It's perfect for [use case]. Shall I reserve one for you?", tags: ["launch", "personal"] },
      { text: "🎉 INTRODUCING [Product]! Everything you love about [old product] but better. Pre-order now and get [discount/bonus]. Limited slots!", tags: ["launch", "preorder"] },
      { text: "Big news! We're now stocking [product]. First [number] orders get [special offer]. Don't miss out — reply YES to order!", tags: ["launch", "first"] },
      { text: "Hello! New stock just arrived including [product 1], [product 2], and [product 3]. Send 'CATALOG' to see full pictures and prices.", tags: ["launch", "stock"] },
      { text: "🆕 Just added to our store: [product]. Perfect for [occasion/season]. Price: [price]. Send 'ORDER' to get yours now!", tags: ["launch", "store"] },
    ]
  },
};

const CATEGORIES = Object.keys(ALL_TEMPLATES);

export default function App() {
  const [search, setSearch] = useState("");
  const [activecat, setActivecat] = useState("All");
  const [copied, setCopied] = useState(null);
  const [expandedCat, setExpandedCat] = useState(null);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const totalTemplates = Object.values(ALL_TEMPLATES).reduce((sum, cat) => sum + cat.templates.length, 0);

  const filtered = CATEGORIES.filter(cat => activecat === "All" || activecat === cat).reduce((acc, cat) => {
    const templates = ALL_TEMPLATES[cat].templates.filter(t =>
      !search || t.text.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.includes(search.toLowerCase()))
    );
    if (templates.length > 0) acc[cat] = { ...ALL_TEMPLATES[cat], templates };
    return acc;
  }, {});

  return (
    <div style={{ minHeight: "100vh", background: "#f0faf0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* HEADER */}
      <header style={{ background: "#25D366", padding: "0 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💬</div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1 }}>WATemplates</h1>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>Free WhatsApp Business Messages</p>
            </div>
          </div>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
            {totalTemplates}+ Free WhatsApp<br />Business Message Templates
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.6, marginBottom: 20, maxWidth: 540 }}>
            Professional copy-paste WhatsApp replies for your business. Price inquiries, payments, delivery, complaints and more. No signup required.
          </p>
          {/* Search */}
          <div style={{ position: "relative", maxWidth: 480 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search templates... e.g. 'payment', 'delivery', 'sorry'"
              style={{ width: "100%", padding: "14px 16px 14px 42px", borderRadius: 12, border: "none", fontSize: 15, background: "#fff", color: "#1a2f1a", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }} />
          </div>
        </div>
      </header>

      {/* AD PLACEHOLDER */}
      <div style={{ background: "#e8f5e8", borderBottom: "1px solid #d0ebd0", padding: "12px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ background: "#fff", border: "2px dashed #25D366", borderRadius: 8, padding: "16px", fontSize: 12, color: "#556655" }}>
            📢 Advertisement Space — Google AdSense will display here
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* STATS BAR */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          {[
            { value: `${totalTemplates}+`, label: "Templates" },
            { value: `${CATEGORIES.length}`, label: "Categories" },
            { value: "Free", label: "Always" },
            { value: "Instant", label: "Copy" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #d0ebd0", borderRadius: 10, padding: "12px 20px", textAlign: "center", flex: "1 0 80px" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#25D366" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#88aa88", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CATEGORY FILTER */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          <div onClick={() => setActivecat("All")} style={{ padding: "8px 16px", borderRadius: 20, background: activecat === "All" ? "#25D366" : "#fff", color: activecat === "All" ? "#fff" : "#556655", border: "1px solid #d0ebd0", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}>All</div>
          {CATEGORIES.map(cat => (
            <div key={cat} onClick={() => setActivecat(activecat === cat ? "All" : cat)} style={{ padding: "8px 16px", borderRadius: 20, background: activecat === cat ? "#25D366" : "#fff", color: activecat === cat ? "#fff" : "#556655", border: "1px solid #d0ebd0", cursor: "pointer", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
              {ALL_TEMPLATES[cat].icon} {cat}
            </div>
          ))}
        </div>

        {/* TEMPLATES */}
        {Object.keys(filtered).length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#88aa88" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16 }}>No templates found for "{search}"</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Try different keywords like "payment", "delivery", "sorry"</p>
          </div>
        ) : (
          Object.keys(filtered).map(cat => (
            <div key={cat} style={{ marginBottom: 28, animation: "fadeUp 0.4s ease" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, cursor: "pointer" }} onClick={() => setExpandedCat(expandedCat === cat ? null : cat)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{ALL_TEMPLATES[cat].icon}</span>
                  <div>
                    <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a2f1a" }}>{cat}</h2>
                    <p style={{ fontSize: 12, color: "#88aa88", marginTop: 1 }}>{ALL_TEMPLATES[cat].desc}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "#25D366", background: "#e8f5e8", padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{filtered[cat].templates.length} templates</span>
                  <span style={{ color: "#25D366", fontSize: 18 }}>{expandedCat === cat ? "−" : "+"}</span>
                </div>
              </div>

              {(expandedCat === cat || search || activecat !== "All") && (
                <div style={{ display: "grid", gap: 12 }}>
                  {filtered[cat].templates.map((t, i) => {
                    const id = `${cat}-${i}`;
                    return (
                      <div key={id} style={{ background: "#fff", border: "1px solid #d0ebd0", borderRadius: 12, padding: "16px 18px", transition: "box-shadow 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,211,102,0.15)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                        <p style={{ fontSize: 14, color: "#2a3f2a", lineHeight: 1.75, marginBottom: 14, fontFamily: "Georgia, serif" }}>{t.text}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {t.tags.map(tag => (
                              <span key={tag} style={{ fontSize: 10, background: "#e8f5e8", color: "#25D366", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>#{tag}</span>
                            ))}
                          </div>
                          <button onClick={() => copy(t.text, id)} style={{ background: copied === id ? "#e8f5e8" : "#25D366", color: copied === id ? "#25D366" : "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", flexShrink: 0, marginLeft: 12 }}>
                            {copied === id ? "Copied! ✓" : "Copy"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {expandedCat !== cat && !search && activecat === "All" && (
                <button onClick={() => setExpandedCat(cat)} style={{ width: "100%", padding: "12px", background: "#fff", border: "1px dashed #d0ebd0", borderRadius: 10, color: "#25D366", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Show {filtered[cat].templates.length} {cat} templates
                </button>
              )}
            </div>
          ))
        )}

        {/* AD PLACEHOLDER 2 */}
        <div style={{ background: "#fff", border: "2px dashed #25D366", borderRadius: 12, padding: "20px", textAlign: "center", marginBottom: 32, fontSize: 12, color: "#556655" }}>
          📢 Advertisement Space — Google AdSense will display here
        </div>

        {/* REPLO RECOMMENDATION */}
        <div style={{ background: "linear-gradient(135deg, #0a2f0a 0%, #1a4f1a 100%)", borderRadius: 16, padding: "28px", marginBottom: 24, border: "1px solid #2a5f2a" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, color: "#4AE54A", fontWeight: 700, letterSpacing: "0.15em", marginBottom: 8 }}>TIRED OF COPY-PASTING?</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>Let AI write your replies automatically</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginBottom: 16 }}>Replo is an AI business partner that generates custom replies for your specific business, creates daily content, and gives you expert business advice — all from your phone.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={REPLO_URL} target="_blank" rel="noopener noreferrer" style={{ padding: "12px 24px", background: "#4AE54A", color: "#0a0f0a", borderRadius: 10, fontSize: 14, fontWeight: 800, textDecoration: "none", display: "inline-block" }}>Try Replo Free →</a>
                <a href={CLARITY_URL} target="_blank" rel="noopener noreferrer" style={{ padding: "12px 24px", background: "transparent", color: "#4AE54A", border: "1px solid #4AE54A", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>Try Clarity →</a>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 200 }}>
              {["⚡ AI writes custom replies instantly", "✦ Daily social media content", "◈ Expert business advice", "▤ Professional invoice generator", "◆ Marketing campaign planner"].map((f, i) => (
                <div key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: 8 }}>{f}</div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO CONTENT */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "24px", border: "1px solid #d0ebd0", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2f1a", marginBottom: 14 }}>Why WhatsApp Business Templates Matter for Small Businesses</h2>
          <div style={{ fontSize: 14, color: "#556655", lineHeight: 1.85 }}>
            <p style={{ marginBottom: 14 }}>Every day, small business owners around the world spend hours typing the same responses to customers over and over. A customer asks "how much is this?", another asks "do you deliver?", another wants to know when their order will arrive. These repetitive conversations eat into time that could be spent growing the business, sourcing better products, or simply resting.</p>
            <p style={{ marginBottom: 14 }}>WhatsApp business message templates solve this problem directly. Instead of composing a fresh reply every single time, you keep a library of proven, professional responses ready to copy, customize, and send within seconds. This is especially valuable for businesses operating primarily through WhatsApp and Instagram, which is the reality for millions of entrepreneurs across Africa, Asia, and the Middle East who may not have a dedicated customer service team.</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2f1a", marginTop: 20, marginBottom: 10 }}>How to Use These Templates Effectively</h3>
            <p style={{ marginBottom: 14 }}>Start by identifying which category matches your current situation — whether that's a price inquiry, a delivery question, or a customer complaint. Copy the template that best fits, then replace anything in square brackets (such as [product], [price], or [date]) with your actual business details. Always read through the message once before sending to make sure it sounds natural and matches your brand's tone.</p>
            <p style={{ marginBottom: 14 }}>Many successful sellers keep their 5-10 most-used templates saved directly in their phone's notes app or in WhatsApp's own "Quick Replies" feature (available in WhatsApp Business) so they're always one tap away during a busy sales conversation.</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2f1a", marginTop: 20, marginBottom: 10 }}>Common Mistakes to Avoid When Messaging Customers</h3>
            <p style={{ marginBottom: 14 }}>One of the biggest mistakes small business owners make is replying too slowly to inquiries — studies on e-commerce conversion consistently show that the faster you respond, the higher your chance of closing the sale. Another common mistake is sounding overly robotic; even when using a template, take a moment to personalize it with the customer's name or a small detail from their message. Finally, avoid being defensive when handling complaints — a calm, solution-focused tone retains far more customers than a defensive one.</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2f1a", marginTop: 20, marginBottom: 10 }}>Building Trust Through Professional Communication</h3>
            <p style={{ marginBottom: 14 }}>Customers form an impression of your business within the first few messages of any conversation. A professional, prompt, and friendly tone signals that your business is reliable and worth paying upfront for — especially important in markets where customers may be wary of online fraud. Templates like the ones on this page are designed to strike that balance between professional and warm, helping you build the kind of trust that leads to repeat customers and referrals.</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2f1a", marginTop: 20, marginBottom: 10 }}>When You Need More Than Templates</h3>
            <p>Templates work well for common, predictable situations. But every business eventually faces unique conversations that no template quite fits — an unusual complaint, a tricky price negotiation, or a customer with a very specific question. For those moments, AI tools like <a href={REPLO_URL} style={{ color: "#25D366" }}>Replo</a> can generate a custom reply tailored to your exact business and the specific message you received, combining the speed of a template with the flexibility of a real conversation.</p>
          </div>
        </div>

        {/* ADDITIONAL GUIDE SECTION */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "24px", border: "1px solid #d0ebd0", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2f1a", marginBottom: 14 }}>A Closer Look at Each Template Category</h2>
          <div style={{ fontSize: 14, color: "#556655", lineHeight: 1.85 }}>
            <p style={{ marginBottom: 14 }}><strong style={{ color: "#1a2f1a" }}>Price Inquiry Replies</strong> help you answer the most common question in any sales conversation without sounding repetitive or impatient, even on your fiftieth message of the day.</p>
            <p style={{ marginBottom: 14 }}><strong style={{ color: "#1a2f1a" }}>Payment Follow Up Messages</strong> strike a careful balance — firm enough to encourage payment, polite enough not to offend a customer who may simply be busy.</p>
            <p style={{ marginBottom: 14 }}><strong style={{ color: "#1a2f1a" }}>Delivery Update Templates</strong> reduce the number of "where is my order" messages you receive by proactively keeping customers informed at each stage.</p>
            <p style={{ marginBottom: 14 }}><strong style={{ color: "#1a2f1a" }}>Complaint Handling Templates</strong> are written specifically to de-escalate frustration first, before moving toward a resolution — research on customer service consistently shows that customers who feel heard are far more likely to remain loyal even after something goes wrong.</p>
            <p><strong style={{ color: "#1a2f1a" }}>New Product Launch Announcements</strong> are designed to create urgency and excitement without feeling like spam, helping your existing customer base discover your latest offerings first.</p>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "24px", border: "1px solid #d0ebd0", marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a2f1a", marginBottom: 16 }}>Frequently Asked Questions</h2>
          {[
            { q: "Are these WhatsApp templates free to use?", a: "Yes, all templates on this site are completely free. Copy, customize, and use them for your business without any cost or signup required." },
            { q: "Can I use these templates for WhatsApp Business?", a: "Absolutely. These templates work for both personal WhatsApp and WhatsApp Business accounts. They're designed specifically for small business owners." },
            { q: "How do I customize the templates?", a: "Replace anything in [square brackets] with your specific information. For example, replace [product] with your actual product name and [price] with your actual price." },
            { q: "How many templates are available?", a: `We have ${totalTemplates}+ templates across ${CATEGORIES.length} categories and we're regularly adding more based on what businesses need most.` },
            { q: "What if I need custom AI-powered replies?", a: "For custom AI replies specific to your business, check out Replo — an AI business partner that generates personalized WhatsApp replies automatically." },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? "1px solid #e8f5e8" : "none", padding: "14px 0" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1a2f1a", marginBottom: 8 }}>{faq.q}</div>
              <div style={{ fontSize: 14, color: "#556655", lineHeight: 1.65 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#1a2f1a", padding: "32px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #2a3f2a" }}>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 10 }}>About WATemplates</h3>
            <p style={{ color: "#88aa88", fontSize: 13, lineHeight: 1.7, maxWidth: 600 }}>
              WATemplates was created to give small business owners free access to professional customer communication tools. We believe that good business communication shouldn't be locked behind paywalls or require expensive software. This site is maintained by {OWNER_NAME} and operates independently to provide resources for entrepreneurs worldwide, with a particular focus on the African and Asian small business community.
            </p>
          </div>
          <p style={{ color: "#88aa88", fontSize: 14, marginBottom: 8 }}>WATemplates — Free WhatsApp Business Message Templates</p>
          <p style={{ color: "#556655", fontSize: 12, marginBottom: 8 }}>
            Also try: <a href={REPLO_URL} style={{ color: "#4AE54A", textDecoration: "none" }}>Replo AI Business Partner</a> · <a href={CLARITY_URL} style={{ color: "#4AE54A", textDecoration: "none" }}>Clarity Career Decisions</a>
          </p>
          <p style={{ color: "#445544", fontSize: 11 }}>
            Contact: <a href="mailto:claritycareerai@gmail.com" style={{ color: "#556655" }}>claritycareerai@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
