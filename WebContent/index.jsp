<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>지역 관광정보 검색기</title>
<link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
<link rel="stylesheet" type="text/css" href="style/style.css">

</head>
<body>
<div>
<button onclick="return langCheck(0);" class="button button1 line">국문</button>
<button onclick="return langCheck(1);" class="button button1 line">English</button>
<button onclick="return langCheck(2);" class="button button1 line">Espanol</button>
</div>
<div class="clear"></div>
<h1 id="HeaderText"></h1>

<div>
	<div id="location" class="line">
	</div>
	<div id="siGunGu" class="line">
	</div>
</div>

 
<div id="content" style="display:none;">
	<button onclick="return apiSubmit();" class="button button1 line">전송</button>
	<div class="clear"></div>
	<div id="map" style="width:500px;height:400px">
	</div>
	
	<table border="1" id="result">
		<tr>
			<td>이름</td>
			<td>사진</td>
		</tr>
	</table>
</div>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=05d13a0c3036d9bc69e650dda71cf4f9&autoload=false"></script>
<script type="text/javascript">
var container = document.getElementById('map');
var map;
//var map = new kakao.maps.Map(container, options);
kakao.maps.load(function() {
	var options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
	};
	// v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
    map = new kakao.maps.Map(container, options);
});
</script>
<script src="js/function.js"></script>
</body>
</html>