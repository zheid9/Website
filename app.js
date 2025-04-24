const express = require("express");
const path = require("path");
const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static assets
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/docs", express.static(path.join(__dirname, "public/docs")));

// project data – add new entries here!
const projects = [
  {
    title: "Portal Labs",
    subtitle: "Custom Laptop Motherboard",
    description:
      "Designed a laptop motherboard from the ground up and integrated all components end-to-end.",
    image: "/images/Laptop.jpg",
    pdf: "/docs/Portal.pdf",
    pdfText: "Download PDF",
    video: "https://youtu.be/oXWgMwDAI2I?si=ArZfA862oSmRsmNV",
    videoText: "Watch Video",
  },

  {
    title: "Formulytics",
    subtitle: "Hacklytics Hackathon",
    description:
      "Developed a Node.js website for F1 racing visualization and prediction “Formulytics”.",
    image: "/images/formulytics.jpg",
    link: "https://devpost.com/software/formulytics",
    linkText: "View on Devpost",
  },

  {
    title: "Low Profile Mechanical Keyboard",
    subtitle: "",
    description:
      "Showcasing the low-profile mechanical keyboard I built from scratch.",
    image: "/images/Keyboard.jpg",
  },
];

const hobbies = [
  {
    title: "Photography",
    subtitle: "",
    description: "Click to view photography.",
    image: "/images/orion.jpg",
    subpage: "/photography",
  },
  {
    title: "Youtube",
    subtitle: "",
    description: "Coming soon....",
    image: "/images/youtube.jpg",
    subpage: "",
  },
  {
    title: "Random",
    subtitle: "",
    description: "Coming soon...",
    image: "/images/youtube.jpg",
    subpage: "",
  },
];

// routes
app.get("/", (req, res) => {
  res.render("index", { projects, hobbies });
});
app.get("/about", (req, res) => res.redirect("/#about-section"));
app.get("/projects", (req, res) => {
  const preview = req.query.preview === "1" || req.query.preview === "true";
  res.render("projects", { projects, preview });
});
app.get("/hobbies", (req, res) => {
  const preview = req.query.preview === "1" || req.query.preview === "true";
  res.render("hobbies", { hobbies, preview });
});
app.get("/contact", (req, res) => res.redirect("/#contact-bar"));

// Get hobby subpages
app.get("/photography", (req, res) => {
  res.render("photography");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
