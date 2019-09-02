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
			queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('20'); /*한 페이지 결과 수*/
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
			document.getElementById("sigungu").options[0].selected = false;
			document.getElementById("sigungu").options[1].selected = true;
			
			sigunguCode = 2;
			isloading.stop();
			openApiAjax("areaBasedList", 2);
			
		}
		
		function getResultList(xhr) {
			isloading.start();
			var xmlObj, list, html, idx;
			xmlObj = xhr.responseXML;
			list = xmlObj.getElementsByTagName("item");

			html = "<tr><td>name</td><td>picture</td></tr>";

			// 마커 이미지의 이미지 주소입니다
			var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
			
			// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
			var bounds = new kakao.maps.LatLngBounds();
			
			// 마커 이미지의 이미지 크기 입니다
		    var imageSize = new kakao.maps.Size(24, 35); 
		    
		    // 마커 이미지를 생성합니다    
		    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
			
			for(idx=0; idx<list.length; idx++) {
				
				html += '<tr><td>'+list[idx].getElementsByTagName("title")[0].childNodes[0].nodeValue+'</td>';
				
				if(list[idx].getElementsByTagName("firstimage2")[0]){
					html += '<td><img src="'+list[idx].getElementsByTagName("firstimage")[0].childNodes[0].nodeValue+'" height="200px"></td></tr>';
										
				} else {
					html += '<td>no picture</td></tr>';
				}
				
				if(list[idx].getElementsByTagName("mapy")[0]){
					var mapInstance = {
							title: list[idx].getElementsByTagName("title")[0].childNodes[0].nodeValue.substring(0,10),
							latlng: new kakao.maps.LatLng(list[idx].getElementsByTagName("mapy")[0].childNodes[0].nodeValue, list[idx].getElementsByTagName("mapx")[0].childNodes[0].nodeValue)
					};
					// 마커를 표시할 위치와 title 객체 배열입니다 
					// 마커를 생성합니다
				    var marker = new kakao.maps.Marker({
				        map: map, // 마커를 표시할 지도
				        position: mapInstance.latlng, // 마커를 표시할 위치
				        // title : mapInstance.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
				        image : markerImage // 마커 이미지 
				    });
				    // marker.setMap(map);
				    bounds.extend(mapInstance.latlng);
				}
			}

			// LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
		    // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
			map.setBounds(bounds);
			map.relayout();
			
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