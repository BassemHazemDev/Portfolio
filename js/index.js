$(document).ready(function () {
    // Project Filter Logic with Animation
    // Project Filter Logic with Animation (fixed)
    $('.project-filter-btn').on('click', function () {
        var filter = $(this).data('filter');
        $('.project-filter-btn').removeClass('active');
        $(this).addClass('active');

        $('.card.project-card').each(function () {
            var $card = $(this);
            var $row = $card.find('.row.g-5');
            var category = $row.data('category');
            if (filter === 'all' || category === filter) {
                if ($card.css('display') === 'none') {
                    $card.css('opacity', 0).css('display', 'block');
                    setTimeout(function () {
                        $card.addClass('show project-card-animate');
                        $card.animate({ opacity: 1 }, 400);
                    }, 10);
                } else {
                    $card.addClass('show project-card-animate');
                    $card.animate({ opacity: 1 }, 400);
                }
            } else {
                $card.animate({ opacity: 0 }, 400, function () {
                    $card.removeClass('show project-card-animate');
                    $card.css('display', 'none');
                });
            }
        });
    });

    // Initial animation state for project cards
    $('.card.project-card').each(function () {
        $(this).css({ display: 'block', opacity: 1 }).addClass('show project-card-animate');
    });

    // Ensure all cards are visible and fully opaque before first filter click
    setTimeout(function () {
        $('.card.project-card').css({ opacity: 1, display: 'block' }).addClass('show project-card-animate');
    }, 50);

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // Parallax effect for cards on scroll
    function applyParallax() {
        var scrollTop = $(window).scrollTop();

        $('.card-head').each(function () {
            var $this = $(this);
            var offset = $this.offset().top;
            var speed = 0.5;
            var yPos = -(scrollTop - offset) * speed;
            if (scrollTop > offset - $(window).height() && scrollTop < offset + $this.height()) {
                $this.css('transform', 'translateY(' + yPos + 'px)');
            } else {
                $this.css('transform', 'translateY(0px)');
            }
        });
    }

    // Apply parallax on scroll
    $(window).scroll(function () {
        applyParallax();
    });

    // Apply parallax on page load
    $(document).ready(function() {
        applyParallax();
    });

    // Icon hover effects
    $('.service-icon, .social-icon').hover(
        function () {
            $(this).find('i').addClass('fa-bounce');
            $(this).find('.service-icon-img').addClass('fa-bounce');
        },
        function () {
            $(this).find('i').removeClass('fa-bounce');
            $(this).find('.service-icon-img').removeClass('fa-bounce');
        }
    );

    // Card click effects
    $('.card').on('click', function (e) {
        if (!$(e.target).closest('.card-arrow').length) {
            $(this).addClass('card-clicked');
            setTimeout(() => {
                $(this).removeClass('card-clicked');
            }, 1000);
        }
    });

    $('.card-sm').on('click', function (e) {
        if (!$(e.target).closest('.card-arrow').length) {
            $(this).addClass('card-sm-clicked');
            setTimeout(() => {
                $(this).removeClass('card-sm-clicked');
            }, 1000);
        }
    });

    // Arrow button click effects
    $('.card-arrow').on('click', function (e) {
        e.stopPropagation();
        var $card = $(this).closest('.card');

        var $ripple = $('<div class="ripple"></div>');
        $(this).append($ripple);

        setTimeout(() => {
            $ripple.remove();
        }, 600);

        console.log('Navigating to:', $card.find('.card-title').text());
    });

    // Typing effect for profile name
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.text('');

        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect for profile name
    setTimeout(() => {
        const profileName = $('header .profile-name');
        const originalText = profileName.text();
        typeWriter(profileName, originalText, 100);
    }, 1000);

    // Floating animation for shapes in GFonts card
    $('.service-icon-img').each(function (index) {
        $(this).css({
            'animation': `float ${3 + index * 0.5}s ease-in-out infinite`,
            'animation-delay': `${index * 0.2}s`
        });
    });

    // Add loading animation
    $('body').addClass('loaded');

    // Smooth reveal animation for page load
    $('.card').each(function (index) {
        $(this).css({
            'animation-delay': `${index * 0.1}s`
        }).addClass('fade-in');
    });

    // Handle click event on testimonial list items
    $('.testimonial-list-item').on('click', function () {
        var testimonialId = $(this).data('testimonial');
        $('.testimonial-list-item').removeClass('active');
        $('.testimonial-card').removeClass('active');
        $(this).addClass('active');
        $('#testimonial-' + testimonialId).addClass('active');
    });

    // Add custom CSS for animations via JavaScript
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .card.fade-in { animation: fadeInUp 1s ease forwards; }
            @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
            .card.animate-in { opacity: 1; transform: translateY(0); }
            .ripple { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.3); transform: scale(0); animation: ripple-animation 0.6s linear; pointer-events: none; width: 20px; height: 20px; left: 50%; top: 50%; margin-left: -10px; margin-top: -10px; }
            @keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
            .fa-bounce { animation: bounce 1s infinite; }
            @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
            body.loaded { overflow-x: hidden; }
            .star-icon { transition: transform 0.3s ease; }
        `)
        .appendTo('head');

 
    function handleScrollAnimations() {
        var windowHeight = $(window).height();
        var windowTopPosition = $(window).scrollTop();
        var windowBottomPosition = windowTopPosition + windowHeight;

        // Animate sections
        $('.scroll-triggered-section').each(function() {
            var $element = $(this);
            var elementTopPosition = $element.offset().top;
            var elementBottomPosition = elementTopPosition + $element.outerHeight();

            // Check if the section is within the viewport
            if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
                $element.addClass('visible');
            } else {
                $element.removeClass('visible');
            }
        });

        // Animate timeline cards
        $('.animated-card').each(function() {
            var $element = $(this);
            if ($element.hasClass('is-visible')) return;

            var elementTopPosition = $element.offset().top;
            if (elementTopPosition <= windowBottomPosition - 100) {
                $element.addClass('is-visible');
            }
        });

        // Animate number counters
        $('.count').each(function () {
            const $this = $(this);
            const countTo = $this.attr('data-target');
            
            var elementTopPosition = $this.offset().top;

            if (!$this.hasClass('counted') && elementTopPosition < windowBottomPosition) {
                $this.addClass('counted');
                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                });
            }
        });
    }

    // Debounce function to limit how often a function can run.
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args);
            }, wait);
        };
    }

    var debouncedScrollHandler = debounce(handleScrollAnimations, 16);
    $(window).on('scroll', debouncedScrollHandler);
    handleScrollAnimations();

});
