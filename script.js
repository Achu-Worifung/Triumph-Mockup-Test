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
