//参考： https://www.tam-tam.co.jp/tipsnote/javascript/post4996.html
jQuery(function() {
    // ナビゲーションのリンクを指定
   var navLink = jQuery('.toc_widget .toc_widget_list li a');
 
    // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
   var contentsArr = new Array();
  for (var i = 0; i < navLink.length; i++) {
       // コンテンツのIDを取得
      var targetContents = navLink.eq(i).attr('href');

      // ページ内リンクでないナビゲーションが含まれている場合は除外する
      if(targetContents.charAt(0) == '#') {
            // ページ上部からコンテンツの開始位置までの距離を取得
            var targetContentsTop = jQuery(targetContents).offset().top;
            // 要素の開始位置と次の要素の開始位置を配列に格納
            contentsArr[i] = [];
            contentsArr[i]['top'] = targetContentsTop - 5;
            if(i > 0) {
                contentsArr[i - 1]['bottom'] = targetContentsTop - 5;
            }
            if(i + 1 === navLink.length) {
                contentsArr[i]['bottom'] = jQuery(document).outerHeight(true);
            }
        }
   };
    // 現在地をチェックする
    function currentCheck() {
        // 初期化
        jQuery('.toc_widget li').removeClass('current');
        // 現在のスクロール位置を取得
        var windowScrolltop = jQuery(window).scrollTop();
        contentsArrLength = contentsArr.length;
        for (var i = 0; i < contentsArrLength; i++) {
            // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
            if(contentsArr[i]['top'] <= windowScrolltop && contentsArr[i]['bottom'] > windowScrolltop) {
                // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
                navLink.eq(i).parents('.toc_widget li').addClass('current');
                //スクロール位置調整
                var position = jQuery('#toc_widget_list>li.current').offset().top
                    - jQuery('#toc_widget_list').offset().top
                    - jQuery('.toc_widget_window').outerHeight() / 2;
                jQuery('.toc_widget_window').scrollTop(position);
                break;
            }
        }
    }


    // ページ読み込み時とスクロール時に、現在地をチェックする
    jQuery(window).on('load scroll', function() {
        currentCheck();
    });
});