# Saduni Ranasinghe - Educator Portfolio

An interactive, modern educator portfolio and comprehensive academic management system built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Quick Start

### 1. Run Development Server
- **Double-click** the included `run.bat` file in this folder.
- Or open your terminal and run:
  ```bash
  npm run dev
  ```
The site will immediately launch at **[http://localhost:5173](http://localhost:5173)**.

---

## 📋 Exact Public Portfolio Sections & Hierarchy

1. **NAVBAR & HEADER**:
   - Monogram (`SR.`) and Educator Name.
   - Smooth-scrolling links: *Home*, *Philosophy*, *About*, *Experience*, *Classes/Work*, *Research*, *Reviews*, *SWOT*, *Artifacts*, *Contact*.
   - Prominent **"Download CV"** button (serves CV PDF directly from IndexedDB or instant generator).
   - **"Let's Talk"** CTA button (scrolls to Contact form).
   - Mobile responsive drawer menu with full navigation.
   - **NO visible admin buttons on public view**.

2. **HERO SECTION**:
   - Greeting: *"Hello, It's Me"* and Full Name.
   - Animated typewriter cycling through 4 customizable roles.
   - Short introductory bio.
   - Circular portrait with subtle accent border, adjustable pan/zoom, and soft glow.
   - Validated social media icon buttons (Facebook, WhatsApp, YouTube, LinkedIn, Instagram).
   - Primary CTAs: *"View Teaching Philosophy"* & *"Contact Me"*.

3. **SECTION 1 — TEACHING PHILOSOPHY (Placed First)**:
   - Statement, highlighted quotation card, and comprehensive pedagogical approach.
   - 3 Core Pedagogical Pillars with icon cards.
   - 2–3 Teaching photographs carousel with previous/next controls, dot indicators, and full-screen modal zoom.

4. **SECTION 2 — ABOUT ME & KEY STATS**:
   - Detailed educator biography.
   - 4 Highlight Metric Cards (*6,500+ Students Guided*, *99.2% Pass Rate*, *10+ Yrs Teaching Experience*, *150+ Seminars Hosted*).
   - All 4 counters and labels dynamically bound to state and editable by Admin.

5. **SECTION 3 — ACADEMIC & PROFESSIONAL EXPERIENCE**:
   - Vertical timeline of academic appointments, lectureships, and mentoring roles.
   - Each entry shows: Role title, Institution, Period badge, Location, Description bullet points, and attached event photos with modal viewer.

6. **SECTION 4 — WORK & CLASSES**:
   - Filter pills for course categories (*All*, *Theory Batches*, *Paper Revision*, *Seminars*, *Mentorship*).
   - Multi-image interactive carousel on each card with image counter badge (`📷 1/3`).
   - "View Details" modal with full-screen gallery viewer.
   - "Inquire Now" button that scrolls to contact form and pre-fills the subject field.

7. **SECTION 5 — RESEARCH PROPOSAL**:
   - Paper/Proposal title, Lead Author credit, Academic Institution, Category, and Published Year.
   - Abstract & Methodology cards.
   - Key Research Findings & Impact grid with checkmark badges.
   - Download Card: "Research Proposal", file size indicator, **"Download Proposal (PDF)"**, and **"Read Online"** (opens in new tab).

8. **SECTION 6 — STUDENT REVIEWS & TESTIMONIALS**:
   - 5-star rating cards with student name, exam batch/year, and testimonial text.
   - "Submit a Review" modal allowing students to submit feedback directly (sent to Admin review queue).

9. **SECTION 7 — SWOT ANALYSIS (Placed just before Pedagogical Artifacts)**:
   - 4-Quadrant Matrix: Strengths (Emerald), Weaknesses (Amber), Opportunities (Cyan), Threats (Rose).
   - Clean card layout with icons and bullet points highlighting institutional and pedagogical capabilities.

10. **SECTION 8 — PEDAGOGICAL ARTIFACTS (Very Last Section before Contact)**:
    - Lesson plans, instructional frameworks, and cognitive learning blueprints.
    - Each artifact includes title, description, category, attached photo preview, and **"Download Lesson Plan (PDF)"** button.

11. **SECTION 9 — CONTACT ME**:
    - Clickable direct cards: WhatsApp (sanitized `wa.me` link), Email (`mailto:`), Location.
    - Validated Contact Form:
      - Fields: Your Name, Phone / WhatsApp, Subject / Class Batch, Message.
      - Phone validation: verifies at least 9 valid digits with live inline feedback (green checkmark when valid, red error text when invalid).
      - Submitting saves directly to the Admin Inbox and sends visual toast feedback.

12. **FOOTER**:
    - Copyright © [Year] [Client Name]. All Rights Reserved.
    - Regional service coverage (*"Colombo • Kandy • Gampaha • Online Islandwide"*).
    - Clean design with **NO third-party developer credits**.

---

## 🔐 Hidden Admin CRUD Dashboard (10 Tabs)
- **Access Routes**: Accessible only via:
  - Direct URL: `http://localhost:5173/#admin` or `http://localhost:5173/admin`
  - Keyboard Shortcut: `Ctrl + Shift + A`
  - Secret double-click on the footer copyright text.
  - **NO visible admin button in public view**.
- **Security**: PIN-code lock modal (Default PIN: **`1234`**, configurable in Settings).
- **10 Full Real-Time CRUD Tabs**:
  1. **Profile & CV**: Portrait uploader with zoom & offset sliders, typewriter roles, bio, 4 key stats counters, contact info, social links with `Test Link ↗`, and **Device CV PDF Manager** (upload official CV PDF into IndexedDB).
  2. **Philosophy**: Title, subtitle, quote, quote author, pedagogical approach, 3 pillars, and 2-3 carousel photo manager.
  3. **Experience CRUD**: Add, edit, delete timeline appointments, institutions, periods, locations, bullet points, and event photos.
  4. **Classes & Works CRUD**: Add, edit, reorder (move up/down), delete class offerings, multi-image carousel photo uploader with auto-compression.
  5. **Research Proposal Manager**: Proposal details, abstract, methodology, findings, and **Device Research Proposal PDF Manager** (IndexedDB).
  6. **SWOT Analysis Manager**: Add, edit, and delete individual points under Strengths, Weaknesses, Opportunities, and Threats.
  7. **Pedagogical Artifacts CRUD**: Add, edit, delete teaching artifacts, preview image uploader, and **Device Lesson Plan PDF uploader**.
  8. **Reviews Manager**: Approve/reject pending student reviews, delete reviews, add manual verified testimonials.
  9. **Inbox & Inquiries**: View submitted contact messages, timestamp, validated phone, and 1-click **"Reply on WhatsApp"** button.
  10. **Settings**: Change Admin Security PIN, Export Portfolio JSON Backup, Import JSON Backup, Reset to Factory Demo Data.

---

## 📦 Device-Native IndexedDB PDF Storage
- Uses `portfolio_pdf_store` in IndexedDB.
- Keys:
  - `pdf_cv` for the Educator's official CV.
  - `pdf_research` for the Research Proposal.
  - `pdf_artifact_[id]` for each Pedagogical Artifact lesson plan.
- Includes a client-side standard PDF 1.4 generator fallback so downloads and "Read Online" work immediately out of the box even before custom files are uploaded.
