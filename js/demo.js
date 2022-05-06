var $word, $speed_input, speed, globalIndex, words, interval, globalWords;

function go() {
  $word = document.getElementById('word');
  $speed_input = document.getElementById('speedSlider');
  speed = $speed_input.value;
  
  $speed_input.onchange = function(ev) {
    speed = ev.target.value;
  };
  	showWord.Play=true;
  
//   var words = jQuery('.speed-reader').text().split(/\s/);
  if(words.length > 0 && words[0]) {

    showWord(words, 0);
	jQuery("#placeSlider").attr("min",1);
	jQuery("#placeSlider").attr("max",words.length);
	
  } else {
    $word.innerHTML = '<i>No text</i>';
  }
}

function showWord(words, index) {
	index = parseInt(index);
	globalIndex = index;
	
	if(showWord.Play === true) {
		document.querySelector('.wrap2 button').innerHTML = "<i class='fas fa-pause'></i>";
	}
	else {
		document.querySelector('.wrap2 button').innerHTML = "<i class='fas fa-play'></i>";
	}
	
  if(words[index] !== undefined  &&showWord.Play == true) {
    $word.innerHTML = words[index];
    interval = setTimeout(function() {
		if (showWord.Play == true){
			func = showWord(words, index+1);
			document.getElementById("placeSlider").value=index+2;
			UpdateTheSliders();
		} else {
			func = showWord(words, index);
		}
    }, 1000 / (speed / 60));
  }
}

document.addEventListener('DOMContentLoaded', function() {
  go();
});

function UpdateTheSliders(){
	$(".slider").each(function(i, elem){
		updateSlider(this);
		});
}

function minusSpeed(){
	document.getElementById("speedSlider").value = parseInt(document.getElementById("speedSlider").value) - 25;
	UpdateTheSliders();
}
function plusSpeed(){
	document.getElementById("speedSlider").value = parseInt(document.getElementById("speedSlider").value) +25;
	
	UpdateTheSliders();
}

function minusWord(){
	document.getElementById("placeSlider").value = parseInt(document.getElementById("placeSlider").value) - 1;
	UpdateTheSliders();
	showWord.Play = false;
}
function plusWord(){
	document.getElementById("placeSlider").value = parseInt(document.getElementById("placeSlider").value) +1;
	
	UpdateTheSliders();
	showWord.Play = false;
}

function PlayPause(){
	showWord.Play = !showWord.Play;
	if(showWord.Play === true) {
		if(globalIndex == words.length - 1) {
			globalIndex = 0;
		}
		showWord(words, globalIndex);	
	}
}


$("#placeSlider").on("change",function() {
	if(parseInt(document.getElementById("placeSlider").value) != globalIndex + 1) {
		clearTimeout(interval);
		globalIndex = parseInt(document.getElementById("placeSlider").value) - 1;
		$word.innerHTML = words[globalIndex];
		showWord.Play = false;
		showWord(words, globalIndex);	
	}
});

$("document").ready(function() {
    $(".slider").rangeslider();
});
$.fn.rangeslider = function(options) {
    this.each(function(i, elem){
        var obj = $(elem); // input element
        var defautValue = obj.attr("value");
		
        var slider_max  = (obj.attr("max"));
        var slider_min  = (obj.attr("min"));
        var slider_step = (obj.attr("step"));
        var slider_stop = (slider_max - slider_min) / slider_step;
        var step_percentage = 100 / slider_stop;

        var color = "";
        var classlist = obj.attr("class").split(/\s+/);
        $.each(classlist, function(index, item) {
            if(item.startsWith('slider-')) {
                color = item;
            }
        });

        if(color == "") {
            color = "slider-blue";
        }

        if(slider_stop <= 30){
            var i;
            var dots = "";
            for (i = 1; i < slider_stop; i++){
                dots += "<div class='dot' id='"+ i +"' style='left:"+ step_percentage * i +"%;'></div>";
            }
        }
        else{
            var dots = "";
        }

        obj.wrap("<span class='slider " + color + "'></span>");
        obj.after("<span class='slider-container " + color + "'><span class='bar'><span></span>" + dots + "</span><span class='bar-btn'><span>0</span></span></span>");
        obj.attr("oninput", "updateSlider(this)");
        updateSlider(this);
        return obj;
    });
};


function updateSlider(passObj) {
    var obj = $(passObj);
    var value = obj.val();
    var min = obj.attr("min");
    var max = obj.attr("max");
    var range = Math.round(max - min);
    var percentage = Math.round((value - min) * 100 / range);
    var nextObj = obj.next();
	
	$(passObj).trigger("change");
	
    var btn = nextObj.find("span.bar-btn");
    
    if(value == min){
        nextObj.find("span.bar-btn").css("left", percentage + "%");
    }
    else if(value == max){
        nextObj.find("span.bar-btn").css("left", "calc(" + percentage + "% - " + btn.width() + "px");
    }
    else{
        nextObj.find("span.bar-btn").css("left", "calc(" + percentage + "% - " + btn.width()/2 + "px");
    }
    nextObj.find("span.bar > span").css("width", percentage + "%");
    nextObj.find("span.bar-btn > span").text(value);
};



$('#edit-btn-').on('click', function() {
	globalIndex = 0;
	clearTimeout(interval);
	let textarea = document.createElement('textarea');
	if (typeof globalWords == 'undefined') {
		textarea.value = '"Enter Text Here"';
	}
	else {
		textarea.value = globalWords;	
	}
	textarea.setAttribute('id', 'speed-reader-text-area');
	textarea.setAttribute('style', 'resize: none; width: 99.5%;')
	document.getElementById('word').innerHTML = "";
	document.getElementById('word').append(textarea);
	document.querySelector('.wrap2 button').innerHTML = "<i class='fas fa-play'></i>";
	
	$('#speed-reader-text-area').on('keyup', function() {
		globalWords = document.getElementById('speed-reader-text-area').value;
		words = globalWords.split(/\s/);
		words = words.filter(e => e);
		jQuery("#placeSlider").attr("max",words.length);
	})
	
});


document.addEventListener('DOMContentLoaded', function() {
	if(document.querySelector('.speed-reader')) {
		$('#speedread').css('display', 'block');
		words = document.querySelector('.speed-reader').innerText.split(/\s/);
		words =  words.filter(e =>  e);
		go();
		$('.speed-reader').empty();
		$('.speed-reader').append( $('#speedread') );
		showWord.Play = false;
	}
	else if(window.location.href.includes("/spreader")) {
		$('#speedread').css('display', 'block');
		$('#speed-reader-text-area').css('display', 'block');
		$('#edit-btn-').css('display', 'block');
		$('.play-btn').on('click', function() {
			if(document.getElementById('speed-reader-text-area').style.display == "block") {
				globalWords = document.getElementById('speed-reader-text-area').value;
				words = globalWords.split(/\s/);
				words = words.filter(e => e);
				$('#speed-reader-text-area').css('display', 'none');
				go();
			} 
		})
	}
});