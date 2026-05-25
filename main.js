document.addEventListener("DOMContentLoaded", function() {
    
    const scrollContainer = document.querySelector('.projects-horizontal-scroll');
    
    if (scrollContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let velocity = 0;
        let lastScrollLeft = 0;
        let rafId;

        function momentumScroll() {
            if (Math.abs(velocity) > 0.1) {
                scrollContainer.scrollLeft += velocity;
                velocity *= 0.95;
                rafId = requestAnimationFrame(momentumScroll);
            } else {
                velocity = 0;
            }
        }

        scrollContainer.addEventListener('wheel', function(e) {
            e.preventDefault();
            cancelAnimationFrame(rafId);
            scrollContainer.scrollLeft += e.deltaY * 0.5;
            velocity = e.deltaY * 0.1;
            rafId = requestAnimationFrame(momentumScroll);
        });

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            cancelAnimationFrame(rafId);
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            lastScrollLeft = scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => { isDown = false; });
        
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            rafId = requestAnimationFrame(momentumScroll);
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 1;
            scrollContainer.scrollLeft = scrollLeft - walk;
            velocity = (scrollContainer.scrollLeft - lastScrollLeft) * 0.5;
            lastScrollLeft = scrollContainer.scrollLeft;
        });
    }

    const contactZone = document.getElementById('contactZone');
    const contactTitle = document.getElementById('contactTitle');

    if (contactZone && contactTitle) {
        contactTitle.addEventListener('click', function() {
            contactZone.classList.add('is-open');
        });
    }

    const container = document.getElementById('projectsContainer');
    const numberOfCards = 20; 

    if (container) {
        for (let i = 0; i < numberOfCards; i++) {
            const card = document.createElement('div');
            card.className = 'project-card';
            container.appendChild(card);
        }
    }
});