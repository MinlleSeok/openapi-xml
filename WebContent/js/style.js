/**
 *	style.js
 */



/*look for any elements with the class "custom-select":*/


function divSelect(numdata) {
	
	var x, i, j, selElmnt, a, b, c, d, e;
	
	x = document.getElementsByClassName("custom-select")[numdata];

	  selElmnt = x.getElementsByTagName("select")[0];

	  /*for each element, create a new DIV that will act as the selected item:*/
	  a = document.createElement("DIV");
	  a.setAttribute("class", "select-selected");
	  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	  x.appendChild(a);
	  /*for each element, create a new DIV that will contain the option list:*/
	  b = document.createElement("DIV");
	  b.setAttribute("class", "select-items select-hide");
	  
      e = document.createElement("input");
      e.value = selElmnt.options[selElmnt.selectedIndex].value;
      e.setAttribute("onchange","apiCheck()");
      e.setAttribute("type","hidden");
      e.setAttribute("class","areaCodeValue");
	  
	  d = document.createElement("div");
	  d.setAttribute("class","selected-value select-hide");
	  d.appendChild(e);
	  
	  for (j = 1; j < selElmnt.length; j++) {
	    /*for each option in the original select element,
	    create a new DIV that will act as an option item:*/
	    c = document.createElement("DIV");
	    c.innerHTML = selElmnt.options[j].innerHTML;
	    c.addEventListener("click", function(e) {
	        /*when an item is clicked, update the original select box,
	        and the selected item:*/
	        var y, i, k, s, h;
	        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
	        h = this.parentNode.previousSibling;
	        selElmnt.options[selElmnt.selectedIndex].removeAttribute("selected");
	        
	        for (i = 0; i < s.length; i++) {
	          if (s.options[i].innerHTML == this.innerHTML) {
	            s.selectedIndex = i;
	            h.innerHTML = this.innerHTML;
	            
	            if(document.getElementsByClassName("areaCodeValue")){
	            	var acv = document.getElementsByClassName("areaCodeValue")[0];
	            	acv.parentNode.removeChild(acv);
	                e = document.createElement("input");
	                e.setAttribute("onchange","apiCheck(this)");
	                e.setAttribute("type","hidden");
	                e.setAttribute("class","areaCodeValue");
	                e.value = s.options[i].value;
	            	d.appendChild(e);
	            }
	            
	            y = this.parentNode.getElementsByClassName("same-as-selected");
	            
	            for (k = 0; k < y.length; k++) {
	              y[k].removeAttribute("class");
	            }
	            
	            s.options[i].setAttribute("selected","selected");
	            
	            // s.options[i].click();
	            this.setAttribute("class", "same-as-selected");

	            break;
	          }
	        }
	        h.click();
	    });
	    b.appendChild(c);
	  }
	  x.appendChild(b);
	  x.appendChild(d);
	  
	  a.addEventListener("click", function(e) {
	      /*when the select box is clicked, close any other select boxes,
	      and open/close the current select box:*/
	      e.stopPropagation();
	      closeAllSelect(this);
	      this.nextSibling.classList.toggle("select-hide");
	      this.classList.toggle("select-arrow-active");
	    });
	  
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
