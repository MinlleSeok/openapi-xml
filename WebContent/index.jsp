<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>지역 관광정보 검색기</title>
<link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
</head>
<body>
	<div id="location">
		<select title="지역선택" name="areacode" onchange="areaCodeChange()" id="areacode">
			<option value="0" selected="selected">지역선택</option>
			<option value="1">서울</option>
			<option value="2">인천</option>
			<option value="3">대전</option>
			<option value="4">대구</option>
			<option value="5">광주</option>
			<option value="6">부산</option>
			<option value="7">울산</option>
			<option value="8">세종특별자치시</option>
			<option value="31">경기도</option>
			<option value="32">강원도</option>
			<option value="33">충청북도</option>
			<option value="34">충청남도</option>
			<option value="35">경상북도</option>
			<option value="36">경상남도</option>
			<option value="37">전라북도</option>
			<option value="38">전라남도</option>
			<option value="39">제주도</option>		
		</select>
		<div id="siGunGu">
		</div>
	</div>
	<button onclick="return sigunguSubmit();">전송</button>
	
	<table border="1" id="result">
		<tr>
			<td>이름</td>
			<td>사진</td>
		</tr>
	</table>

	<script>
		var serviceKey = 'FEqnHwLut7%2BkXL6aLkgAniIXfNGB1Go6F1KUHkA1DRc9joGqc8LbQooHLSu0380ybAbdG%2FkEuwE%2FeiDiR1kRpQ%3D%3D';
		
		
		function isEmpty(str){
	         
	        if(typeof str === "undefined" || str == null || str == "" || str == 0)
	            return true;
	        else
	            return false;
	    }
		
		function areaCodeChange() {
			var xhr = new XMLHttpRequest();
			var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode';
			
			var areaCode = document.getElementById("areacode").value;
			var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
			queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /*IOS(아이폰),AND(안드로이드),WIN(원도우폰),ETC*/
			queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /*서비스명=어플명*/
			queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('40'); /*한 페이지 결과 수*/
			queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(areaCode); /*서비스명=어플명*/
			
			xhr.open('GET',url+queryParams);
			xhr.onreadystatechange = function() {
				if(this.status == 200 && this.readyState == this.DONE) {
					processXMLObj(xhr);
				}
			}
			xhr.send('');
		}
		
		function sigunguSubmit() {
			var areaCode = document.getElementById("areacode").value;
			var sigunguCode = document.getElementById("sigungu").value;
			
			if (isEmpty(areaCode)){
				document.getElementById("result").innerHTML = "선택하세요";
				return;
			}
			
			if (isEmpty(sigunguCode)){
				document.getElementById("result").innerHTML = "선택하세요";
				return;
			}
			
			var xhr = new XMLHttpRequest();
			var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList';
			var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
			queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /*IOS(아이폰),AND(안드로이드),WIN(원도우폰),ETC*/
			queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /*서비스명=어플명*/
			queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('40'); /*한 페이지 결과 수*/
			queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(areaCode);
			queryParams += '&' + encodeURIComponent('sigunguCode') + '=' + encodeURIComponent(sigunguCode);
			
			xhr.open('GET',url+queryParams);
			xhr.onreadystatechange = function() {
				if(this.status == 200 && this.readyState == this.DONE) {
					processXMLtotal(xhr);
				}
			}
			xhr.send('');
		}
		
		function processXMLObj(xhr) {
			var xmlObj, nameList, result, idx;
			xmlObj = xhr.responseXML;
			nameList = xmlObj.getElementsByTagName("name");
			result = "";
			
			var html = '<select title="지역선택2" name="sigungu" id="sigungu">';
				html += '<option value="0" selected="selected">시군구선택</option>';
				
			for(idx=0; idx<nameList.length; idx++) {
				html += '<option value="'+(idx+1)+'">'+nameList[idx].childNodes[0].nodeValue+'</option>';
			}
			html += '</select>';
			document.getElementById("siGunGu").innerHTML = html;
		}
		
		function processXMLtotal(xhr) {
			var xmlObj, list, nameList2, imageList, result, idx;
			xmlObj = xhr.responseXML;
			list = xmlObj.getElementsByTagName("item");

			var html = "<tr><td>이름</td><td>사진</td></tr>";
			
			for(idx=0; idx<list.length; idx++) {
				html += '<tr><td>'+list[idx].getElementsByTagName("title")[0].childNodes[0].nodeValue+'</td>';
				if(list[idx].getElementsByTagName("firstimage2")[0]){
					html += '<td><img src="'+list[idx].getElementsByTagName("firstimage")[0].childNodes[0].nodeValue+'" height="200px"></td></tr>';
				} else {
					html += '<td>사진없음</td></tr>';
				}
			}

			document.getElementById("result").innerHTML = html;
		}
		
		

	</script>
</body>
</html>