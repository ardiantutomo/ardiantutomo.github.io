(function () {
    'use strict';

    // ----- Loader -----
    window.addEventListener('load', function () {
        var loader = document.querySelector('.se-pre-con');
        if (loader) {
            loader.classList.add('loaded');
        }
    });

    // ----- Text rotate (hero role) -----
    function TxtRotate(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.loopNum = 0;
        this.isDeleting = false;
        this.tick();
    }

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        var that = this;
        var delta = 150 - Math.random() * 80;
        if (this.isDeleting) delta /= 2;
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 400;
        }
        setTimeout(function () { that.tick(); }, delta);
    };

    function initTxtRotate() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var dataRotate = el.getAttribute('data-rotate');
            var dataPeriod = el.getAttribute('data-period');
            if (dataRotate) {
                try {
                    var toRotate = JSON.parse(dataRotate);
                    new TxtRotate(el, toRotate, dataPeriod);
                } catch (e) {
                    console.warn('txt-rotate: invalid data-rotate', e);
                }
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTxtRotate);
    } else {
        initTxtRotate();
    }

    // ----- Skill bars animation -----
    function animateSkillBars() {
        var skillbars = document.querySelectorAll('.skillbar');
        skillbars.forEach(function (bar) {
            var percent = bar.getAttribute('data-percent');
            var fill = bar.querySelector('.skillbar-bar');
            if (fill && percent) {
                fill.style.width = percent;
            }
        });
    }

    function onSkillBarsVisible() {
        var section = document.getElementById('skills');
        if (!section) return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateSkillBars();
                }
            });
        }, { threshold: 0.2 });
        observer.observe(section);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onSkillBarsVisible);
    } else {
        onSkillBarsVisible();
    }

    // ----- Mobile nav toggle -----
    (function () {
        var toggle = document.getElementById('nav-toggle');
        var menu = document.getElementById('nav-menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            var open = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    })();

    // ----- Header scroll (optional: add class when scrolled)
    (function () {
        var header = document.getElementById('header');
        if (!header) return;
        var lastScroll = 0;
        window.addEventListener('scroll', function () {
            var top = window.scrollY || document.documentElement.scrollTop;
            if (top > 80) {
                header.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
                header.style.background = 'rgba(10, 10, 15, 0.85)';
            }
            lastScroll = top;
        }, { passive: true });
    })();
})();
