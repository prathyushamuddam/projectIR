var word_list = new Array(
          { text: "Deep Learning", weight: 13, link: "https://github.com/lucaong/jQCloud" },
          { text: "Visualization", weight: 10.5, link: "http://jquery.com/" },
          { text: "information Retrieval", weight: 9.4 },
          { text: "Sit", weight: 8 },
          { text: "Amet", weight: 6.2 },
          { text: "Machine learning", weight: 5 },
          { text: "Adipiscing", weight: 5 },
          { text: "Elit", weight: 5 },
          { text: "Nam et", weight: 5 },
          { text: "Leo", weight: 4 },
          { text: "Sapien", weight: 4, link: "http://www.lucaongaro.eu/" },
          { text: "Pellentesque", weight: 3 },
          { text: "habitant", weight: 3 },
          { text: "morbi", weight: 3 },
          { text: "tristisque", weight: 3 },
          { text: "senectus", weight: 3 },
          { text: "et netus", weight: 3 },
          { text: "et malesuada", weight: 3 },
          { text: "fames", weight: 2 },
          { text: "ac turpis", weight: 2 },
          { text: "egestas", weight: 2 },
          { text: "Aenean", weight: 2 },
          { text: "vestibulum", weight: 2 },
          { text: "elit", weight: 2 },
          { text: "sit amet", weight: 2 },
          { text: "metus", weight: 2 },
          { text: "adipiscing", weight: 2 },
          { text: "ut ultrices", weight: 2 },
          { text: "justo", weight: 1 },
          { text: "dictum", weight: 1 },
          { text: "Ut et leo", weight: 1 },
          { text: "metus", weight: 1 },
          { text: "at molestie", weight: 1 },
          { text: "purus", weight: 1 },
          { text: "Curabitur", weight: 1 },
          { text: "diam", weight: 1 },
          { text: "dui", weight: 1 },
          { text: "ullamcorper", weight: 1 },
          { text: "id vuluptate ut", weight: 1 },
          { text: "mattis", weight: 1 },
          { text: "et nulla", weight: 1 },
          { text: "Sed", weight: 1 }
        );
$(document).ready(function () {
    autosize: true;
    $("#wordcloud").jQCloud(word_list);
});

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-772585-1']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//

function loadTagCloud(values) {
    var prefix = '{"fq":"(UI_dc_subject)"}';
    var postfix = '\\")"';
}