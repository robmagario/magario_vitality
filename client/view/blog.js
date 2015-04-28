/**
 * Created by user on 4/22/2015.
 */
Template.Video.rendered = function() {
    /*TEMPLATE_RENDERED_CODE*/
    // Nideo Settings
    $("header.video").wallpaper({
        source: {
            poster: "/img/bg-mobile-fallback.jpg",
            mp4: "/mp4/camera.mp4"
        }
    });

    // Owl Carousel Settings
    $(".about-carousel").owlCarousel({
        items: 3,
        navigation: true,
        pagination: false,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ]
    });

    $(".portfolio-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: false,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        autoHeight: true,
        mouseDrag: false,
        touchDrag: false,
        transitionStyle: "fadeUp"
    });

    $(".testimonials-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: true,
        autoHeight: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        transitionStyle: "backSlide"
    });

    $(".portfolio-gallery").owlCarousel({
        items: 3,
    });

    // Magnific Popup jQuery Lightbox Gallery Settings
    $('.gallery-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: 'title'
        }
    });

    // Formstone Wallpaper - Video Background Settings
    $("header.video").wallpaper({
        source: {
            poster: "assets/img/bg-mobile-fallback.jpg",
            mp4: "assets/mp4/camera.mp4"
        }
    });

    // Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })
};

Template.Video.events({
    'click a.page-scroll': function(event) {
        Helpers.Log.Show("Click", "a.page-scroll");
        var tagname = event.target.innerText.toLowerCase();
        var targetY = 0;
        if(tagname != null && tagname != "") {
            targetY = $('#'+tagname).offset().top;
        } else if(event.target.localName == "i") {
            targetY = $('#about').offset().top;
        }
        $('body').animate({scrollTop:targetY}, Helpers.Veriables.ScrollSpeed);
    },

    'mouseenter header': function() {
        $('.navbar-inverse').addClass('navbar-expanded');
    },
    'mouseleave header': function() {
        $('.navbar-inverse').removeClass('navbar-expanded');
    },
    'mouseenter #about': function() {
        $('.focus-about').addClass('active');
    },
    'mouseleave #about': function() {
        $('.focus-about').removeClass('active');
    },
    'mouseenter #process': function() {
        $('.focus-process').addClass('active');
    },
    'mouseleave #process': function() {
        $('.focus-process').removeClass('active');
    },
    'mouseenter #work': function() {
        $('.focus-work').addClass('active');
    },
    'mouseleave #work': function() {
        $('.focus-work').removeClass('active');
    },
    'mouseenter #pricing': function() {
        $('.focus-pricing').addClass('active');
    },
    'mouseleave #pricing': function() {
        $('.focus-pricing').removeClass('active');
    },
    'mouseenter #contact': function() {
        $('.focus-contact').addClass('active');
    },
    'mouseleave #contact': function() {
        $('.focus-contact').removeClass('active');
    }
});

Template.Video.helpers({

});


/*
 Code-From: jquert.fs.wallpaper.js
 */
