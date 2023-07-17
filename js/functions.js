// Observer API
const boxes = document.querySelectorAll('.lazyload')
	
function scrollTracking(entries) {
	for (const entry of entries) {
		if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
			entry.target.src = entry.target.getAttribute('data-src')

			entry.target.classList.add('loaded')
		}

		if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-srcset') && !entry.target.classList.contains('loaded')) {
			entry.target.srcset = entry.target.getAttribute('data-srcset')

			entry.target.classList.add('loaded')
		}

		if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-map') && !entry.target.classList.contains('loaded')) {
			entry.target.classList.add('loaded')

			addScriptsURL('http://api-maps.yandex.ru/2.1.75/?load=package.standard,package.geoObjects&lang=ru-RU')
		}
	}
}

const observer = new IntersectionObserver(scrollTracking, {
	threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
})


boxes.forEach(element => observer.observe(element))

$(() => {
	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) $('html').addClass('custom_scroll')


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Аккордион
	$('body').on('click', '.accordion__title', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.accordion__item')
		let accordion = $(this).closest('.accordion')

		if( parent.hasClass('active') ) {
			parent.removeClass('active')
			parent.find('.accordion__data').slideUp(300)
		} else {
			accordion.find('.accordion__item').removeClass('active')
			accordion.find('.accordion__data').slideUp(300)

			parent.addClass('active')
			parent.find('.accordion__data').slideDown(300)
		}
	})


	$('body').on('click', '.header__btn_about', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')){
			$(this).removeClass('active')
			$(this).closest('.header__list').find('.header__list-box').removeClass('_show')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.header__btn_about').removeClass('active')
			$('.header__list-box').removeClass('_show')

			$(this).addClass('active')
			$(this).closest('.header__list').find('.header__list-box').addClass('_show')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})


	$('body').on('click', '.header__btn_price', function (e) {
		e.preventDefault()

		$(this).next().addClass('_show')

		$('body').addClass('look-price')
	})

	$('body').on('click', '.header__prices-close', function (e) {
		e.preventDefault()

		$(this).closest('.header__prices').removeClass('_show')

		$('body').removeClass('look-price')
	})


	
	$('body').on('click', '.header__btn_menu', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.fixed-menu').removeClass('_show')
			$('fixed-menu__open').removeClass('_active')
			$('body').removeClass('look-menu')

			$('.fixed-menu__block').removeClass('_pc _show')
			$('.fixed-menu__block').addClass('_nopc')
			menuTransform()
		} else{
			$(this).addClass('active')
			$('.fixed-menu').addClass('_show')
			$('fixed-menu__open').addClass('active')
			$('.fixed-menu__block').addClass('_show')
			$('body').addClass('look-menu')
	
			if ($(window).width() > 1199) {
				$('.fixed-menu__block').addClass('_pc')
				$('.fixed-menu__block').removeClass('_nopc')
	
				menuTransform()
			}
		}
	})

	$('body').on('click', '.fixed-menu__open', function (e) {
		e.preventDefault()

		$(this).addClass('_active')
		$('.fixed-menu').addClass('_show')
		$('.header__btn_menu').addClass('active')
		$('.fixed-menu__block').addClass('_show')
		$('body').addClass('look-menu')

		if ($(window).width() > 1199) {
			$('.fixed-menu__block').addClass('_pc')
			$('.fixed-menu__block').removeClass('_nopc')

			menuTransform()
		}
	})

	$('body').on('click', '.fixed-menu__close', function (e) {
		e.preventDefault()

		$('.fixed-menu').removeClass('_show')
		$('.fixed-menu__open').removeClass('_active')
		$('.header__btn_menu').removeClass('active')
		$('body').removeClass('look-menu')

		$('.fixed-menu__block').removeClass('_pc _show')
		$('.fixed-menu__block').addClass('_nopc')
		menuTransform()
	})


	$('body').on('click', '.aside-list__link._sub', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')){
			$(this).removeClass('_active')

			if ($(window).width() > 639) {
				$(this).next().slideUp()
			} else {
				$(this).next().hide()
			}
		} else {
			$(this).addClass('_active')

			if ($(window).width() > 639) {
				$(this).next().slideDown()
			} else {
				$(this).next().show()
			}
		}
	})


	$('body').on('click', '.fixed-menu__name', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')){
			$(this).removeClass('_active')

			$(this).next().removeClass('_show')
		} else {
			$(this).addClass('_active')

			$(this).next().addClass('_show')
		}
	})


	$('body').on('click', '.global-menu__link._sub', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')){
			$(this).removeClass('active')

			$(this).next().hide()
		} else {
			$(this).addClass('active')

			$(this).next().show()
		}
	})


	// Мини всплывающие окна
	$('.mini-modal__btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini-modal__modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini-modal__btn').removeClass('active')
			$(this).addClass('active')

			$('.mini-modal__modal').removeClass('active')
			parent.find('.mini-modal__modal').addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.mini-modal') ) {
			$('.mini-modal__modal, .mini-modal__btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}

		if ( !e.target.closest('.header__list_about') ) {
			$('.header__btn_about').removeClass('active')
			$('.header__list-box').removeClass('_show')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})

	// Поиск
	$('body').on('click', '.mini-modal__btn_search', function() {
		if( $(this).hasClass('active') ) {
			setTimeout( function() {
				$('#search_input').focus()
			}, 50)
		}
    })


	$('body').on('click', '.section-prices__more', function(e) {
		e.preventDefault()

		$(this).closest('.section-prices__wrap-btn').hide()
		$(this).closest('.section-prices').find('.hide-mob').addClass('_show')
	})


	$('body').on('click', '.important-info__more', function(e) {
		e.preventDefault()

		$(this).closest('.important-info__wrap-btn').hide()
		$(this).closest('.important-info').find('.hide-mob').addClass('_show')
	})


	$('body').on('click', '.prices-service__more', function(e) {
		e.preventDefault()

		$(this).closest('.prices-service__wrap-btn').hide()
		$(this).closest('.prices-service').find('.hide-mob').addClass('_show')
	})


	$('body').on('click', '.prices-today__more', function(e) {
		e.preventDefault()

		$(this).closest('.prices-today__wrap-btn').hide()
		$(this).closest('.prices-today').find('.hide-mob').addClass('_show')
	})


	$('body').on('click', '.important-info__item-open', function(e) {
		e.preventDefault()

		if ($(this).hasClass('active')){
			$(this).removeClass('active')

			$(this).next().removeClass('_show')
		} else {
			$(this).addClass('active')

			$(this).next().addClass('_show')
		}
	})


	$('body').on('click', '.footer__title ._sub', function(e) {
		e.preventDefault()

		if ($(this).hasClass('active')){
			$(this).removeClass('active')

			$(this).parent().next().removeClass('_show')
		} else {
			$(this).addClass('active')

			$(this).parent().next().addClass('_show')
		}
	})


	$('body').on('click', '.scheme__cols-btn', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.scheme__cols')

		if (!$(this).hasClass('active')){
			parent.find('.scheme__cols-btn').removeClass('active')
			parent.find('.scheme__col').removeClass('_show')

			let index = $(this).index()
			
			$(this).addClass('active')
			parent.find(`.scheme__col:eq(${index})`).addClass('_show')
		}
	})


	// Tooltip
	$('body').on('click', '.tooltip__btn', function(e) {
		e.preventDefault()

		const parent = $(this).closest('.tooltip')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.tooltip__box').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.tooltip__btn').removeClass('active')
			$(this).addClass('active')

			$('.tooltip__box').removeClass('active')
			parent.find('.tooltip__box').addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})


	// Tooltip close
	$(document).click((e) => {
		if ( !e.target.closest('.tooltip') ) {
			$('.tooltip__btn, .tooltip__box').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Плавная прокрутка к якорю
	$('.scroll-btn').click(function(e) {
		e.preventDefault()

		let href = $(this).data('anchor'),
			offset = $('.header').innerHeight();

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - offset }, 1000)
	})


	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})


	// Кастомный select
	$('select').niceSelect()


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false

	Fancybox.defaults.template = {
		closeButton: '<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11.0001 20C15.9706 20 20.0001 15.9706 20.0001 11C20.0001 6.02944 15.9706 2 11.0001 2C6.02952 2 2.00008 6.02944 2.00008 11C2.00008 15.9706 6.02952 20 11.0001 20ZM7.70702 15.7071L10.9999 12.4142L14.2928 15.7071L15.707 14.2928L12.4141 11L15.707 7.70706L14.2928 6.29285L10.9999 9.58574L7.70702 6.29285L6.2928 7.70706L9.5857 11L6.2928 14.2928L7.70702 15.7071Z" /></svg>',
	}

	// Всплывающие окна
	$('body').on('click', '.modal-btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])
	})

	// Увеличение картинки
	Fancybox.bind('.fancy-img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	$('body').on('click', '.form__edit', function (e) {
		e.preventDefault()

		const parent = $(this).closest('.form__filed')

		if ($(this).hasClass('active')){
			$(this).removeClass('active')

			parent.find('.form__input').attr('disabled', true)
		} else {
			$(this).addClass('active')

			parent.find('.form__input').attr('disabled', false)
		}
	})

	$('body').on('mouseover', '.header__catalog', function (e) {
		e.preventDefault()

		$('.overlay').addClass('show')

		$('.header__catalog-open').addClass('active')
	})

	$('body').on('mouseleave', '.header__catalog', function (e) {
		e.preventDefault()

		$('.overlay').removeClass('show')

		$('.header__catalog-open').removeClass('active')
	})

	if ( $(window).width() < 1025 ) {
		$('body').on('click', '.header__catalog-open', function (e) {
			e.preventDefault()

			if ( $(this).hasClass('_active') ) {
				$(this).removeClass('_active')
				$('.catalog-head').removeClass('_show')
			} else{
				$(this).addClass('_active')
				$('.catalog-head').addClass('_show')
			}
		})

		$('body').on('click', '.catalog-head__link._sublink', function (e) {
			e.preventDefault()

			if ( $(this).hasClass('_active') ) {
				$(this).removeClass('_active')
				$(this).next().removeClass('_show')
			} else{
				$(this).addClass('_active')
				$(this).next().addClass('_show')
			}
		})
	}

	if ( $(window).width() < 768 ) {
		$('body').on('click', '.footer__open', function (e) {
			e.preventDefault()

			if ($(this).hasClass('_active')){
				$(this).removeClass('_active')

				$(this).closest('.footer__block').find('.footer__menu').removeClass('_show')
			} else {
				$(this).addClass('_active')

				$(this).closest('.footer__block').find('.footer__menu').addClass('_show')
			}
		})
	}



	$('body').on('click', '.page-cart__head-open', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')){
			$(this).removeClass('active')

			$(this).closest('.page-cart__features').find('.page-cart__data').hide()
		} else {
			$(this).addClass('active')

			$(this).closest('.page-cart__features').find('.page-cart__data').show()
		}
	})


	$('body').on('click', '.order__head', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')){
			$(this).removeClass('active')

			$(this).next().hide()
		} else {
			$(this).addClass('active')

			$(this).next().show()
		}
	})


	$('body').on('click', '.open-filter', function (e) {
		e.preventDefault()

		$('.filter').addClass('show')

		$('.filter-overlay').fadeIn()

		$('body').addClass('filter-open')
	})

	$('body').on('click', '.filter__close, .filter-overlay', function (e) {
		e.preventDefault()

		$('.filter').removeClass('show')

		$('.filter-overlay').fadeOut()

		$('body').removeClass('filter-open')
	})


	$('body').on('click', '.filter__title', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')){
			$(this).removeClass('active')

			$(this).next().hide()
		} else {
			$(this).addClass('active')

			$(this).next().show()
		}
	})


	$('body').on('click', '.catedory__more', function (e) {
		e.preventDefault()

		$(this).addClass('hide')
		$(this).closest('.catedory__item').find('.catedory__list-item').addClass('show')
	})

	$('.catedory__list').each(function() {
		let length = $(this).find('.catedory__list-item').length

		if ( length > 3 ){
			$(this).closest('.catedory__item').find('.catedory__more').addClass('show')
		}
	})


	$('.aside__menu-link.active').each(function() {
		let offset = $(this).offset().left,
			width = $(this).innerWidth()/2;

		let	scroll = offset - $(window).width()/2 + width;

		$(this).closest('.aside__menu').scrollLeft(scroll);
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs__button', function(e) {
		e.preventDefault()

		if( !$(this).hasClass('active') ) {
			let parent = $(this).closest('.tabs-container')
			let activeTab = $(this).data('content')
			let level = $(this).data('level')

			parent.find('.tabs:first').find('.tabs__button').removeClass('active')
			parent.find('.tab-content.' + level).removeClass('active')

			$(this).addClass('active')
			$(activeTab).addClass('active')
		}
	})

	if( locationHash && $('.tabs-container').length ) {
		let activeTab = $('.tabs__button[data-content="'+ locationHash +'"]')
		let parent = activeTab.closest('.tabs-container')
		let level = activeTab.data('level')

		parent.find('.tabs:first').find('.tabs__button').removeClass('active')
		parent.find('.tab-content.' + level).removeClass('active')

		activeTab.addClass('active')
		$(locationHash).addClass('active')

		$('html, body').stop().animate({
			scrollTop: $(locationHash).offset().top
		}, 1000)
	}

	if ($(window).width() < 1400) {
		$('.fixed-menu__block').removeClass('_pc')

		$('.header__btn_menu').removeClass('active')
	}
})


