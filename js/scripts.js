// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 360) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
}

$(() => {
	$('body').on('click', '.mob-menu-btn', function (e) {
		e.preventDefault()

		$('.header').addClass('show')
		$('body').addClass('menu-open')
	})

	$('body').on('click', '.header__close', function (e) {
		e.preventDefault()

		$('.header').removeClass('show')
		$('body').removeClass('menu-open')
	})


	// favorite
	$('body').on('click', '.product__favorite:not(.product__favorite_delete), .product-info__favorite', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
		} else {
			$(this).addClass('active')
		}
	})

	$('body').on('click', '.product__favorite_delete', function (e) {
		e.preventDefault()

		$(this).closest('.product').remove()
	})

	//
	if ($('.main-slider').length) {
		new Swiper('.main-slider', {
			loop: true,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 0,
			slidesPerView: 1,
			preloadImages: false,
			runCallbacksOnInit: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			// autoplay: {
			// 	delay: 3000,
			// 	disableOnInteraction: false
			// },
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			on: {
				init: function (swiper) {
					let lengthSlide = $(swiper.$el).find('.swiper-slide:not(.swiper-slide-duplicate)').length

					if ( swiper.realIndex + 1 < 10 ) {
						$(swiper.$el).find('.slider-number__active').text('0' + (swiper.realIndex + 1))
					} else{
						$(swiper.$el).find('.slider-number__active').text(swiper.realIndex + 1)
					}

					if ( lengthSlide < 10 ) {
						$(swiper.$el).find('.slider-number__all').text('0' + lengthSlide)
					} else {
						$(swiper.$el).find('.slider-number__all').text(lengthSlide)
					}

					if ( $(swiper.$el).find('.swiper-slide-active').hasClass('swiper-slide_darck') ){
						$(swiper.$el).find('.slider-number').addClass('white')

						$(swiper.$el).find('.slider-button-prev, .slider-button-next').addClass('light')
					}

					let pos = $(swiper.$el).find('.swiper-slide-active .main-slider__box').innerHeight()

					$(swiper.$el).find('.slider-number, .slider-progressbar').css('margin-top', (pos/2)*-1)
				},
				slideChange: function (swiper){
					if ( swiper.realIndex + 1 < 10 ) {
						$(swiper.$el).find('.slider-number__active').text('0' + (swiper.realIndex + 1))
					} else{
						$(swiper.$el).find('.slider-number__active').text(swiper.realIndex + 1)
					}
				},
				slideChangeTransitionEnd: function (swiper){
					if ( $(swiper.$el).find('.swiper-slide-active').hasClass('swiper-slide_darck') ){
						$(swiper.$el).find('.slider-number').addClass('white')

						$(swiper.$el).find('.slider-button-prev, .slider-button-next').addClass('light')
					} else {
						$(swiper.$el).find('.slider-number').removeClass('white')

						$(swiper.$el).find('.slider-button-prev, .slider-button-next').removeClass('light')
					}

					let pos = $(swiper.$el).find('.swiper-slide-active .main-slider__box').innerHeight()
					let posTop = $(swiper.$el).find('.swiper-slide-active .main-slider__img').innerHeight()

					// console.log($(swiper.$el).find('.swiper-slide-active').find('.main-slider__box').hasClass('main-slider__box_order'))
					// console.log(posTop)

					// if ( $(window).width() < 768 ){
					// 	if ( $(swiper.$el).find('.swiper-slide-active').find('.main-slider__box').hasClass('main-slider__box_order') ){
					// 		$(swiper.$el).find('.slider-number, .slider-progressbar').css({'transform': 'translateY('+posTop+'px)'})
					// 	} else {
					// 		$(swiper.$el).find('.slider-number, .slider-progressbar').css({'transform': 'translateY(0)'})
					// 	}
					// } else {
					// 	$(swiper.$el).find('.slider-number, .slider-progressbar').css('margin-top', (pos/2)*-1)
					// }
				},
			}
		})
	}


	//
	if ($('.services__slider').length) {
		new Swiper('.services__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			breakpoints: {
				'320': {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				'640': {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				'1025': {
					spaceBetween: 15,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				},
				resize: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				}
			}
		})
	}


	//
	if ($('.reviews-reception__slider').length) {
		new Swiper('.reviews-reception__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 15,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			breakpoints: {
				'320': {
					slidesPerView: 'auto',
				},
				'480': {
					slidesPerView: 'auto',
				},
				'640': {
					slidesPerView: 'auto',
				},
				'1025': {
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				},
				resize: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				}
			}
		})
	}


	//
	if ($('.about-battery__slider').length) {
		new Swiper('.about-battery__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 15,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			breakpoints: {
				'320': {
					slidesPerView: 'auto',
				},
				'480': {
					slidesPerView: 'auto',
				},
				'640': {
					slidesPerView: 'auto',
				},
				'1025': {
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				},
				resize: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				}
			}
		})
	}


	if ($('.service-adv__slider').length) {
		new Swiper('.service-adv__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 15,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
					slidesPerView: 'auto',
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				'640': {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				'1025': {
					spaceBetween: 15,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				},
				resize: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				}
			}
		})
	}


	//
	if ($('.our-work__slider').length) {
		new Swiper('.our-work__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			paceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			breakpoints: {
				'320': {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 'auto',
				},
				'640': {
					spaceBetween: 15,
					slidesPerView: 'auto',
				},
				'1025': {
					spaceBetween: 15,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				},
				resize: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				}
			}
		})
	}


	//
	if ($('.reviews__slider').length) {
		new Swiper('.reviews__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			paceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			grid: {
				rows: 1
			},
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			breakpoints: {
				'320': {
					spaceBetween: 20,
					slidesPerView: 'auto',
					grid: {
						rows: 1
					}
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 'auto',
					grid: {
						rows: 1
					}
				},
				'640': {
					spaceBetween: 15,
					slidesPerView: 'auto',
					grid: {
						rows: 1
					}
				},
				'1025': {
					spaceBetween: 15,
					slidesPerView: 3,
					grid: {
						rows: 1
					}
				},
				'1200': {
					spaceBetween: 15,
					slidesPerView: 3,
					grid: {
						rows: 2
					}
				}
			},
			on: {
				init: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				},
				resize: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				}
			}
		})
	}


	//
	if ($('.photo-price__slider').length) {
		new Swiper('.photo-price__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 15,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				'640': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				'1025': {
					spaceBetween: 20,
					slidesPerView: 2
				},
				'1200': {
					spaceBetween: 20,
					slidesPerView: 2
				}
			},
			on: {
				init: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				},
				resize: function (swiper) {
					if (swiper.visibleSlides.length < swiper.slides.length) {
						$(swiper.$el).addClass('_pad')
					} else {
						$(swiper.$el).removeClass('_pad')
					}
				}
			}
		})
	}


	if ($('.product-info__slider').length) {
		var thumbs = new Swiper(".product-info__thumb", {
			loop: false,
			slidesPerView: 4,
			spaceBetween: 12,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			initialSlide: 1,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			breakpoints: {
				'320': {
					slidesPerView: 4,
					spaceBetween: 12
				},
				'480': {
					slidesPerView: 4,
					spaceBetween: 12
				},
				'768': {
					slidesPerView: 8,
					spaceBetween: 20
				}
			}
		})

		new Swiper(".product-info__slider", {
			loop: false,
			speed: 500,
			spaceBetween: 20,
			watchOverflow: true,
            watchSlidesProgress: true,
			slidesPerView: 1,
			effect: 'fade',
			initialSlide: 1,
			fadeEffect: {
				crossFade: true
			},
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			thumbs: {
				swiper: thumbs
			}
		})
	}
});


