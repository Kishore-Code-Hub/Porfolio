document.addEventListener("DOMContentLoaded", () => {

    // =================================================================
    //  1. ALL FUNCTION DEFINITIONS
    // =================================================================
    // === EMAILJS CONTACT FORM (safe - will no-op if emailjs not loaded) ===
    (function initEmailJSIntegration() {
      const EMAILJS_USER_ID = 'JX2kijAIyIVHu2lGC';     // ← replace if you use EmailJS
      const EMAILJS_SERVICE_ID = 'service_n88ho1r';
      const EMAILJS_TEMPLATE_ID = 'template_mvwjjmm';

      if (!window.emailjs) {
        // EmailJS SDK is not present — we simply skip integration
        return;
      }

      emailjs.init(EMAILJS_USER_ID);

      const form = document.getElementById('contact-form');
      const submitBtn = document.getElementById('contact-submit');
      const statusEl = document.getElementById('contact-status');
      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        }
        if (statusEl) {
            statusEl.style.display = 'none';
            statusEl.textContent = '';
        }

        const templateParams = {
          from_name: form.querySelector('[name="from_name"]')?.value || '',
          from_email: form.querySelector('[name="from_email"]')?.value || '',
          message: form.querySelector('[name="message"]')?.value || '',
          reply_to: form.querySelector('[name="from_email"]')?.value || ''
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(function () {
            if (statusEl) {
                statusEl.style.display = 'block';
                statusEl.style.color = '#7beb12';
                statusEl.textContent = 'Message sent successfully — thank you!';
            }
            form.reset();
          }, function (error) {
            console.error('EmailJS error:', error);
            if (statusEl) {
                statusEl.style.display = 'block';
                statusEl.style.color = '#ff4d4d';
                statusEl.textContent = 'Sorry — message failed to send. Try again or use email.';
            }
          })
          .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
            if (statusEl) setTimeout(() => { statusEl.style.display = 'none'; }, 8000);
          });
      });
    })();


    // --- DATABASE INITIALIZATION ---
    function initData() {
        const defaultSkills = [
            { name: "Python", icon: "fab fa-python" },
            { name: "Java", icon: "fab fa-java" },
            { name: "Git", icon: "fab fa-git-alt" },
            { name: "GitHub", icon: "fab fa-github" },
            { name: "HTML", icon: "fab fa-html5" },
            { name: "CSS", icon: "fab fa-css3-alt" },
            { name: "n8n", icon: "fas fa-robot" },
            { name: "AI Tools", icon: "fas fa-lightbulb" }
        ];

        const defaultServices = [
            { icon: "fas fa-shield-alt", title: "Cybersecurity Fundamentals", desc: "Applying basic security concepts and best practices." },
            { icon: "fas fa-cogs", title: "Automation Solutions", desc: "Using n8n & Python for workflow automation." },
            { icon: "fas fa-palette", title: "Creative Design", desc: "UI concepts and visuals using Canva." },
            { icon: "fas fa-code", title: "Vibe Coding", desc: "Writing clean, purposeful, and efficient code." }
        ];

        const defaultCertificates = [
            {
                title: "Cloud Computing & Distributed Systems NPTEL",
                issuer: "NPTEL SWAYAM MHRD",
                img: "image/NPTEL CERTIFICATE.png",
                link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs12/Course/NPTEL25CS12S44350014001302562.pdf"
            },
            {
                title: "Python Programming with Projects",
                issuer: "Infosys Springboard",
                img: "image/python certificate.png",
                link: "https://verify.onwingspan.com/"
            },
            {
                title: "Cybersecurity Security & Ethical Hacking",
                issuer: "CODETECH IT SOLUTIONS",
                img: "image/CodeTech IT Solutions.png",
                link: "https://codtechitsolutions.in/"
            }
        ];

        const defaultProjects = [
            {
                title: "MangoMate — A Smart & Eco-Friendly Mango Ripening Chamber",
                desc: "AI-powered portable chamber for chemical-free mango ripening, designed to help farmers.",
                img: "image/Mangomate.png",
                link: "https://github.com/Kishore-Code-Hub/MangoMate-A-Smart-Eco-Friendly-Mango-Ripening-Chamber"
            }
        ];

        if (!localStorage.getItem("certificates")) {
            localStorage.setItem("certificates", JSON.stringify(defaultCertificates));
        }
        if (!localStorage.getItem("skills")) {
            localStorage.setItem("skills", JSON.stringify(defaultSkills));
        }
        if (!localStorage.getItem("services")) {
            localStorage.setItem("services", JSON.stringify(defaultServices));
        }
        if (!localStorage.getItem("projects")) {
            localStorage.setItem("projects", JSON.stringify(defaultProjects));
        }
    }


    // --- EDUCATION INITIALIZATION ---
    function initEducation() {
        const defaultEdu = [
            {
                title: "B.E. Computer Science and Engineering",
                inst: "Jeppiaar Institute of Technology",
                years: "2024–2028",
                badge: "CGPA 8.46"
            },
            {
                title: "Higher Secondary",
                inst: "John Dewey Hr. Sec. School, Panruti",
                years: "2022–2024",
                badge: "92 Percentage"
            },
            {
                title: "High School",
                inst: "The New John Dewey Hr. Sec. School, Panruti",
                years: "2022",
                badge: "89 Percentage"
            }
        ];

        if (!localStorage.getItem("education")) {
            localStorage.setItem("education", JSON.stringify(defaultEdu));
        }
    }


    // --- RENDER EDUCATION (drag disabled per Option B) ---
    function renderEducation() {
        const eduList = JSON.parse(localStorage.getItem("education")) || [];
        const container = document.getElementById("education-container");
        if (!container) return;

        container.innerHTML = "";

        eduList.forEach((edu, index) => {
            const card = document.createElement("div");
            card.className = "education-card";
            // explicitly ensure not draggable
            card.setAttribute("draggable", "false");
            card.dataset.index = index;

            card.innerHTML = `
                <span class="education-delete-btn" data-index="${index}">&times;</span>
                <div class="education-dot"></div>
                <h3 class="edu-title">${escapeHtml(edu.title)}</h3>
                <p class="edu-institute">${escapeHtml(edu.inst)}</p>
                <p class="edu-years">${escapeHtml(edu.years)}</p>
                <span class="edu-badge">${escapeHtml(edu.badge)}</span>
            `;

            container.appendChild(card);
        });

        // Drag is disabled (Option B); we intentionally do NOT attach drag listeners.
    }

    // Helper to escape HTML when injecting user content
    function escapeHtml(str) {
        if (typeof str !== "string") return "";
        return str.replace(/[&<>"'`=\/]/g, function (s) {
            return ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;'
            })[s];
        });
    }

    // --- RENDERERS FOR OTHER SECTIONS ---
    function renderSkills() {
        const skills = JSON.parse(localStorage.getItem("skills")) || [];
        const container = document.getElementById("skills-container");
        if (!container) return;
        container.innerHTML = "";
        skills.forEach((skill, index) => {
            const el = document.createElement("div");
            el.className = "card skill-card";
            el.dataset.index = index;
            el.innerHTML = `
                <button class="delete-btn" data-type="skills" title="Delete">&times;</button>
                <i class="${skill.icon}"></i>
                <h3>${escapeHtml(skill.name)}</h3>
            `;
            container.appendChild(el);
        });
    }

    function renderServices() {
        const services = JSON.parse(localStorage.getItem("services")) || [];
        const container = document.getElementById("services-container");
        if (!container) return;
        container.innerHTML = "";
        services.forEach((service, index) => {
            const el = document.createElement("div");
            el.className = "card service-card";
            el.dataset.index = index;
            el.innerHTML = `
                <button class="delete-btn" data-type="services" title="Delete">&times;</button>
                <i class="${service.icon}"></i>
                <h3>${escapeHtml(service.title)}</h3>
                <p>${escapeHtml(service.desc)}</p>
            `;
            container.appendChild(el);
        });
    }

    function renderProjects() {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const container = document.getElementById("projects-container");
        if (!container) return;
        container.innerHTML = "";
        projects.forEach((project, index) => {
            const el = document.createElement("div");
            el.className = "card project-card";
            el.dataset.index = index;
            el.innerHTML = `
                <button class="delete-btn" data-type="projects" title="Delete">&times;</button>
                <img src="${escapeHtml(project.img)}" alt="${escapeHtml(project.title)}" class="card-image">
                <div class="card-content">
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(project.desc)}</p>
                </div>
                ${project.link ? `
                <div class="card-footer">
                    <a href="${escapeHtml(project.link)}" target="_blank" class="btn btn-secondary">View Project</a>
                </div>
                ` : ''}
            `;
            container.appendChild(el);
        });
    }

    function renderCertificates() {
        const certificates = JSON.parse(localStorage.getItem("certificates")) || [];
        const container = document.getElementById("certificates-container");
        if (!container) return;
        container.innerHTML = "";
        certificates.forEach((cert, index) => {
            const el = document.createElement("div");
            el.className = "card certificate-card";
            el.dataset.index = index;
            el.innerHTML = `
                <button class="delete-btn" data-type="certificates" title="Delete">&times;</button>
                <img src="${escapeHtml(cert.img)}" alt="${escapeHtml(cert.title)}" class="card-image">
                <div class="card-content">
                    <h3>${escapeHtml(cert.title)}</h3>
                    <p>Issued by: ${escapeHtml(cert.issuer)}</p>
                </div>
                ${cert.link ? `
                <div class="card-footer">
                    <a href="${escapeHtml(cert.link)}" target="_blank" class="btn btn-secondary">View Certificate</a>
                </div>
                ` : ''}
            `;
            container.appendChild(el);
        });
    }

    function loadAllData() {
        renderSkills();
        renderServices();
        renderProjects();
        renderCertificates();
        renderEducation(); // education last
    }


    // --- ADMIN AUTHENTICATION ---
    // NOTE: we use localStorage "isAdmin" consistently across the app.
    function handleLogin() {
        const loginForm = document.getElementById("login-form");
        if (!loginForm) return;

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username")?.value || "";
            const password = document.getElementById("password")?.value || "";
            const errorEl = document.getElementById("login-error");

            // <<< Replace credentials here as needed >>>
            const ADMIN_USER = "soundkish";
            const ADMIN_PASS = "soundkish";

            if (username === ADMIN_USER && password === ADMIN_PASS) {
                localStorage.setItem("isAdmin", "true");
                // add admin-mode class immediately so UI elements update without a hard redirect (if on admin page)
                document.body.classList.add("admin-mode");
                // redirect to index (your landing page)
                window.location.href = "index.html";
            } else {
                if (errorEl) {
                    errorEl.textContent = "Invalid username or password.";
                    errorEl.style.display = "block";
                }
            }
        });
    }

    function checkAdminStatus() {
        if (localStorage.getItem("isAdmin") === "true") {
            document.body.classList.add("admin-mode");
        } else {
            document.body.classList.remove("admin-mode");
        }
    }

    // --- LOGOUT HELPER (optional, useful during testing) ---
    function setupLogoutButton() {
        const logout = document.getElementById("admin-logout-btn");
        if (!logout) return;
        logout.addEventListener("click", () => {
            localStorage.removeItem("isAdmin");
            document.body.classList.remove("admin-mode");
            // if you're on admin page, return to index (optional)
            window.location.href = "index.html";
        });
    }

    // --- MODAL & FORM HANDLING ---
    function setupModals() {
        const modals = document.querySelectorAll(".modal");
        const closeBtns = document.querySelectorAll(".close-btn");

        closeBtns.forEach(btn => {
            btn.onclick = () => {
                const m = btn.closest(".modal");
                if (m) m.style.display = "none";
            };
        });

        window.addEventListener("click", (event) => {
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        });

        // openers for core modals
        document.getElementById("add-skill-btn")?.addEventListener("click", () => openModal("skill-modal"));
        document.getElementById("add-service-btn")?.addEventListener("click", () => openModal("service-modal"));
        document.getElementById("add-project-btn")?.addEventListener("click", () => openModal("project-modal"));
        document.getElementById("add-certificate-btn")?.addEventListener("click", () => openModal("certificate-modal"));
        document.getElementById("add-education-btn")?.addEventListener("click", () => openModal("education-modal"));
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "flex";
    }

    function setupFormSubmissions() {
        // ADD EDUCATION
        document.getElementById("education-form")?.addEventListener("submit", e => {
            e.preventDefault();
            const newEdu = {
                title: document.getElementById("edu-title").value,
                inst: document.getElementById("edu-inst").value,
                years: document.getElementById("edu-years").value,
                badge: document.getElementById("edu-badge").value
            };
            const eduArr = JSON.parse(localStorage.getItem("education")) || [];
            eduArr.push(newEdu);
            localStorage.setItem("education", JSON.stringify(eduArr));
            renderEducation();
            e.target.closest(".modal").style.display = "none";
            e.target.reset();
        });

        // SKILL
        document.getElementById("skill-form")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const newSkill = {
                name: document.getElementById("skill-name").value,
                icon: document.getElementById("skill-icon").value
            };
            saveItem("skills", newSkill);
            renderSkills();
            closeModalAndResetForm(e.target);
        });

        // SERVICE
        document.getElementById("service-form")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const newService = {
                icon: document.getElementById("service-icon").value,
                title: document.getElementById("service-title").value,
                desc: document.getElementById("service-desc").value
            };
            saveItem("services", newService);
            renderServices();
            closeModalAndResetForm(e.target);
        });

        // PROJECT
        document.getElementById("project-form")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const newProject = {
                title: document.getElementById("project-title").value,
                desc: document.getElementById("project-desc").value,
                img: document.getElementById("project-img").value,
                link: document.getElementById("project-link").value
            };
            saveItem("projects", newProject);
            renderProjects();
            closeModalAndResetForm(e.target);
        });

        // CERTIFICATE
        document.getElementById("certificate-form")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const newCert = {
                title: document.getElementById("cert-title").value,
                issuer: document.getElementById("cert-issuer").value,
                img: document.getElementById("cert-img").value,
                link: document.getElementById("cert-link").value
            };
            saveItem("certificates", newCert);
            renderCertificates();
            closeModalAndResetForm(e.target);
        });
    }

    // Helper: save item to localStorage and keep code DRY
    function saveItem(key, item) {
        const items = JSON.parse(localStorage.getItem(key)) || [];
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
    }

    function closeModalAndResetForm(formElement) {
        const modal = formElement.closest(".modal");
        if (modal) modal.style.display = "none";
        formElement.reset();
    }

    // ------------------------------
    // MOBILE MENU
    // ------------------------------
    function setupMobileMenu() {
        const menuButton = document.getElementById("mobile-menu-toggle");
        const mobileSidebar = document.getElementById("mobile-sidebar");
        document.getElementById("sidebar-close")?.addEventListener("click", () => {
        mobileSidebar.classList.remove("active");
        document.body.style.overflow = "auto";

        const icon = menuButton.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        menuButton.style.opacity = "1";
        });

        const navLinksList = document.getElementById("nav-links-list");

        if (!menuButton) return;

        if (mobileSidebar) {
            window.toggleMenu = function () {
                const active = mobileSidebar.classList.toggle("active");
                document.body.style.overflow = active ? "hidden" : "auto";
                const icon = menuButton.querySelector("i");
                if (icon) {
                    icon.classList.toggle("fa-times", active);
                    icon.classList.toggle("fa-bars", !active);
                }
                menuButton.style.opacity = active ? "0.2" : "1";
            };

            mobileSidebar.querySelectorAll("a").forEach(a => {
                a.addEventListener("click", () => {
                    mobileSidebar.classList.remove("active");
                    document.body.style.overflow = "auto";
                    const icon = menuButton.querySelector("i");
                    if (icon) {
                        icon.classList.remove("fa-times");
                        icon.classList.add("fa-bars");
                    }
                    menuButton.style.opacity = "1";
                });
            });

            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && mobileSidebar.classList.contains("active")) {
                    mobileSidebar.classList.remove("active");
                    document.body.style.overflow = "auto";
                    const icon = menuButton.querySelector("i");
                    if (icon) {
                        icon.classList.remove("fa-times");
                        icon.classList.add("fa-bars");
                    }
                    menuButton.style.opacity = "1";
                }
            });
        } else if (navLinksList) {
            menuButton.addEventListener("click", () => {
                navLinksList.classList.toggle("active");
                const active = navLinksList.classList.contains("active");
                document.body.style.overflow = active ? "hidden" : "auto";
                const icon = menuButton.querySelector("i");
                if (icon) {
                    icon.classList.toggle("fa-times", active);
                    icon.classList.toggle("fa-bars", !active);
                }
                menuButton.style.opacity = active ? "0.2" : "1";
            });

            navLinksList.addEventListener("click", (e) => {
                const a = e.target.closest("a");
                if (a) {
                    navLinksList.classList.remove("active");
                    document.body.style.overflow = "auto";
                    const icon = menuButton.querySelector("i");
                    if (icon) {
                        icon.classList.remove("fa-times");
                        icon.classList.add("fa-bars");
                    }
                    menuButton.style.opacity = "1";
                }
            });
        }
    }

    // --- GLOBAL DELETE HANDLER (skills/services/projects/certs + education) ---
    function setupDeleteListeners() {
        document.body.addEventListener('click', function (e) {
            // Education delete
            const eduDelete = e.target.closest('.education-delete-btn');
            if (eduDelete) {
                if (!confirm('Delete this education entry?')) return;
                const idx = Number(eduDelete.dataset.index);
                let edu = JSON.parse(localStorage.getItem("education")) || [];
                if (Number.isFinite(idx) && idx >= 0 && idx < edu.length) {
                    edu.splice(idx, 1);
                    localStorage.setItem("education", JSON.stringify(edu));
                    renderEducation();
                }
                return;
            }

            // Generic delete
            const deleteBtn = e.target.closest('.delete-btn');
            if (!deleteBtn) return;

            const type = deleteBtn.dataset.type;
            if (!type) return;

            const card = deleteBtn.closest('[data-index]');
            if (!card) return;

            const index = Number(card.dataset.index);
            if (!Number.isFinite(index)) return;

            if (!confirm('Are you sure you want to delete this item?')) return;

            const arr = JSON.parse(localStorage.getItem(type)) || [];
            if (index >= 0 && index < arr.length) {
                arr.splice(index, 1);
                localStorage.setItem(type, JSON.stringify(arr));
                switch (type) {
                    case 'skills': renderSkills(); break;
                    case 'services': renderServices(); break;
                    case 'projects': renderProjects(); break;
                    case 'certificates': renderCertificates(); break;
                    default: break;
                }
            }
        });
    }

    // =================================================================
    //  2. PAGE INITIALIZATION (RUNS ON LOAD)
    // =================================================================

    // Initialize defaults if missing
    if (!localStorage.getItem("skills") || !localStorage.getItem("services") || !localStorage.getItem("projects") || !localStorage.getItem("certificates")) {
        initData();
    }
    if (!localStorage.getItem("education")) {
        initEducation();
    }

    // IMPORTANT: attach login handler BEFORE checkAdminStatus so logging in updates UI immediately
    handleLogin();

    // Reflect admin state on page
    checkAdminStatus();

    // Load UI
    loadAllData();

    // Setup other UI behaviors
    setupModals();
    setupFormSubmissions();
    setupMobileMenu();
    setupDeleteListeners();
    setupLogoutButton(); // optional if logout button exists

    // Ensure education is rendered and drag is disabled (option B)
    renderEducation();

});
