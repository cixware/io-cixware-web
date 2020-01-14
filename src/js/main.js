require('bootstrap/dist/js/bootstrap.bundle');
require('../vendors/mobile-nav/mobile-nav');
require('owl.carousel');

// assign jquery to window
window.$ = jQuery;
window.jQuery = jQuery;

const api = 'https://api.okhre.com/v1';

// init functions
(($) => {
  'use strict';

  let header = $('#header');
  let body = $('body');

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      header.addClass('header-scrolled');
    } else {
      header.removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    header.addClass('header-scrolled');
  }

  // Handles all response types
  function handleRequest(parent, { url, payload, success, error }) {
    const btnSubmit = $(parent).find('.btn-submit');
    const logArea = $(parent).find('.message-log');

    // remove message area color and content
    logArea.removeClass('text-primary text-danger');
    logArea.html('&nbsp;');

    // add loading on button
    const btnText = btnSubmit.text();
    btnSubmit.prop('disabled', true);
    btnSubmit.css({ 'min-width': `${btnSubmit.outerWidth()}px` });
    btnSubmit.html('<i class="fas fa-circle-notch fa-spin"></i>');

    console.log(payload);

    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: `${api}/${url}`,
        data: JSON.stringify(payload),
        dataType: 'JSON',
        success: (response) => {
          resolve(response);
        },
        error: ({ responseJSON: response, message }, ajaxOptions, thrownError) => {
          reject(response.message || error || thrownError || message);
        },
      });
    })
      // handle ui changes in here
      .then((response) => {
        if (success || response.message) {
          logArea.addClass('text-success');
          logArea.text(success || response.message);
        }
        return response;
      })
      .catch(error => {
        logArea.addClass('text-danger');
        logArea.text(error.message || error);
      })
      .finally(() => {
        // return back button design
        btnSubmit.prop('disabled', false);
        btnSubmit.text(btnText);
      });
  }

  $('#contactForm').submit((e) => {
    e.preventDefault();
    const payload = {};
    $(e.target)
      .serializeArray()
      .forEach(({ name, value }) => {
        payload[name] = value;
      });

    handleRequest(e.target, {
      url: 'contact',
      error: 'Couldn\'t send message at the moment. Please try again later.',
      payload,
    })
      .then(() => {
        e.target.reset();
      });
  });

  /*
  * Vendor js codes in here
  * */

  // Preloader (if the #preloader div exists)
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Smooth scroll for the navigation and links with .scrollto classes
  $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      let target = $(this.hash);
      if (target.length) {
        let top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-scrolled')) {
            top_space = top_space - 40;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space,
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.main-nav, .mobile-nav').length) {
          $('.main-nav .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  let nav_sections = $('section');
  let main_nav = $('.main-nav, .mobile-nav');
  let main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function() {
    let cur_pos = $(this).scrollTop();

    nav_sections.each(function() {
      let top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
    });
  });

  // jQuery counterUp (used in Whu Us section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    let portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
    });
    $('#portfolio-flters li').on('click', function() {
      $('#portfolio-flters li').removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $('.testimonials-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Clients carousel (uses the Owl Carousel library)
  $('.clients-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 },
    },
  });

})(jQuery);