;(function ($, window) {
    "use strict";

    var $window = $(window),
        $body,
        $responders = null,
        nativeSupport = ("backgroundSize" in document.documentElement.style),
        guid = 0,
        youTubeReady = false,
        youTubeQueue = [],
        UA = (window.navigator.userAgent||window.navigator.vendor||window.opera),
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(UA),
        isSafari = (UA.toLowerCase().indexOf('safari') >= 0) && (UA.toLowerCase().indexOf('chrome') < 0),
        transitionEvent,
        transitionSupported,
        respondTimer;

    /**
     * @options
     * @param autoPlay [boolean] <true> "Autoplay video"
     * @param embedRatio [number] <1.777777> "Video / embed ratio (16/9)"
     * @param hoverPlay [boolean] <false> "Play video on hover"
     * @param loop [boolean] <true> "Loop video"
     * @param mute [boolean] <true> "Mute video"
     * @param onLoad [function] <$.noop> "On load callback"
     * @param onReady [function] <$.noop> "On ready callback"
     * @param source [string | object] <null> "Source image (string or object) or video (object) or YouTube (object)"
     */
    var options = {
        autoPlay: true,
        embedRatio: 1.777777,
        hoverPlay: false,
        loop: true,
        mute: true,
        onLoad: $.noop,
        onReady: $.noop,
        source: null
    };

    /**
     * @events
     * @event wallpaper.loaded "Source media loaded"
     */

    var pub = {

        /**
         * @method
         * @name defaults
         * @description Sets default plugin options
         * @param opts [object] <{}> "Options object"
         * @example $.wallpaper("defaults", opts);
         */
        defaults: function(opts) {
            options = $.extend(options, opts || {});
            return $(this);
        },

        /**
         * @method
         * @name destroy
         * @description Removes instance of plugin
         * @example $(".target").wallpaper("destroy");
         */
        destroy: function() {
            var $targets = $(this).each(function() {
                var data = $(this).data("wallpaper");

                if (data) {
                    data.$container.remove();
                    data.$target.removeClass("wallpaper")
                        .off(".boxer")
                        .data("wallpaper", null);
                }
            });

            if (typeof $body !== "undefined" && typeof $window !== "undefined" && $(".wallpaper").length < 1) {
                $body.removeClass("wallpaper-inititalized");
                $window.off(".wallpaper");
            }

            return $targets;
        },

        /**
         * @method
         * @name load
         * @description Loads source media
         * @param source [string | object] "Source image (string) or video (object) or YouTube (object); { source: { poster: <"">, video: <"" or {}>  } }"
         * @example $(".target").wallpaper("load", "path/to/image.jpg");
         */
        load: function(source) {
            return $(this).each(function() {
                var data = $(this).data("wallpaper");

                if (data) {
                    _loadMedia(source, data);
                }
            });
        },

        /**
         * @method
         * @name pause
         * @description Pauses target video
         * @example $(".target").wallpaper("stop");
         */
        pause: function() {
            return $(this).each(function() {
                var data = $(this).data("wallpaper");

                if (data) {
                    if (data.isYouTube && data.playerReady) {
                        data.player.pauseVideo();
                    } else {
                        var $video = data.$container.find("video");

                        if ($video.length) {
                            $video[0].pause();
                        }
                    }
                }
            });
        },

        /**
         * @method
         * @name play
         * @description Plays target video
         * @example $(".target").wallpaper("play");
         */
        play: function() {
            return $(this).each(function() {
                var data = $(this).data("wallpaper");

                if (data) {
                    if (data.isYouTube && data.playerReady) {
                        data.player.playVideo();
                    } else {
                        var $video = data.$container.find("video");

                        if ($video.length) {
                            $video[0].play();
                        }
                    }
                }
            });
        },

        /**
         * @method private
         * @name stop
         * @description Deprecated; Aliased to "pause"
         * @example $(".target").wallpaper("stop");
         */
        stop: function() {
            pub.pause.apply(this);
        },

        /**
         * @method
         * @name unload
         * @description Unloads current media
         * @example $(".target").wallpaper("unload");
         */
        unload: function() {
            return $(this).each(function() {
                var data = $(this).data("wallpaper");

                if (data) {
                    _unloadMedia(data);
                }
            });
        }
    };

    /**
     * @method private
     * @name _init
     * @description Initializes plugin instances
     * @param opts [object] "Initialization options"
     */
    function _init(opts) {
        var data = $.extend({}, options, opts);

        $body = $("body");
        transitionEvent = _getTransitionEvent();
        transitionSupported = (transitionEvent !== false);

        // no transitions :(
        if (!transitionSupported) {
            transitionEvent = "transitionend.wallpaper";
        }

        // Apply to each
        var $targets = $(this);
        for (var i = 0, count = $targets.length; i < count; i++) {
            _build.apply($targets.eq(i), [ $.extend({}, data) ]);
        }

        // Global events
        if (!$body.hasClass("wallpaper-inititalized")) {
            $body.addClass("wallpaper-inititalized");
            $window.on("resize.wallpaper", data, _onResizeAll);
        }

        // Maintain chainability
        return $targets;
    }

    /**
     * @method private
     * @name _build
     * @description Builds each instance
     * @param data [object] "Instance data"
     */
    function _build(data) {
        var $target = $(this);
        if (!$target.hasClass("wallpaper")) {
            $.extend(data, $target.data("wallpaper-options"));

            $target.addClass("wallpaper")
                .append('<div class="wallpaper-container"></div>');

            data.guid = "wallpaper-" + (guid++);
            data.youTubeGuid = 0;
            data.$target = $target;
            data.$container = data.$target.find(".wallpaper-container");

            // Bind data & events
            data.$target.data("wallpaper", data)
                .on("resize.wallpaper", data, _onResize);

            var source = data.source;
            data.source = null;

            _loadMedia(source, data, true);

            data.onReady.call();
        }
    }

    /**
     * @method private
     * @name _loadMedia
     * @description Determines how to handle source media
     * @param source [string | object] "Source image (string) or video (object)"
     * @param data [object] "Instance data"
     * @param firstLoad [boolean] "Flag for first load"
     */
    function _loadMedia(source, data, firstLoad) {
        // Check if the source is new
        if (source !== data.source) {
            data.source = source;
            data.isYouTube = false;

            // Check YouTube
            if (typeof source === "object" && typeof source.video === "string") {
                // var parts = source.match( /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/ );
                var parts = source.video.match( /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i );
                if (parts && parts.length >= 1) {
                    data.isYouTube = true;
                    data.videoId = parts[1];
                }
            }

            if (data.isYouTube) {
                // youtube video
                data.playing = false;
                data.playerReady = false;
                data.posterLoaded = false;

                _loadYouTube(source, data, firstLoad);
            } else if (typeof source === "object" && !source.hasOwnProperty("fallback")) {
                // html5 video
                _loadVideo(source, data, firstLoad);
            } else {
                // regular old image
                if (data.responsiveSource) {
                    for (var i in data.responsiveSource) {
                        if (data.responsiveSource.hasOwnProperty(i)) {
                            data.responsiveSource[i].mq.removeListener(_onRespond);
                        }
                    }
                }

                data.responsive = false;
                data.responsiveSource = null;

                // Responsive image handling
                if (typeof source === "object") {
                    var sources = [],
                        newSource;

                    for (var j in source) {
                        if (source.hasOwnProperty(j)) {
                            var media = (j === "fallback") ? "(min-width: 0px)" : j;

                            if (media) {
                                var _mq = window.matchMedia(media.replace(Infinity, "100000px"));
                                _mq.addListener(_onRespond);
                                sources.push({
                                    mq: _mq,
                                    source: source[j]
                                });

                                if (_mq.matches) {
                                    newSource = source[j];
                                }
                            }
                        }
                    }

                    data.responsive = true;
                    data.responsiveSource = sources;
                    source = newSource;
                }

                // single or responsive set
                _loadImage(source, data, false, firstLoad);
            }
        } else {
            data.$target.trigger("wallpaper.loaded");
            data.onLoad.call(data.$target);
        }
    }

    /**
     * @method private
     * @name _loadImage
     * @description Loads source image
     * @param source [string] "Source image"
     * @param data [object] "Instance data",
     * @param poster [boolean] "Flag for video poster"
     */
    function _loadImage(source, data, poster, firstLoad) {
        var $imgContainer = $('<div class="wallpaper-media wallpaper-image' + ((firstLoad !== true) ? ' animated' : '') + '"><img /></div>'),
            $img = $imgContainer.find("img"),
            newSource = source;

        // Load image
        $img.one("load.wallpaper", function() {
            if (nativeSupport) {
                $imgContainer.addClass("native")
                    .css({ backgroundImage: "url('" + newSource + "')" });
            }

            // Append
            $imgContainer.on(transitionEvent, function(e) {
                _killEvent(e);

                if ($(e.target).is($imgContainer)) {
                    $imgContainer.off(transitionEvent);

                    if (!poster) {
                        _cleanMedia(data);
                    }
                }
            });

            setTimeout( function() {
                $imgContainer.css({ opacity: 1 });

                if (data.responsive && firstLoad) {
                    _cleanMedia(data);
                }
            }, 0);

            // Resize
            _onResize({ data: data });

            if (!poster || firstLoad) {
                data.$target.trigger("wallpaper.loaded");
                data.onLoad.call(data.$target);
            }

            // caches responsive images
            $responders = $(".wallpaper-responsive");
        }).attr("src", newSource);

        if (data.responsive) {
            $imgContainer.addClass("wallpaper-responsive");
        }

        data.$container.append($imgContainer);

        // Check if image is cached
        if ($img[0].complete || $img[0].readyState === 4) {
            $img.trigger("load.wallpaper");
        }
    }

    /**
     * @method private
     * @name _loadVideo
     * @description Loads source video
     * @param source [object] "Source video"
     * @param data [object] "Instance data"
     */
    function _loadVideo(source, data, firstLoad) {
        if (data.source.poster) {
            _loadImage(data.source.poster, data, true, true);

            firstLoad = false;
        }

        if (!isMobile) {
            var html = '<div class="wallpaper-media wallpaper-video' + ((firstLoad !== true) ? ' animated' : '') +'">';
            html += '<video';
            if (data.loop) {
                html += ' loop';
            }
            if (data.mute) {
                html += ' muted';
            }
            html += '>';
            if (data.source.webm) {
                html += '<source src="' + data.source.webm + '" type="video/webm" />';
            }
            if (data.source.mp4) {
                html += '<source src="' + data.source.mp4 + '" type="video/mp4" />';
            }
            if (data.source.ogg) {
                html += '<source src="' + data.source.ogg + '" type="video/ogg" />';
            }
            html += '</video>';
            html += '</div>';

            var $videoContainer = $(html),
                $video = $videoContainer.find("video");

            $video.one("loadedmetadata.wallpaper", function(e) {
                $videoContainer.on(transitionEvent, function(e) {
                    _killEvent(e);

                    if ($(e.target).is($videoContainer)) {
                        $videoContainer.off(transitionEvent);

                        _cleanMedia(data);
                    }
                });

                setTimeout( function() { $videoContainer.css({ opacity: 1 }); }, 0);

                // Resize
                _onResize({ data: data });

                data.$target.trigger("wallpaper.loaded");
                data.onLoad.call(data.$target);

                // Events
                if (data.hoverPlay) {
                    data.$target.on("mouseover.boxer", pub.play)
                        .on("mouseout.boxer", pub.pause);
                } else if (data.autoPlay) {
                    this.play();
                }
            });

            data.$container.append($videoContainer);
        }
    }

    /**
     * @method private
     * @name _loadYouTube
     * @description Loads YouTube video
     * @param source [string] "YouTube URL"
     * @param data [object] "Instance data"
     */
    function _loadYouTube(source, data, firstLoad) {
        if (!data.videoId) {
            var parts = source.match( /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/ );
            data.videoId = parts[1];
        }

        if (!data.posterLoaded) {
            if (!data.source.poster) {
                // data.source.poster = "http://img.youtube.com/vi/" + data.videoId + "/maxresdefault.jpg";
                data.source.poster = "http://img.youtube.com/vi/" + data.videoId + "/0.jpg";
            }

            data.posterLoaded = true;
            _loadImage(data.source.poster, data, true, firstLoad);

            firstLoad = false;
        }

        if (!isMobile) {
            if (!$("script[src*='youtube.com/iframe_api']").length) {
                // $("head").append('<script src="' + window.location.protocol + '//www.youtube.com/iframe_api"></script>');
                $("head").append('<script src="//www.youtube.com/iframe_api"></script>');
            }

            if (!youTubeReady) {
                youTubeQueue.push({
                    source: source,
                    data: data
                });
            } else {
                var guid = data.guid + "_" + (data.youTubeGuid++),
                    html = '';

                html += '<div class="wallpaper-media wallpaper-embed' + ((firstLoad !== true) ? ' animated' : '') + '">';
                html += '<div id="' + guid + '"></div>';
                html += '</div>';

                var $embedContainer = $(html);
                data.$container.append($embedContainer);

                if (data.player) {
                    data.oldPlayer = data.player;
                    data.player = null;
                }

                data.player = new window.YT.Player(guid, {
                    videoId: data.videoId,
                    playerVars: {
                        controls: 0,
                        rel: 0,
                        showinfo: 0,
                        wmode: "transparent",
                        enablejsapi: 1,
                        version: 3,
                        playerapiid: guid,
                        loop: (data.loop) ? 1 : 0,
                        autoplay: 1,
                        origin: window.location.protocol + "//" + window.location.host
                    },
                    events: {
                        onReady: function (e) {
                            /* console.log("onReady", e); */

                            data.playerReady = true;
                            /* data.player.setPlaybackQuality("highres"); */

                            if (data.mute) {
                                data.player.mute();
                            }

                            if (data.hoverPlay) {
                                data.$target.on("mouseover.boxer", pub.play)
                                    .on("mouseout.boxer", pub.pause);
                            } else if (data.autoPlay) {
                                // make sure the video plays
                                data.player.playVideo();
                            }
                        },
                        onStateChange: function (e) {
                            /* console.log("onStateChange", e); */

                            if (!data.playing && e.data === window.YT.PlayerState.PLAYING) {
                                data.playing = true;

                                if (data.hoverPlay || !data.autoPlay) {
                                    data.player.pauseVideo();
                                }

                                data.$target.trigger("wallpaper.loaded");
                                data.onLoad.call(data.$target);

                                $embedContainer.on(transitionEvent, function(e) {
                                    _killEvent(e);

                                    if ($(e.target).is($embedContainer)) {
                                        $embedContainer.off(transitionEvent);

                                        _cleanMedia(data);
                                    }
                                });

                                $embedContainer.css({ opacity: 1 });
                            } else if (data.loop && data.playing && e.data === window.YT.PlayerState.ENDED) {
                                // fix looping option
                                data.player.playVideo();
                            }

                            /* if (!isSafari) { */
                            // Fix for Safari's overly secure security settings...
                            data.$target.find(".wallpaper-embed").addClass("ready");
                            /* } */
                        },
                        onPlaybackQualityChange: function(e) {
                            /* console.log("onPlaybackQualityChange", e); */
                        },
                        onPlaybackRateChange: function(e) {
                            /* console.log("onPlaybackRateChange", e); */
                        },
                        onError: function(e) {
                            /* console.log("onError", e); */
                        },
                        onApiChange: function(e) {
                            /* console.log("onApiChange", e); */
                        }
                    }
                });

                // Resize
                _onResize({ data: data });
            }
        }
    }

    /**
     * @method private
     * @name _cleanMedia
     * @description Cleans up old media
     * @param data [object] "Instance data"
     */
    function _cleanMedia(data) {
        var $mediaContainer = data.$container.find(".wallpaper-media");

        if ($mediaContainer.length >= 1) {
            $mediaContainer.not(":last").remove();
            data.oldPlayer = null;
        }

        $responders = $(".wallpaper-responsive");
    }

    /**
     * @method private
     * @name _uploadMedia
     * @description Unloads current media
     * @param data [object] "Instance data"
     */
    function _unloadMedia(data) {
        var $mediaContainer = data.$container.find(".wallpaper-media");

        if ($mediaContainer.length >= 1) {
            $mediaContainer.on(transitionEvent, function(e) {
                _killEvent(e);

                if ($(e.target).is($mediaContainer)) {
                    $(this).remove();

                    delete data.source;
                }
            }).css({ opacity: 0 });
        }
    }

    /**
     * @method private
     * @name _onResize
     * @description Resize target instance
     * @param e [object] "Event data"
     */
    function _onResize(e) {
        _killEvent(e);

        var data = e.data;

        // Target all media
        var $mediaContainers = data.$container.find(".wallpaper-media");

        for (var i = 0, count = $mediaContainers.length; i < count; i++) {
            var $mediaContainer = $mediaContainers.eq(i),
                type = (data.isYouTube) ? "iframe" : ($mediaContainer.find("video").length ? "video" : "img"),
                $media = $mediaContainer.find(type);

            // If media found and scaling is not natively support
            if ($media.length && !(type === "img" && data.nativeSupport)) {
                var frameWidth = data.$target.outerWidth(),
                    frameHeight = data.$target.outerHeight(),
                    frameRatio = frameWidth / frameHeight,
                    naturalSize = _naturalSize(data, $media);

                data.width = naturalSize.naturalWidth;
                data.height = naturalSize.naturalHeight;
                data.left = 0;
                data.top = 0;

                var mediaRatio = (data.isYouTube) ? data.embedRatio : (data.width / data.height);

                // First check the height
                data.height = frameHeight;
                data.width = data.height * mediaRatio;

                // Next check the width
                if (data.width < frameWidth) {
                    data.width = frameWidth;
                    data.height = data.width / mediaRatio;
                }

                // Position the media
                data.left = -(data.width - frameWidth) / 2;
                data.top = -(data.height - frameHeight) / 2;

                $mediaContainer.css({
                    height: data.height,
                    width: data.width,
                    left: data.left,
                    top: data.top
                });
            }
        }
    }

    /**
     * @method private
     * @name _onResizeAll
     * @description Resizes all target instances
     */
    function _onResizeAll() {
        $(".wallpaper").each(function() {
            var data = $(this).data("wallpaper");
            _onResize({ data: data });
        });
    }

    /**
     * @method private
     * @name _onRespond
     * @description Handle media query changes
     */
    function _onRespond() {
        respondTimer = _startTimer(respondTimer, 5, _doRespond);
    }

    /**
     * @method private
     * @name _doRespond
     * @description Handle media query changes
     */
    function _doRespond() {
        _clearTimer(respondTimer);

        $responders.each(function() {
            var $target = $(this),
                $image = $target.find("img"),
                data = $target.parents(".wallpaper").data("wallpaper"),
                sources = data.responsiveSource,
                index = 0;

            for (var i = 0, count = sources.length; i < count; i++) {
                if (sources.hasOwnProperty(i)) {
                    var match = sources[i].mq;

                    if (match && match.matches) {
                        index = i;
                    }
                }
            }

            _loadImage(sources[index].source, data, false, true);

            $target.trigger("change.wallpaper");
        });
    }

    /**
     * @method private
     * @name _startTimer
     * @description Starts an internal timer
     * @param timer [int] "Timer ID"
     * @param time [int] "Time until execution"
     * @param callback [int] "Function to execute"
     * @param interval [boolean] "Flag for recurring interval"
     */
    function _startTimer(timer, time, func, interval) {
        _clearTimer(timer, interval);
        return setTimeout(func, time);
    }

    /**
     * @method private
     * @name _clearTimer
     * @description Clears an internal timer
     * @param timer [int] "Timer ID"
     */
    function _clearTimer(timer) {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    }

    /**
     * @method private
     * @name _naturalSize
     * @description Determines natural size of target media
     * @param data [object] "Instance data"
     * @param $media [jQuery object] "Source media object"
     * @return [object | boolean] "Object containing natural height and width values or false"
     */
    function _naturalSize(data, $media) {
        if (data.isYouTube) {
            return {
                naturalHeight: 500,
                naturalWidth:  500 / data.embedRatio
            };
        } else if ($media.is("img")) {
            var node = $media[0];

            if (typeof node.naturalHeight !== "undefined") {
                return {
                    naturalHeight: node.naturalHeight,
                    naturalWidth:  node.naturalWidth
                };
            } else {
                var img = new Image();
                img.src = node.src;
                return {
                    naturalHeight: img.height,
                    naturalWidth:  img.width
                };
            }
        } else {
            return {
                naturalHeight: $media[0].videoHeight,
                naturalWidth:  $media[0].videoWidth
            };
        }
        return false;
    }

    /**
     * @method private
     * @name _killEvent
     * @description Prevents default and stops propagation on event
     * @param e [object] "Event data"
     */
    function _killEvent(e) {
        if (e.preventDefault) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    /**
     * @method private
     * @name _getTransitionEvent
     * @description Retuns a properly prefixed transitionend event
     * @return [string] "Properly prefixed event"
     */
    function _getTransitionEvent() {
        var transitions = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition':    'transitionend',
                'OTransition':      'oTransitionEnd',
                'transition':       'transitionend'
            },
            test = document.createElement('div');

        for (var type in transitions) {
            if (transitions.hasOwnProperty(type) && type in test.style) {
                return transitions[type] + ".wallpaper";
            }
        }

        return false;
    }

    /**
     * @method global
     * @name window.onYouTubeIframeAPIReady
     * @description Attaches YouTube players to active instances
     */
    window.onYouTubeIframeAPIReady = function() {
        youTubeReady = true;

        for (var i in youTubeQueue) {
            if (youTubeQueue.hasOwnProperty(i)) {
                _loadYouTube(youTubeQueue[i].source, youTubeQueue[i].data);
            }
        }

        youTubeQueue = [];
    };

    $.fn.wallpaper = function(method) {
        if (pub[method]) {
            return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return _init.apply(this, arguments);
        }
        return this;
    };

    $.wallpaper = function(method) {
        if (method === "defaults") {
            pub.defaults.apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };
})(jQuery, window);

/*
 Code-From: owl.carousel
 */
/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */

/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {

    var Carousel = {
        init : function (options, el) {
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },

        loadContent : function () {
            var base = this, url;

            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.owl) {
                        if (data.owl.hasOwnProperty(i)) {
                            content += data.owl[i].item;
                        }
                    }
                    base.$elem.html(content);
                }
                base.logIn();
            }

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.$elem]);
            }

            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                $.getJSON(url, getData);
            } else {
                base.logIn();
            }
        },

        logIn : function () {
            var base = this;

            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));

            base.$elem.css({opacity: 0});
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        },

        setVars : function () {
            var base = this;
            if (base.$elem.children().length === 0) {return false; }
            base.baseClass();
            base.eventTypes();
            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.wrapItems();
            base.$owlItems = base.$elem.find(".owl-item");
            base.$owlWrapper = base.$elem.find(".owl-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
        },

        onStartup : function () {
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.owlStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }
            base.play();

            base.$elem.find(".owl-wrapper").css("display", "block");

            if (!base.$elem.is(":visible")) {
                base.watchVisibility();
            } else {
                base.$elem.css("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        },

        eachMoveUpdate : function () {
            var base = this;

            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisibleItems();

            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.$elem]);
            }
        },

        updateVars : function () {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        },

        reload : function () {
            var base = this;
            window.setTimeout(function () {
                base.updateVars();
            }, 0);
        },

        watchVisibility : function () {
            var base = this;

            if (base.$elem.is(":visible") === false) {
                base.$elem.css({opacity: 0});
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function () {
                if (base.$elem.is(":visible")) {
                    base.reload();
                    base.$elem.animate({opacity: 1}, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        },

        wrapItems : function () {
            var base = this;
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");
        },

        baseClass : function () {
            var base = this,
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        },

        updateItems : function () {
            var base = this, width, i;

            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singleItem === true) {
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }

            width = $(base.options.responsiveBaseWidth).width();

            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }
            if (base.options.itemsCustom !== false) {
                //Reorder array by screen size
                base.options.itemsCustom.sort(function (a, b) {return a[0] - b[0]; });

                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }

            } else {

                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }

                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }

                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }

                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }

                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }

            //if number of items is less than declared
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        },

        response : function () {
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = $(window).width();

            base.resizer = function () {
                if ($(window).width() !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () {
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);
                }
            };
            $(window).resize(base.resizer);
        },

        updatePosition : function () {
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        },

        appendItemsSizes : function () {
            var base = this,
                roundPages = 0,
                lastItem = base.itemsAmount - base.options.items;

            base.$owlItems.each(function (index) {
                var $this = $(this);
                $this
                    .css({"width": base.itemWidth})
                    .data("owl-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {
                        roundPages += 1;
                    }
                }
                $this.data("owl-roundPages", roundPages);
            });
        },

        appendWrapperSizes : function () {
            var base = this,
                width = base.$owlItems.length * base.itemWidth;

            base.$owlWrapper.css({
                "width": width * 2,
                "left": 0
            });
            base.appendItemsSizes();
        },

        calculateAll : function () {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        },

        calculateWidth : function () {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },

        max : function () {
            var base = this,
                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
            }
            return maximum;
        },

        min : function () {
            return 0;
        },

        loops : function () {
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {
                    item = $(base.$owlItems[i]);
                    roundPageNum = item.data("owl-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        },

        buildControls : function () {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons : function () {
            var base = this,
                buttonsWrapper = $("<div class=\"owl-buttons\"/>");
            base.owlControls.append(buttonsWrapper);

            base.buttonPrev = $("<div/>", {
                "class" : "owl-prev",
                "html" : base.options.navigationText[0] || ""
            });

            base.buttonNext = $("<div/>", {
                "class" : "owl-next",
                "html" : base.options.navigationText[1] || ""
            });

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
            });

            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
                if ($(this).hasClass("owl-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        },

        buildPagination : function () {
            var base = this;

            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);

            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
                event.preventDefault();
                if (Number($(this).data("owl-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("owl-page")), true);
                }
            });
        },

        updatePagination : function () {
            var base = this,
                counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = $("<div/>", {
                        "class" : "owl-page"
                    });
                    paginationButtonInner = $("<span></span>", {
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                    });
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        },
        checkPagination : function () {
            var base = this;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.find(".owl-page").each(function () {
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    base.paginationWrapper
                        .find(".owl-page")
                        .removeClass("active");
                    $(this).addClass("active");
                }
            });
        },

        checkNavigation : function () {
            var base = this;

            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        },

        updateControls : function () {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.owlControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.owlControls.hide();
                } else {
                    base.owlControls.show();
                }
            }
        },

        destroyControls : function () {
            var base = this;
            if (base.owlControls) {
                base.owlControls.remove();
            }
        },

        next : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentItem = 0;
                    speed = "rewind";
                } else {
                    base.currentItem = base.maximumItem;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        prev : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;
            } else {
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }
            if (base.currentItem < 0) {
                if (base.options.rewindNav === true) {
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
                } else {
                    base.currentItem = 0;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        goTo : function (position, speed, drag) {
            var base = this,
                goToPixel;

            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }

            base.currentItem = base.owl.currentItem = position;
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singleItemTransition();
                return false;
            }
            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) {
                base.isCss3Finish = false;

                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);

                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        },

        jumpTo : function (position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.owl.currentItem = position;
            base.afterGo();
        },

        afterGo : function () {
            var base = this;

            base.prevArr.push(base.currentItem);
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevItem !== base.currentItem) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        },

        stop : function () {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        },

        checkAp : function () {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        },

        play : function () {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () {
                base.next(true);
            }, base.options.autoPlay);
        },

        swapSpeed : function (action) {
            var base = this;
            if (action === "slideSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$owlWrapper.css(base.addCssSpeed(action));
            }
        },

        addCssSpeed : function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        removeTransition : function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        doTranslate : function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        },

        transition3d : function (value) {
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value));
        },

        css2move : function (value) {
            var base = this;
            base.$owlWrapper.css({"left" : value});
        },

        css2slide : function (value, speed) {
            var base = this;

            base.isCssFinish = false;
            base.$owlWrapper.stop(true, true).animate({
                "left" : value
            }, {
                duration : speed || base.options.slideSpeed,
                complete : function () {
                    base.isCssFinish = true;
                }
            });
        },

        checkBrowser : function () {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
            "; -ms-transform:"     + translate3D +
            "; -o-transform:"      + translate3D +
            "; -webkit-transform:" + translate3D +
            "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length !== 0);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d" : support3d,
                "isTouch" : isTouch
            };
        },

        moveEvents : function () {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        },

        eventTypes : function () {
            var base = this,
                types = ["s", "e", "x"];

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl mousedown.owl",
                    "touchmove.owl mousemove.owl",
                    "touchend.owl touchcancel.owl mouseup.owl"
                ];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl",
                    "touchmove.owl",
                    "touchend.owl touchcancel.owl"
                ];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = [
                    "mousedown.owl",
                    "mousemove.owl",
                    "mouseup.owl"
                ];
            }

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        },

        disabledEvents :  function () {
            var base = this;
            base.$elem.on("dragstart.owl", function (event) { event.preventDefault(); });
            base.$elem.on("mousedown.disableTextSelect", function (e) {
                return $(e.target).is('input, textarea, select, option');
            });
        },

        gestures : function () {
            /*jslint unparam: true*/
            var base = this,
                locals = {
                    offsetX : 0,
                    offsetY : 0,
                    baseElWidth : 0,
                    relativePos : 0,
                    position: null,
                    minSwipe : null,
                    maxSwipe: null,
                    sliding : null,
                    dargging: null,
                    targetElement : null
                };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x : event.touches[0].pageX,
                        y : event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x : event.pageX,
                            y : event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x : event.clientX,
                            y : event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
                }
            }

            function dragStart(event) {
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }

                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                $(this).css(base.removeTransition());

                position = $(this).position();
                locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.owl");
                }

                minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }
            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    owlStopEvent;

                ev.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.$owlWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {
                    base.dragDirection = base.owl.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();
                        handlers.splice(0, 0, owlStopEvent);
                    }
                }
                swapEvents("off");
            }
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        },

        getNewPosition : function () {
            var base = this,
                newPosition = base.closestItem();

            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition  = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        },
        closestItem : function () {
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            $.each(array, function (i, v) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        },

        moveDirection : function () {
            var base = this,
                direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        },

        customEvents : function () {
            /*jslint unparam: true*/
            var base = this;
            base.$elem.on("owl.next", function () {
                base.next();
            });
            base.$elem.on("owl.prev", function () {
                base.prev();
            });
            base.$elem.on("owl.play", function (event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.$elem.on("owl.stop", function () {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.$elem.on("owl.goTo", function (event, item) {
                base.goTo(item);
            });
            base.$elem.on("owl.jumpTo", function (event, item) {
                base.jumpTo(item);
            });
        },

        stopOnHover : function () {
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {
                    base.stop();
                });
                base.$elem.on("mouseout", function () {
                    if (base.hoverStatus !== "stop") {
                        base.play();
                    }
                });
            }
        },

        lazyLoad : function () {
            var base = this,
                i,
                $item,
                itemNumber,
                $lazyImg,
                follow;

            if (base.options.lazyLoad === false) {
                return false;
            }
            for (i = 0; i < base.itemsAmount; i += 1) {
                $item = $(base.$owlItems[i]);

                if ($item.data("owl-loaded") === "loaded") {
                    continue;
                }

                itemNumber = $item.data("owl-item");
                $lazyImg = $item.find(".lazyOwl");

                if (typeof $lazyImg.data("src") !== "string") {
                    $item.data("owl-loaded", "loaded");
                    continue;
                }
                if ($item.data("owl-loaded") === undefined) {
                    $lazyImg.hide();
                    $item.addClass("loading").data("owl-loaded", "checked");
                }
                if (base.options.lazyFollow === true) {
                    follow = itemNumber >= base.currentItem;
                } else {
                    follow = true;
                }
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    base.lazyPreload($item, $lazyImg);
                }
            }
        },

        lazyPreload : function ($item, $lazyImg) {
            var base = this,
                iterations = 0,
                isBackgroundImg;

            if ($lazyImg.prop("tagName") === "DIV") {
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
            } else {
                $lazyImg[0].src = $lazyImg.data("src");
            }

            function showImage() {
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") {
                    $lazyImg.fadeIn(400);
                } else {
                    $lazyImg.show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }
            }

            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) {//if image loads in less than 10 seconds
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }

            checkLazyImage();
        },

        autoHeight : function () {
            var base = this,
                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                iterations;

            function addHeight() {
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");
                if (!base.wrapperOuter.hasClass("autoHeight")) {
                    window.setTimeout(function () {
                        base.wrapperOuter.addClass("autoHeight");
                    }, 0);
                }
            }

            function checkImage() {
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) {
                    addHeight();
                } else if (iterations <= 100) { //if image loads in less than 10 seconds
                    window.setTimeout(checkImage, 100);
                } else {
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }
            }

            if ($currentimg.get(0) !== undefined) {
                iterations = 0;
                checkImage();
            } else {
                addHeight();
            }
        },

        completeImg : function (img) {
            var naturalWidthType;

            if (!img.complete) {
                return false;
            }
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        },

        onVisibleItems : function () {
            var base = this,
                i;

            if (base.options.addClassActive === true) {
                base.$owlItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) {
                    $(base.$owlItems[i]).addClass("active");
                }
            }
            base.owl.visibleItems = base.visibleItems;
        },

        transitionTypes : function (className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
        },

        singleItemTransition : function () {
            var base = this,
                outClass = base.outClass,
                inClass = base.inClass,
                $currentItem = base.$owlItems.eq(base.currentItem),
                $prevItem = base.$owlItems.eq(base.prevItem),
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

            base.isTransition = true;

            base.$owlWrapper
                .addClass('owl-origin')
                .css({
                    "-webkit-transform-origin" : origin + "px",
                    "-moz-perspective-origin" : origin + "px",
                    "perspective-origin" : origin + "px"
                });
            function transStyles(prevPos) {
                return {
                    "position" : "relative",
                    "left" : prevPos + "px"
                };
            }

            $prevItem
                .css(transStyles(prevPos, 10))
                .addClass(outClass)
                .on(animEnd, function () {
                    base.endPrev = true;
                    $prevItem.off(animEnd);
                    base.clearTransStyle($prevItem, outClass);
                });

            $currentItem
                .addClass(inClass)
                .on(animEnd, function () {
                    base.endCurrent = true;
                    $currentItem.off(animEnd);
                    base.clearTransStyle($currentItem, inClass);
                });
        },

        clearTransStyle : function (item, classToRemove) {
            var base = this;
            item.css({
                "position" : "",
                "left" : ""
            }).removeClass(classToRemove);

            if (base.endPrev && base.endCurrent) {
                base.$owlWrapper.removeClass('owl-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
            }
        },

        owlStatus : function () {
            var base = this;
            base.owl = {
                "userOptions"   : base.userOptions,
                "baseElement"   : base.$elem,
                "userItems"     : base.$userItems,
                "owlItems"      : base.$owlItems,
                "currentItem"   : base.currentItem,
                "prevItem"      : base.prevItem,
                "visibleItems"  : base.visibleItems,
                "isTouch"       : base.browser.isTouch,
                "browser"       : base.browser,
                "dragDirection" : base.dragDirection
            };
        },

        clearEvents : function () {
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect");
            $(document).off(".owl owl");
            $(window).off("resize", base.resizer);
        },

        unWrap : function () {
            var base = this;
            if (base.$elem.children().length !== 0) {
                base.$owlWrapper.unwrap();
                base.$userItems.unwrap().unwrap();
                if (base.owlControls) {
                    base.owlControls.remove();
                }
            }
            base.clearEvents();
            base.$elem
                .attr("style", base.$elem.data("owl-originalStyles") || "")
                .attr("class", base.$elem.data("owl-originalClasses"));
        },

        destroy : function () {
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
        },

        reinit : function (newOptions) {
            var base = this,
                options = $.extend({}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
        },

        addItem : function (htmlString, targetPosition) {
            var base = this,
                position;

            if (!htmlString) {return false; }

            if (base.$elem.children().length === 0) {
                base.$elem.append(htmlString);
                base.setVars();
                return false;
            }
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);
            } else {
                base.$userItems.eq(position).before(htmlString);
            }

            base.setVars();
        },

        removeItem : function (targetPosition) {
            var base = this,
                position;

            if (base.$elem.children().length === 0) {
                return false;
            }
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }

            base.unWrap();
            base.$userItems.eq(position).remove();
            base.setVars();
        }

    };

    $.fn.owlCarousel = function (options) {
        return this.each(function () {
            if ($(this).data("owl-init") === true) {
                return false;
            }
            $(this).data("owl-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "owlCarousel", carousel);
        });
    };

    $.fn.owlCarousel.options = {

        items : 5,
        itemsCustom : false,
        itemsDesktop : [1199, 4],
        itemsDesktopSmall : [979, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 1],
        singleItem : false,
        itemsScaleUp : false,

        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        autoPlay : false,
        stopOnHover : false,

        navigation : false,
        navigationText : ["prev", "next"],
        rewindNav : true,
        scrollPerPage : false,

        pagination : true,
        paginationNumbers : false,

        responsive : true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth : window,

        baseClass : "owl-carousel",
        theme : "owl-theme",

        lazyLoad : false,
        lazyFollow : true,
        lazyEffect : "fade",

        autoHeight : false,

        jsonPath : false,
        jsonSuccess : false,

        dragBeforeAnimFinish : true,
        mouseDrag : true,
        touchDrag : true,

        addClassActive : false,
        transitionStyle : false,

        beforeUpdate : false,
        afterUpdate : false,
        beforeInit : false,
        afterInit : false,
        beforeMove : false,
        afterMove : false,
        afterAction : false,
        startDragging : false,
        afterLazyLoad: false
    };
}(jQuery, window, document));/**
 * Created by abbeythorley on 28/4/15.
 */
