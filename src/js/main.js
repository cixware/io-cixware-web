import jQuery from 'jquery';
require('bootstrap/dist/js/bootstrap.bundle');

// assign jquery to window
window.$ = jQuery;
window.jQuery = jQuery;

const api = 'https://api.okhre.com/v1';

// init functions
(($) => {
  // import libraries that requires jQuery
  require('bootstrap-tagsinput');
  "use strict";

  let header = $('#header');
  let body = $('body');

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  // Header scroll class
  $(window).scroll(function () {
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
        type: "POST",
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

  $('#freeLookup').submit((e) => {
    e.preventDefault();
    $('#lookupOutput').html('');

    const payload = {};
    $(e.target)
      .serializeArray()
      .forEach(({ name, value }) => {
        payload[name] = value;
      });

    handleRequest(e.target, {
      url: 'lookup',
      error: 'Couldn\'t lookup at the moment.',
      payload: {
        ...payload,
        numbers: payload.numbers.split(/[\s,]+/),
      }
    })
      .then((response) => {
        $('#lookupOutput').html(JSON.stringify(response, undefined, 2));
      });
  });

  $('#extendedLookup').submit((e) => {
    e.preventDefault();
    $('#lookupOutput').html('');

    const payload = {};
    $(e.target)
      .serializeArray()
      .forEach(({ name, value }) => {
        payload[name] = value;
      });

    handleRequest(e.target, {
      url: 'lookup/extended',
      error: 'Couldn\'t lookup at the moment.',
      payload: {
        ...payload,
        numbers: payload.numbers.split(/[\s,]+/),
      }
    })
      .then((response) => {
        $('#lookupOutput').html(JSON.stringify(response, undefined, 2));
      });
  });

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
})(jQuery);