$(window).on('load', () => {
	menuTransform()

	// Шапка
	if( $(window).scrollTop() > ($('.fixed-menu').offset().top + $('.fixed-menu').outerHeight() + 100) ) {
		if ($(window).width() > 639) {
			$('.fixed-menu__fix').addClass('fixed')
		}

		if ($(window).width() > 1399) {
			$('.fixed-menu__block:not(._nopc)').removeClass('_pc')
			if (!$('.fixed-menu__block').hasClass('_show')){
				$('.header__btn_menu').removeClass('active')
			}
		}

		menuTransform()
	} else{
		$('.fixed-menu__fix').removeClass('fixed')

		if ($(window).width() > 1399) {
			$('.fixed-menu__block:not(._nopc)').addClass('_pc')
			if (!$('.fixed-menu__block').hasClass('_show')){
				$('.header__btn_menu').addClass('active')
			}
		}

		menuTransform()
	}

	if( $(window).scrollTop() > $('.header').innerHeight() ) {
		if ($(window).width() > 639) {
			$('.header').addClass('fixed')
			$('.header').removeClass('fixed-mob')
		} else {
			$('.header').addClass('fixed-mob')
			$('.header').removeClass('fixed')
		}
	} else {
		$('.header').removeClass('fixed')
		$('.header').removeClass('fixed-mob')
	}

	$(window).scroll(function(){
		if( $(window).scrollTop() > ($('.fixed-menu').offset().top + $('.fixed-menu').outerHeight() + 100) ) {
			if ($(window).width() > 639) {
				$('.fixed-menu__fix').addClass('fixed')
			}

			if ($(window).width() > 1399) {
				$('.fixed-menu__block:not(._nopc)').removeClass('_pc')
				if (!$('.fixed-menu__block').hasClass('_show')){
					$('.header__btn_menu').removeClass('active')
				}
			}

			menuTransform()
		} else{
			$('.fixed-menu__fix').removeClass('fixed')

			if ($(window).width() > 1399) {
				$('.fixed-menu__block:not(._nopc)').addClass('_pc')
				if (!$('.fixed-menu__block').hasClass('_show')){
					$('.header__btn_menu').addClass('active')
				}
			}
			
			menuTransform()
		}

		if( $(window).scrollTop() > $('.header').innerHeight() ) {
			if ($(window).width() > 639) {
				$('.header').addClass('fixed')
				$('.header').removeClass('fixed-mob')
			} else {
				$('.header').addClass('fixed-mob')
				$('.header').removeClass('fixed')
			}
		} else {
			$('.header').removeClass('fixed')
			$('.header').removeClass('fixed-mob')
		}
	})

	menuFuter()
})


