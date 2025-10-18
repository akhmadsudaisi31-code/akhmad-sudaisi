// Menunggu hingga seluruh konten HTML dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Fitur 1: Theme Toggle (Ganti Tema Dark/Light)
     */
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement; // Mengambil elemen <html>
    // Cek tema yang tersimpan di localStorage, defaultnya 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    // Terapkan tema saat halaman dimuat
    html.setAttribute('data-theme', currentTheme);

    // Tambahkan event listener saat tombol di-klik
    themeToggle.addEventListener('click', () => {
        // Tentukan tema baru (kebalikan dari tema saat ini)
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        // Terapkan tema baru ke elemen <html>
        html.setAttribute('data-theme', newTheme);
        // Simpan pilihan tema baru ke localStorage
        localStorage.setItem('theme', newTheme);
    });

    /**
     * Fitur 2: Mobile Menu (Menu di HP)
     */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Saat tombol menu (hamburger) di-klik
    menuToggle.addEventListener('click', () => {
        // Tambah/hapus class 'active' pada daftar link
        navLinks.classList.toggle('active');
        // Ganti ikon tombol: '✕' (silang) jika menu terbuka, '☰' (hamburger) jika tertutup
        menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    /**
     * Fitur 3: Tutup Mobile Menu Saat Link Diklik
     */
    // Ambil semua link di dalam nav-links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Jika menu mobile sedang terbuka (punya class 'active')
            if (navLinks.classList.contains('active')) {
                // Hapus class 'active' untuk menutup menu
                navLinks.classList.remove('active');
                // Kembalikan ikon tombol ke '☰' (hamburger)
                menuToggle.textContent = '☰';
            }
        });
    });

    /**
     * Fitur 4: Efek Shadow pada Navbar Saat di-scroll
     */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        // Tambah/hapus class 'scrolled' jika scrollY > 50px
        // .classList.toggle(namaClass, kondisi)
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    /**
     * Fitur 5: Menandai Link Navigasi yang Aktif Sesuai Posisi Scroll
     */
    const sections = document.querySelectorAll('section[id]'); // Ambil semua <section> yang punya ID
    const navLinksAll = document.querySelectorAll('.nav-links a'); // Ambil semua link navigasi
    
    window.addEventListener('scroll', () => {
        let current = ''; // Variabel untuk menyimpan ID section yang sedang terlihat
        
        sections.forEach(section => {
            // Cek apakah posisi scroll sudah melewati bagian atas section
            // (dikurangi 150px agar link aktif sedikit lebih cepat)
            if (scrollY >= section.offsetTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            // Hapus class 'active' dari semua link dulu
            link.classList.remove('active');
            // Cek apakah 'href' link (misal: '#about') sama dengan ID section saat ini ('about')
            if (link.getAttribute('href').slice(1) === current) {
                // Jika sama, tambahkan class 'active'
                link.classList.add('active');
            }
        });
    });

    /**
     * Fitur 6: Efek Mengetik (Typing Effect) di Hero Section
     */
    const typingTextEl = document.querySelector('.typing-text');
    const texts = ['IT Support Specialist', 'Network Technician', 'Fiber Optic Expert', 'Hardware Specialist']; // Teks yang akan ditampilkan
    let textIndex = 0; // Index untuk teks (dari array 'texts')
    let charIndex = 0; // Index untuk karakter (dari string teks saat ini)
    let isDeleting = false; // Status apakah sedang mengetik atau menghapus

    function type() {
        const currentText = texts[textIndex]; // Ambil teks saat ini
        let displayText = '';
        
        if (isDeleting) {
            // Jika sedang menghapus, potong string dari belakang
            displayText = currentText.substring(0, charIndex--);
        } else {
            // Jika sedang mengetik, potong string dari depan
            displayText = currentText.substring(0, charIndex++);
        }
        
        // Tampilkan hasilnya ke elemen HTML
        typingTextEl.textContent = displayText;

        // Logika untuk loop
        if (!isDeleting && charIndex > currentText.length) {
            // Jika selesai mengetik, tunggu 2 detik lalu mulai menghapus
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex < 0) {
            // Jika selesai menghapus, ganti ke teks berikutnya lalu mulai mengetik
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Loop kembali ke index 0 jika sudah di akhir
            setTimeout(type, 500);
        } else {
            // Lanjutkan mengetik/menghapus
            setTimeout(type, isDeleting ? 50 : 100); // Hapus lebih cepat (50ms), ketik lebih lambat (100ms)
        }
    }
    // Mulai fungsi mengetik
    type();
    
    /**
     * Fitur 7: Animasi Fade-in-up Saat Elemen Terlihat (Intersection Observer)
     */
    // Buat 'observer' baru
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Jika elemen masuk ke dalam layar (isIntersecting)
            if (entry.isIntersecting) {
                // Tambahkan class 'fade-in-up' (yang ada di CSS)
                entry.target.classList.add('fade-in-up');
                // Berhenti mengamati elemen ini agar animasi tidak berulang
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // 'threshold: 0.1' berarti animasi aktif saat 10% elemen terlihat

    // Terapkan observer ke semua elemen yang dipilih
    document.querySelectorAll('.about-content, .timeline-item, .skill-category, .achievement-card, .contact-content').forEach(el => observer.observe(el));
    
    /**
     * Fitur 8: Tombol Scroll to Top (Kembali ke Atas)
     */
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        // Tampilkan/sembunyikan tombol jika scrollY > 500px
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    });
});