
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);


menuItems.forEach( 
	function(menuItem) { 
	  menuItem.addEventListener("click", toggleMenu);
	}
);

// Gallery.
$('.gallery')
.on('click', 'a', function(event) {

  var $a = $(this),
    $gallery = $a.parents('.gallery'),
    $modal = $gallery.children('.modal'),
    $modalImg = $modal.find('img'),
    href = $a.attr('href');

  // Not an image? Bail.
    if (!href.match(/\.(jpg|gif|png|mp4)$/))
      return;

  // Prevent default.
    event.preventDefault();
    event.stopPropagation();

  // Locked? Bail.
    if ($modal[0]._locked)
      return;

  // Lock.
    $modal[0]._locked = true;

  // Set src.
    $modalImg.attr('src', href);

  // Set visible.
    $modal.addClass('visible');

  // Focus.
    $modal.focus();

  // Delay.
    setTimeout(function() {

      // Unlock.
        $modal[0]._locked = false;

    }, 600);

})
.on('click', '.modal', function(event) {

  var $modal = $(this),
    $modalImg = $modal.find('img');

  // Locked? Bail.
    if ($modal[0]._locked)
      return;

  // Already hidden? Bail.
    if (!$modal.hasClass('visible'))
      return;

  // Stop propagation.
    event.stopPropagation();

  // Lock.
    $modal[0]._locked = true;

  // Clear visible, loaded.
    $modal
      .removeClass('loaded');

  // Delay.
    setTimeout(function() {

      $modal
        .removeClass('visible');

      setTimeout(function() {

        // Clear src.
          $modalImg.attr('src', '');

        // Unlock.
          $modal[0]._locked = false;

        // Focus.
          $body.focus();

      }, 475);

    }, 125);

})
.on('keypress', '.modal', function(event) {

  var $modal = $(this);

  // Escape? Hide modal.
    if (event.keyCode == 27)
      $modal.trigger('click');

})
.on('mouseup mousedown mousemove', '.modal', function(event) {

  // Stop propagation.
    event.stopPropagation();

})
.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
  .find('img')
    .on('load', function(event) {

      var $modalImg = $(this),
        $modal = $modalImg.parents('.modal');

      setTimeout(function() {

        // No longer visible? Bail.
          if (!$modal.hasClass('visible'))
            return;

        // Set loaded.
          $modal.addClass('loaded');

      }, 275);
    }); 


// Counter 

const counters = document.querySelectorAll('.count');
const speed = 700;

counters.forEach((counter) => {
  const updateCount = () => {
    const target = parseInt(counter.getAttribute('data-target'));
    const count = parseInt(counter.innerText);
    const increment = Math.trunc(target / speed);

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});