$(window).on('load', () => {
	if ( $('.section-prices__wrap').length ) {
		pricesSlider()
	}

	if ($('.massage-reviews__wrap').length){
		massageReviewsSlider()
	}

	if ($('.video-reviews__wrap').length){
		videoReviewsFunction()
	}

	if ($('.voice-reviews__wrap').length){
		videoVoiceSlider()
	}

	if ($('.conditions-service__wrap').length){
		conditionsServiceSlider()
	}

	GreenAudioPlayer.init({
		selector: '.player-js',
		stopOthersOnPlay: true
	})


	$("#dropzone-photo").dropzone({
		url: "/file/post",
		addRemoveLinks: true,
		dictRemoveFile: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 9L9 15" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 9L15 15" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		dictCancelUploadConfirmation : '<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 11.0799V11.9999C22.4988 14.1563 21.8005 16.2545 20.5093 17.9817C19.2182 19.7088 17.4033 20.9723 15.3354 21.5838C13.2674 22.1952 11.0573 22.1218 9.03447 21.3744C7.01168 20.6271 5.28465 19.246 4.11096 17.4369C2.93727 15.6279 2.37979 13.4879 2.52168 11.3362C2.66356 9.18443 3.49721 7.13619 4.89828 5.49694C6.29935 3.85768 8.19279 2.71525 10.2962 2.24001C12.3996 1.76477 14.6003 1.9822 16.57 2.85986" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22.5 4L12.5 14.01L9.5 11.01" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
	});
});


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		if ($(window).width() < 1400) {
			$('.fixed-menu__block:not(._nopc)').removeClass('_pc')
			if (!$('.fixed-menu__block').hasClass('._nopc')){
				$('.header__btn_menu').removeClass('active')
			}
		} else {
			$('.fixed-menu__block:not(._nopc)').addClass('_pc')
			if (!$('.fixed-menu__block').hasClass('._nopc')){
				$('.header__btn_menu').addClass('active')
			}
		}

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 360) document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}


	if ( $('.section-prices__wrap').length ) {
		pricesSlider()
	}

	if ($('.massage-reviews__wrap').length){
		massageReviewsSlider()
	}

	if ($('.video-reviews__wrap').length){
		videoReviewsFunction()
	}

	if ($('.voice-reviews__wrap').length){
		videoVoiceSlider()
	}

	if ($('.conditions-service__wrap').length){
		conditionsServiceSlider()
	}
});

