<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<script>
	
		var xhr = new XMLHttpRequest();
		var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList';
		var serviceKey = 'FEqnHwLut7%2BkXL6aLkgAniIXfNGB1Go6F1KUHkA1DRc9joGqc8LbQooHLSu0380ybAbdG%2FkEuwE%2FeiDiR1kRpQ%3D%3D';
		var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
		// queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent(serviceKey); /*공공데이터포털에서*/
		queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*한 페이지 결과 수*/
		queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*현재 페이지 번호*/
		queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /*IOS(아이폰),AND(안드로이드),WIN(원도우폰),ETC*/
		queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /*서비스명=어플명*/
		queryParams += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent('126508'); /*콘텐츠ID*/
		queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(''); /*관광타입(관광지, 숙박 등) ID*/
		queryParams += '&' + encodeURIComponent('defaultYN') + '=' + encodeURIComponent('Y'); /*기본정보 조회여부*/
		queryParams += '&' + encodeURIComponent('firstImageYN') + '=' + encodeURIComponent('Y'); /*원본, 썸네일 대표이미지 조회여부*/
		queryParams += '&' + encodeURIComponent('areacodeYN') + '=' + encodeURIComponent('Y'); /*지역코드, 시군구코드 조회여부*/
		queryParams += '&' + encodeURIComponent('catcodeYN') + '=' + encodeURIComponent('Y'); /*대,중,소분류코드 조회여부*/
		queryParams += '&' + encodeURIComponent('addrinfoYN') + '=' + encodeURIComponent('Y'); /*주소, 상세주소 조회여부*/
		queryParams += '&' + encodeURIComponent('mapinfoYN') + '=' + encodeURIComponent('Y'); /*좌표 X,Y 조회여부*/
		queryParams += '&' + encodeURIComponent('overviewYN') + '=' + encodeURIComponent('Y'); /*콘텐츠 개요 조회여부*/
		xhr.open('GET',url+queryParams);
		xhr.onreadystatechange = function () {
			if(this.readyState == 4) {
				document.getElementsByTagName("body")[0].innerHTML = 'Status:' + this.status + 'Headers: ' + JSON.stringify(this.getAllResponseHeaders()) + 'Body : ' + this.responseText;
				
			}
		};
		xhr.send('');
	</script>
</body>
</html>