/* =========================================================
   ABONGA MNENO WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");


    if (menuToggle && navLinks) {


        // Open / close menu

        menuToggle.addEventListener("click", function (event) {

            event.preventDefault();

            event.stopPropagation();


            navLinks.classList.toggle("active");


            const menuIsOpen =
                navLinks.classList.contains("active");


            menuToggle.setAttribute(
                "aria-expanded",
                menuIsOpen ? "true" : "false"
            );


            // Change hamburger icon

            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                if (menuIsOpen) {

                    icon.classList.remove("fa-bars");

                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            }

        });



        // Close menu when navigation link is clicked

        const navigationLinks =
            navLinks.querySelectorAll("a");


        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            });

        });



        // Close menu when clicking outside

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !navLinks.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {

                    navLinks.classList.remove("active");


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector("i");


                    if (icon) {

                        icon.classList.remove("fa-xmark");

                        icon.classList.add("fa-bars");

                    }

                }

            }
        );


    }



    /* =====================================================
       SLIDESHOW VARIABLES
    ===================================================== */

    const slideshowGroups = {};

    const allSlides =
        document.querySelectorAll(".slide");


    /*
       Create a separate slideshow group.

       Example:

       family-slide
       friends-slide
    */

    allSlides.forEach(function (slide) {

        slide.classList.remove("active-slide");

    });


    /* =====================================================
       INITIALISE SLIDESHOW
    ===================================================== */

    function initializeSlideshow(groupName) {


        const slides =
            document.querySelectorAll("." + groupName);


        if (slides.length === 0) {

            return;

        }


        slideshowGroups[groupName] = {

            current: 0,

            slides: slides

        };


        // Show first slide

        showSlide(0, groupName);


        // Automatic slideshow

        setInterval(function () {

            changeSlide(1, groupName);

        }, 5000);

    }



    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showSlide(index, groupName) {


        const group =
            slideshowGroups[groupName];


        if (!group) {

            return;

        }


        const slides =
            group.slides;


        if (slides.length === 0) {

            return;

        }


        // Loop to first slide

        if (index >= slides.length) {

            index = 0;

        }


        // Loop to last slide

        if (index < 0) {

            index = slides.length - 1;

        }


        group.current = index;


        // Hide all slides

        slides.forEach(function (slide) {

            slide.classList.remove(
                "active-slide"
            );

        });


        // Show current slide

        slides[index].classList.add(
            "active-slide"
        );


        /* =================================================
           UPDATE DOTS
        ================================================= */

        let dots;


        if (groupName === "family-slide") {

            dots =
                document.querySelectorAll(
                    ".family-dots .dot"
                );

        }


        if (groupName === "friends-slide") {

            dots =
                document.querySelectorAll(
                    ".friends-dots .dot"
                );

        }


        if (dots) {

            dots.forEach(function (dot) {

                dot.classList.remove(
                    "active-dot"
                );

            });


            if (dots[index]) {

                dots[index].classList.add(
                    "active-dot"
                );

            }

        }

    }



    /* =====================================================
       NEXT / PREVIOUS SLIDE
    ===================================================== */

    window.changeSlide = function (
        direction,
        groupName
    ) {


        const group =
            slideshowGroups[groupName];


        if (!group) {

            return;

        }


        const newIndex =
            group.current + direction;


        showSlide(
            newIndex,
            groupName
        );

    };



    /* =====================================================
       SELECT SPECIFIC SLIDE
    ===================================================== */

    window.currentSlide = function (
        slideNumber,
        groupName
    ) {


        const group =
            slideshowGroups[groupName];


        if (!group) {

            return;

        }


        /*
           HTML uses:

           1 = first slide
           2 = second slide
           3 = third slide

           JavaScript uses:

           0 = first slide
           1 = second slide
           2 = third slide
        */

        const index =
            slideNumber - 1;


        showSlide(
            index,
            groupName
        );

    };



    /* =====================================================
       FIND AND START SLIDESHOWS
    ===================================================== */


    if (
        document.querySelector(
            ".family-slide"
        )
    ) {

        initializeSlideshow(
            "family-slide"
        );

    }


    if (
        document.querySelector(
            ".friends-slide"
        )
    ) {

        initializeSlideshow(
            "friends-slide"
        );

    }


});