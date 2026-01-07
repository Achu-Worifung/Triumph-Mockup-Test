// Initialize Swiper to show multiple slides at once
document.addEventListener('DOMContentLoaded', function () {
	if (typeof Swiper !== 'undefined') {
		var swiper = new Swiper('.mySwiper', {
			slidesPerView: 7,
			spaceBetween: 20,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			// Responsive breakpoints
			breakpoints: {
				// >= 0px
				0: {
					slidesPerView: 1,
					spaceBetween: 12,
				},
				// >= 576px
				576: {
					slidesPerView: 2,
					spaceBetween: 16,
				},
				// >= 992px
				992: {
					slidesPerView: 7,
					spaceBetween: 20,
				}
			}
		});
	}
});



function getNextSunday(date) {
	const nextSunday = new Date(date);
	nextSunday.setDate(date.getDate() + (7 - date.getDay()) % 7);
	return nextSunday;
}
// next service countdown timer
document.addEventListener('DOMContentLoaded', function () {
	var nextServiceDate = getNextSunday(new Date());
	var nextServiceDate = new Date(nextServiceDate.getFullYear(), nextServiceDate.getMonth(), nextServiceDate.getDate(), 10, 0, 0); // Next Sunday at 10:00 AM

	// Function to update the countdown timer
	function updateCountdown() {
		var now = new Date();
		var distance = nextServiceDate - now;

		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		document.getElementById('days').textContent = days + "d";
		document.getElementById('hours').textContent = hours + "h";
		document.getElementById('minutes').textContent = minutes + "m";
		document.getElementById('seconds').textContent = seconds + "s";

		setTimeout(updateCountdown, 1000);
	}

	// Start the countdown timer
	updateCountdown();
});

