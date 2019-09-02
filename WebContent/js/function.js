/**
 *	function.js
 */

var serviceKey = 'FEqnHwLut7%2BkXL6aLkgAniIXfNGB1Go6F1KUHkA1DRc9joGqc8LbQooHLSu0380ybAbdG%2FkEuwE%2FeiDiR1kRpQ%3D%3D';

var lang = '';
var areaCode = 0;
var sigunguCode = 0;
var Header = ['지역 기반 OpenAPI 대한민국 관광 정보','Regional-Based OpenAPI Korea Tourism Information','Información de turismo de Corea por OpenAPI de base regional']; 

		function isEmpty(str){
	         
	        if(typeof str === "undefined" || str == null || str == "" || str == 0)
	            return true;
	        else
	            return false;
	    }
		
		function langCheck(langInputData){
			
			loc1ButtonsDelete();
			loc2ButtonsDelete();
			
			areaCode = 0;
			sigunguCode = 0;
			
			if(langInputData == 0) {
				document.getElementById("HeaderText").innerHTML = Header[0];	
				lang = 'KorService';
			} else if(langInputData == 1) {
				document.getElementById("HeaderText").innerHTML = Header[1];	
				lang = 'EngService';
			} else if(langInputData == 2) {
				document.getElementById("HeaderText").innerHTML = Header[2];	
				lang = 'SpnService';
			}
			
			openApiAjax("areaCode", 0);
			document.getElementById("content").style.display = 'block';
		}

		function changeValue(selectObejct, check) {
			if(check == 1){
				areaCode = selectObejct.value;
				openApiAjax("areaCode", 1);
			} else if (check == 2){
				sigunguCode = selectObejct.value;
				openApiAjax("areaBasedList", 2);
			}
		}
		
		function openApiAjax(target, number) {
			isloading.start();
			var xhr = new XMLHttpRequest();
			var url = 'http://api.visitkorea.or.kr/openapi/service/rest/'+lang+'/'+target;
			
			var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
			queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /*IOS(아이폰),AND(안드로이드),WIN(원도우폰),ETC*/
			queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /*서비스명=어플명*/
			queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('40'); /*한 페이지 결과 수*/
			// 시군구 코드 불러오기
			if(number >= 1){
				queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(areaCode); /*서비스명=어플명*/
			}
			// 전송하기
			if(number == 2) {
				queryParams += '&' + encodeURIComponent('sigunguCode') + '=' + encodeURIComponent(sigunguCode);
			}
			xhr.open('GET',url+queryParams);
			xhr.onreadystatechange = function() {
				if(this.status == 200 && this.readyState == this.DONE) {
					
					if(number == 0) {
						buildLoc1Buttons(xhr);
					} else if(number == 1) {
						buildLoc2Buttons(xhr);
					} else if(number == 2) {
						getResultList(xhr);
					}
					
					isloading.stop();
				}
			}
			xhr.send('');
		}
		
		function apiSubmit() {
			
			if(areaCode > 0 && sigunguCode > 0) {
				
				openApiAjax("areaBasedList", 2);
			}
		}
		
		function loadXml(xhr) {
			var xmlObj, nameList, html, idx;
			xmlObj = xhr.responseXML;
			nameList = xmlObj.getElementsByTagName("name");
			
			return nameList;
		}
		
		
		function buildLoc1Buttons(xhr) {
			isloading.start();
			var idx, html, a, b, c, d;
			var idx2 = 31;
			var nameList = loadXml(xhr);

			loc1ButtonsDelete();
			loc2ButtonsDelete();
			
			d = document.createElement("div");
			d.id = "loc1";
			a = document.createElement("label");
			a.setAttribute("for","areacode");
			b = document.createElement("select");
			b.setAttribute("onchange","changeValue(this,1)");
			b.id = "areacode";
			
			
			for(idx=0; idx<nameList.length; idx++) {

				c = document.createElement("option");
				if(idx > 7) {
					c.setAttribute("value",idx2);
					idx2++;
				} else {
					c.setAttribute("value",idx+1);
				}
				c.innerHTML = nameList[idx].childNodes[0].nodeValue;
				b.appendChild(c);
			}
			
			d.appendChild(a);
			d.appendChild(b);
			document.getElementById("location").appendChild(d);
			areaCode = 1;
			isloading.stop();
			openApiAjax("areaCode", 1);
			
		}
		
		function buildLoc2Buttons(xhr) {
			isloading.start();
			var idx, html, a, b, c;
			var nameList = loadXml(xhr);
			
			loc2ButtonsDelete();
			
			a = document.createElement("div");
			a.id = "loc2";
			b = document.createElement("select");
			b.setAttribute("onchange","changeValue(this,2)");
			b.id = "sigungu";
				
			for(idx=0; idx<nameList.length; idx++) {
				c = document.createElement("option");
				c.setAttribute("value",idx+1);
				c.innerHTML = nameList[idx].childNodes[0].nodeValue;
				b.appendChild(c);
			}
			a.appendChild(b);
			document.getElementById("siGunGu").appendChild(a);
			sigunguCode = 1;
			isloading.stop();
			openApiAjax("areaBasedList", 2);
			
		}
		
		function getResultList(xhr) {
			isloading.start();
			var xmlObj, list, html, idx;
			xmlObj = xhr.responseXML;
			list = xmlObj.getElementsByTagName("item");

			html = "<tr><td>name</td><td>picture</td></tr>";
			
			for(idx=0; idx<list.length; idx++) {
				html += '<tr><td>'+list[idx].getElementsByTagName("title")[0].childNodes[0].nodeValue+'</td>';
				if(list[idx].getElementsByTagName("firstimage2")[0]){
					html += '<td><img src="'+list[idx].getElementsByTagName("firstimage")[0].childNodes[0].nodeValue+'" height="200px"></td></tr>';
				} else {
					html += '<td>no picture</td></tr>';
				}
			}

			document.getElementById("result").innerHTML = html;
			isloading.stop();
		}
		
		function loc1ButtonsDelete() {
			
			if(document.getElementById("areacode")){
				var ac = document.getElementById("areacode");
				ac.parentNode.parentNode.removeChild(document.getElementById("loc1"));
			}
			
		}
		
		function loc2ButtonsDelete() {
				
			if(document.getElementById("sigungu")){
				var ac = document.getElementById("sigungu");
				ac.parentNode.parentNode.removeChild(document.getElementById("loc2"));
			}
			
		}
		
		// 로딩 화면 생성기
		isloading = {
			start : function() {
				if (document.getElementById('wfLoading')) {
					return;
				}
				var ele = document.createElement('div');
				ele.setAttribute('id', 'wfLoading');
				ele.classList.add('loading-layer');
				ele.innerHTML = '<span class="loading-wrap"><span class="loading-text"><span>.</span><span>.</span><span>.</span></span></span>';
				document.body.append(ele);

				// Animation
				ele.classList.add('active-loading');
			},
			stop : function() {
				var ele = document.getElementById('wfLoading');
				if (ele) {
					ele.remove();
				}
			}
		}