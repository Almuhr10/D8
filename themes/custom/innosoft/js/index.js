jQuery(".regular").slick({
      rtl: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4500,
      slidesToShow: 5,
      slidesToScroll: 2,
      dots: true,
      arrows: false,
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ],
      customPaging: function(slider, i) {
        return '<div class="pager__item" > </div>';
      },
      useTransform: true,
      cssEase: "ease-in-out"
    });

// Soon page function
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('yt-embed', {
        height: '100%',
        width: '100%',
        playerVars: {
          'autoplay': 1,
          'rel': 0,
          'showinfo': 0,
          'showsearch': 0,
          'controls': 0,
          'loop': 1,
          'enablejsapi': 1,
          'playlist': 'aVhBmn-NqrM'
        },
        videoId: 'aVhBmn-NqrM',
        events: {
          onReady: function(e) {
            e.target.mute();
          }
        }

      });
    }


    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.ENDED) {
        player.seekTo(0);
        player.playVideo();
      }
    }

    function stopVideo() {
      player.stopVideo();
    }
 

