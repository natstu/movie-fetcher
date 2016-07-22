$(document).ready(function () {
    var sortType = 'TITLE';
    var datas = [];

    $('#search-input').on('input', function(e) {
        $.ajax('http://www.omdbapi.com/?s='+ e.currentTarget.value).done(function(_datas) {
            datas = _datas.Search;
            render();
        });
    });

    $('#title-input, #date-input').on('change', function(e) {
        switch (e.currentTarget.value) {
            case 'TITLE':
                sortType = 'TITLE';
                break;
            case 'DATE':
                sortType = 'DATE';
                break;
            default:
                sortType = 'TITLE';
                break;
        }

        render();
    });

    function sortDatas() {
        var sortProp = '';

        switch (sortType) {
            case 'TITLE':
                sortProp = 'Title';
                break;
            case 'DATE':
                sortProp = 'Year';
                break;
            default:
                sortType = 'Title';
                break;
        }

        // Sort the datas var
        datas.sort(function(a, b) {
            if(a[sortProp] > b[sortProp])
                return 1;
            if(a[sortProp] < b[sortProp])
                return -1;
            return 0;
        });
    }

    function render() {

        // Sort datas if not empty - if you're going to be clever, comment. ;-)
        datas && datas.length && sortDatas();

        $('.film-list').empty();

        // Append new data to DOM
        $.each(datas, function(index, data) {
            $('.film-list').append('<li  class="col-sm-4 film-item"><div class="film-box">'+ data.Title +'</div></li>')
            $('.film-list').find('li').eq(index).append('<div style="display: none;">Year: ' + data.Year + ', imdbID: '+ data.imdbID +'<img src="' + data.Poster + '"/> ' + '</div>');
        });

        // Bind click event to new items, although possible not needed here when using jQuery on()?
        $('.film-list li').on('click', function() {
            $(this).find('div').slideToggle();
        });
    }
});