function pricesSlider(){
	if ( $(window).width() < 640 && !$('.section-prices__wrap').hasClass('swiper-initialized') ) {
		$('.section-prices__wrap').addClass('swiper')
		$('.section-prices__grid').addClass('swiper-wrapper')
		$('.section-prices__grid').removeClass('_grid')
		$('.section-prices__item').addClass('swiper-slide')

		pricesSliderSwiper = new Swiper('.section-prices__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			freeMode: {
				enabled: true,
				sticky: false,
			},
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			}
		})
	}
	else if ($(window).width() > 639 && $('.section-prices__wrap').hasClass('swiper-initialized')) {
		if ($('.section-prices__wrap').length === 1 && $('.section-prices__wrap').hasClass('swiper-initialized')) {
			pricesSliderSwiper.destroy(true, true)
		} else if ($('.section-prices__wrap').length >= 2 && $('.section-prices__wrap').hasClass('swiper-initialized')) {
			pricesSliderSwiper.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.section-prices__wrap').removeClass('swiper')
		$('.section-prices__grid').removeClass('swiper-wrapper')
		$('.section-prices__grid').addClass('_grid')
		$('.section-prices__item').removeClass('swiper-slide')
	}
}

function conditionsServiceSlider(){
	if ( $(window).width() < 640 && !$('.conditions-service__wrap').hasClass('swiper-initialized') ) {
		$('.conditions-service__wrap').addClass('swiper')
		$('.conditions-service__grid').addClass('swiper-wrapper')
		$('.conditions-service__grid').removeClass('_flex')
		$('.conditions-service__item').addClass('swiper-slide')

		conditionsServiceSliderSwiper = new Swiper('.conditions-service__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			}
		})
	}
	else if ($(window).width() > 639 && $('.conditions-service__wrap').hasClass('swiper-initialized')) {
		if ($('.conditions-service__wrap').length === 1 && $('.conditions-service__wrap').hasClass('swiper-initialized')) {
			conditionsServiceSliderSwiper.destroy(true, true)
		} else if ($('.conditions-service__wrap').length >= 2 && $('.conditions-service__wrap').hasClass('swiper-initialized')) {
			conditionsServiceSliderSwiper.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.conditions-service__wrap').removeClass('swiper')
		$('.conditions-service__grid').removeClass('swiper-wrapper')
		$('.conditions-service__grid').addClass('_flex')
		$('.conditions-service__item').removeClass('swiper-slide')
	}
}

