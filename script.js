document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. THEME TOGGLE (DARK / LIGHT MODE + LOCAL STORAGE) ---
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    
    document.documentElement.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        let newTheme = theme === "light" ? "dark" : "light";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // --- 2. HAMBURGER MENU (MOBILE NAVIGATION) ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

    // Tutup menu jika link di klik (untuk mobile)
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    });

    // --- 3. NAVBAR SHRINK ON SCROLL ---
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
        } else {
            navbar.classList.remove("shrink");
        }
    });

    // --- 4. TYPING ANIMATION (HERO TITLE) ---
    const words = ["Web Developer", "UI/UX Designer", "Tech Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typingElement");

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Diam sebentar di akhir kata
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // --- 5. SCROLL REVEAL, PROGRESS BAR, & COUNTER ANIMATION ---
    const reveals = document.querySelectorAll(".reveal");
    const progressFills = document.querySelectorAll(".progress-fill");
    const statsNumbers = document.querySelectorAll(".stat-number");
    let statsAnimated = false;

    function handleScrollAnimations() {
        const triggerBottom = window.innerHeight * 0.85;

        // A. General Scroll Reveal
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < triggerBottom) {
                reveal.classList.add("active");
            }
        });

        // B. Progress Bar Animate
        progressFills.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < triggerBottom) {
                bar.style.width = bar.getAttribute("data-width");
            }
        });

        // C. Counter Stat Animation
        if (statsNumbers.length > 0 && !statsAnimated) {
            const statsTop = statsNumbers[0].getBoundingClientRect().top;
            if (statsTop < triggerBottom) {
                statsNumbers.forEach(num => {
                    const target = +num.getAttribute("data-target");
                    let count = 0;
                    const speed = target / 20; // Atur kecepatan hitung
                    
                    const updateCount = () => {
                        if (count < target) {
                            count += Math.ceil(speed);
                            if (count > target) count = target;
                            num.innerText = count + "+";
                            setTimeout(updateCount, 40);
                        } else {
                            num.innerText = target + "+";
                        }
                    };
                    updateCount();
                });
                statsAnimated = true;
            }
        }
    }

    window.addEventListener("scroll", handleScrollAnimations);
    handleScrollAnimations(); // Jalankan sekali di awal load

    // --- 6. FORM CONTACT VALIDATION ---
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isFormValid = true;

        const inputs = form.querySelectorAll("input[required], textarea[required]");
        
        inputs.forEach(input => {
            const formGroup = input.parentElement;
            
            // Validasi Input Kosong
            if (input.value.trim() === "") {
                formGroup.classList.add("invalid");
                isFormValid = false;
            } else {
                formGroup.classList.remove("invalid");
            }

            // Validasi Email Khusus
            if (input.type === "email" && input.value.trim() !== "") {
                const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailReg.test(input.value.trim())) {
                    formGroup.classList.add("invalid");
                    isFormValid = false;
                }
            }
        });

        if (isFormValid) {
            alert("Terima kasih! Pesan Anda berhasil dikirim (Simulasi validasi sukses).");
            form.reset();
        }
    });

    // --- 7. BUTTON RIPPLE EFFECT ---
    const ripples = document.querySelectorAll(".ripple");
    ripples.forEach(button => {
        button.addEventListener("click", function(e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            let ripple = document.createElement("span");
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            ripple.style.position = "absolute";
            ripple.style.width = "20px";
            ripple.style.height = "20px";
            ripple.style.background = "rgba(255, 255, 255, 0.4)";
            ripple.style.borderRadius = "50%";
            ripple.style.transform = "translate(-50%, -50%) scale(0)";
            ripple.style.animation = "rippleAnim 0.6s linear";
            ripple.style.pointerEvents = "none";
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});