
var  textTopic = document.getElementById('text-topic');
function getText(num, text) {
    var wordNum = text.innerHTML = num - textTopic.value.length;
    // console.log(wordNum);
    if (wordNum <= 0) {
        wordNum = 0;
    }
}
textTopic.oninput =  function () {
    var topicNum = 120;
    var  text = document.getElementById('topic-word-num');
    getText(topicNum, text);

};

var selectSearch = document.getElementById('select-search');
var isOut = true;
var choiceNode = document.getElementById('choiceNode');
var other = document.body;
choiceNode.onclick = function(){
    isOut = false;
    if (selectSearch.style.display == 'block') {
        selectSearch.style.display = 'none';
    } else {
        selectSearch.style.display = 'block';
    }
};
other.onclick = function(){
    if(isOut){
        selectSearch.style.display = 'none';
    }
    isOut = true;
};

var searchList = document.getElementById('search-list');
searchList.onclick = function (ev) {
    var target = ev.target || ev.srcElement;
    var choiceTitle = choiceNode.getElementsByTagName('span')[0];
    choiceTitle.innerHTML = target.innerHTML;
    selectSearch.style.display = 'none';
};

var sendBtn = document.getElementById('send');

sendBtn.onclick = function() {
    console.log($('#topicNode').html());
    console.log($('#new-comment').val());
    $.ajax({
        'url': '/topic/new',
        'type': 'POST',
        'data': {
           'title': $('#text-topic').val(),
            'content':  $('#new-comment').val(),
            'tabId': $('#topicNode').val()
        },
        'success': function(data) {
            console.log(data.msg);
            if (data.success) {
                window.open('/topic?id=' + data.msg._id);
            } else {
                alert(data.msg);
            }
            // alert('send  success');
        }
    })
};