function massageReviewsSlider(){
	if ( $(window).width() < 640 && !$('.massage-reviews__wrap').hasClass('swiper-initialized') ) {
		$('.massage-reviews__wrap').addClass('swiper')
		$('.massage-reviews__grid').addClass('swiper-wrapper')
		$('.massage-reviews__grid').removeClass('_flex')
		$('.massage-reviews__item, .massage-reviews__more').addClass('swiper-slide')

		massageReviewsSwiper = new Swiper('.massage-reviews__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 50,
			slidesPerView: 'auto',
			preloadImages: false,
			freeMode: {
				enabled: true,
				sticky: false,
			},
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			}
		})
	}
	else if ($(window).width() > 639 && $('.massage-reviews__wrap').hasClass('swiper-initialized')) {
		if ($('.massage-reviews__wrap').length === 1 && $('.massage-reviews__wrap').hasClass('swiper-initialized')) {
			massageReviewsSwiper.destroy(true, true)
		} else if ($('.massage-reviews__wrap').length >= 2 && $('.massage-reviews__wrap').hasClass('swiper-initialized')) {
			massageReviewsSwiper.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.massage-reviews__wrap').removeClass('swiper')
		$('.massage-reviews__grid').removeClass('swiper-wrapper')
		$('.massage-reviews__grid').addClass('_flex')
		$('.massage-reviews__item, .massage-reviews__more').removeClass('swiper-slide')
	}
}

function videoReviewsFunction(){
	if ( $(window).width() < 640 && !$('.video-reviews__wrap').hasClass('swiper-initialized') ) {
		$('.video-reviews__wrap').addClass('swiper')
		$('.video-reviews__grid').addClass('swiper-wrapper')
		$('.video-reviews__grid').removeClass('_flex')
		$('.video-reviews__video, .video-reviews__more').addClass('swiper-slide')

		videoReviewsSwiper = new Swiper('.video-reviews__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 25,
			slidesPerView: 'auto',
			preloadImages: false,
			freeMode: {
				enabled: true,
				sticky: false,
			},
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			}
		})
	}
	else if ($(window).width() > 639 && $('.video-reviews__wrap').hasClass('swiper-initialized')) {
		if ($('.video-reviews__wrap').length === 1 && $('.video-reviews__wrap').hasClass('swiper-initialized')) {
			videoReviewsSwiper.destroy(true, true)
		} else if ($('.video-reviews__wrap').length >= 2 && $('.video-reviews__wrap').hasClass('swiper-initialized')) {
			videoReviewsSwiper.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.video-reviews__wrap').removeClass('swiper')
		$('.video-reviews__grid').removeClass('swiper-wrapper')
		$('.video-reviews__grid').addClass('_flex')
		$('.video-reviews__video, .video-reviews__more').removeClass('swiper-slide')
	}
}

function videoVoiceSlider(){
	if ( $(window).width() < 640 && !$('.voice-reviews__wrap').hasClass('swiper-initialized') ) {
		$('.voice-reviews__wrap').addClass('swiper')
		$('.voice-reviews__grid').addClass('swiper-wrapper')
		$('.voice-reviews__grid').removeClass('_flex')
		$('.voice-reviews__item, .voice-reviews__more').addClass('swiper-slide')

		videoVoiceSwiper = new Swiper('.voice-reviews__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 30,
			slidesPerView: 'auto',
			preloadImages: false,
			freeMode: {
				enabled: true,
				sticky: false,
			},
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			}
		})
	}
	else if ($(window).width() > 639 && $('.voice-reviews__wrap').hasClass('swiper-initialized')) {
		if ($('.voice-reviews__wrap').length === 1 && $('.voice-reviews__wrap').hasClass('swiper-initialized')) {
			videoVoiceSwiper.destroy(true, true)
		} else if ($('.voice-reviews__wrap').length >= 2 && $('.voice-reviews__wrap').hasClass('swiper-initialized')) {
			videoVoiceSwiper.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.voice-reviews__wrap').removeClass('swiper')
		$('.voice-reviews__grid').removeClass('swiper-wrapper')
		$('.voice-reviews__grid').addClass('_flex')
		$('.voice-reviews__item, .voice-reviews__more').removeClass('swiper-slide')
	}
}