$(window).on('resize', () => {
	menuTransform()

	menuFuter()
})


// Вспомогательные функции
const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}

function setHeight(className){
    let maxheight = 0

    className.each(function() {
		let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
			maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}

const is_touch_device = () => !!('ontouchstart' in window)


function menuTransform() {
	if ($('.fixed-menu__block:not(._nopc)')) {
		// $('.padmenu__block').css('transform', 'translateX(0px)')
		$('.padmenu__block').css('margin-right', '0')
		$('.padmenu').css('padding-left', '0')
		$('.padmenu__block').css('padding-left', '0')
		$('.padmenu__block').removeClass('_pad')
	}

	let offsetLeft = $('.padmenu').offset().left,
		widthFixedMenuBlock = $('.fixed-menu__block').outerWidth()

	if(!$('.fixed-menu__fix').hasClass('fixed')){
		if (offsetLeft < widthFixedMenuBlock && $(window).width() > 1399) {
			let difference = widthFixedMenuBlock - offsetLeft

			
			if ($('.fixed-menu__block:not(._nopc)').hasClass('_pc')) {
				if ($(window).width() > 1679) {
					// $('.padmenu__block').css('transform', `translateX(${difference+15+'px'})`)
					$('.padmenu__block').css('margin-right', `${(difference+15)*-1+'px'}`)
					$('.padmenu').css('padding-left', `${difference+15+'px'}`)
					$('.padmenu__block').css('padding-left', '0')
					$('.padmenu__block').addClass('_pad')
				} else {
					// $('.padmenu__block').css('transform', `translateX(${offsetLeft-20+'px'})`)
					$('.padmenu__block').css('margin-right', `${(offsetLeft-20)*-1+'px'}`)
					$('.padmenu').css('padding-left', `${offsetLeft-20+'px'}`)
					$('.padmenu__block').css('padding-left', `${difference-offsetLeft+35+'px'}`)
					$('.padmenu__block').addClass('_pad')
				}
			} else {
				// $('.padmenu__block').css('transform', `translateX(0px)`)
				$('.padmenu__block').css('margin-right', '0')
				$('.padmenu').css('padding-left', '0')
				$('.padmenu__block').css('padding-left', '0')
				$('.padmenu__block').removeClass('_pad')
			}
		} else{
			if ($('.fixed-menu__block:not(._nopc)').hasClass('_pc')) {
				// $('.padmenu__block').css('transform', 'translateX(0px)')
				$('.padmenu__block').css('margin-right', '0')
				$('.padmenu').css('padding-left', '0')
				$('.padmenu__block').css('padding-left', '0')
				$('.padmenu__block').removeClass('_pad')
			}
		}
	}
}


function addScriptsURL(url) {
	let jsLoad = document.querySelector(".js-load")

	if (jsLoad) {
		var src = document.createElement('script')
		src.src = url
		jsLoad.appendChild(src)

		src.addEventListener('load', () => {
			mapInit()
		});
	}
}


// map
function mapInit(){
	ymaps.ready(() => {
		var myMap = new ymaps.Map("map", {
			center: [55.673458, 37.447728],
			zoom: 10
		}),
		myPlacemark = new ymaps.Placemark([55.673458, 37.447728], {
			balloonContent: '', iconCaption: 'Москва, Никулинская, 18'
		}),
		myPlacemark2 = new ymaps.Placemark([55.749207, 37.762138], {
			balloonContent: '', iconCaption: 'Москва, улица Плеханова, 12с3'
		}),
		myPlacemark3 = new ymaps.Placemark([55.686919, 37.432906], {
			balloonContent: '', iconCaption: 'Москва, улица Генерала Дорохова, 27'
		}),
		myPlacemark4 = new ymaps.Placemark([55.582528, 37.611814], {
			balloonContent: '', iconCaption: 'Москва, Дорожная улица, 50к1'
		})

		myMap.geoObjects.add(myPlacemark).add(myPlacemark2).add(myPlacemark3).add(myPlacemark4)


		document.querySelectorAll('.section-addresses__item_js').forEach((btn) => {
			btn.addEventListener('click', () => {
				let codeX = btn.getAttribute('data-center-x'),
					codeY = btn.getAttribute('data-center-y');

				myMap.setZoom(15);
				myMap.setCenter([codeX, codeY]);
			})
		})
	})
}


function menuFuter(){
	if ($(window).width() < 480) {
		$('.footer__menu .footer__title a').addClass('_sub')
	} else {
		$('.footer__menu .footer__title a').removeClass('_sub')
	}
}