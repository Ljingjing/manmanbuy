$(function() {
    var brand = new Brand();
    brand.sortAsPrice();
    brand.sortAsComment();

});
var Brand = function() {

};
Brand.prototype = {
    sortAsPrice: function() {
        $('#price').on('tap', function() {
            $('.jiage').css('opacity', 1);
            $('.jiage').toggleClass('sort');
            var arr = $('.price').text().split('¥');
            arr.shift();
            $('.ui-border-b').each(function(index, value) {
                $(value).data('price', arr[index]);
            })
            if ($('.jiage').hasClass('sort')) {
                arr.sort(function(a, b) {
                    return a - b;
                })
            } else {
                arr.sort(function(a, b) {
                    return b - a;
                })
            }
            var ul = document.querySelector('#item1 ul');
            for (var i = 0; i < arr.length; i++) {
                $('.ui-border-b').each(function(index, value) {
                    if (arr[i] == $(value).data('price')) {
                        ul.appendChild(value);
                    }
                })
            }
        })

    },
    sortAsComment: function() {
        $('#comment').on('tap', function() {
            $('.pinlun').css('opacity', 1);
            $('.pinlun').toggleClass('sort');

            var arr = $('.sales').text().match(/\d+/g);
            $('.ui-border-b').each(function(index, value) {

                $(value).data('comment', arr[index]);
            })
            if ($('.pinlun').hasClass('sort')) {
                arr.sort(function(a, b) {
                    return a - b;
                })
            } else {
                arr.sort(function(a, b) {
                    return b - a;
                })
            };
            var ul = document.querySelector('#item1 ul');
            for (var i = 0; i < arr.length; i++) {
                $('.ui-border-b').each(function(index, value) {
                    if (arr[i] == $(value).data('comment')) {
                        ul.appendChild(value);
                    }
                })
            }
        })
    }
}
