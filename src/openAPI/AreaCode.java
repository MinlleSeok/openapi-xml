package openAPI;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

@WebServlet("/areaCode")
public class AreaCode extends HttpServlet {
	
	/**
	 * 변수 선언
	 */
	private static final long serialVersionUID = 1L;
	private String serviceKey = "FEqnHwLut7%2BkXL6aLkgAniIXfNGB1Go6F1KUHkA1DRc9joGqc8LbQooHLSu0380ybAbdG%2FkEuwE%2FeiDiR1kRpQ%3D%3D";
	private String Address = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode";
	private String protocol = "GET";
	private String line = "";
	private URL url;
	private BufferedReader br;
	private HttpURLConnection con;
	private StringBuilder urlBuilder;
	private StringBuilder sb;
	private DocumentBuilder dBuilder;
	private DocumentBuilderFactory dbFactory;
	private Document document;
	private Node textNode;
	private NodeList nodeList;
	private NodeList nameList;
	
	public AreaCode() {
		super();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

			doHandle(request,response);

	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doHandle(request,response);

	}

	protected void doHandle(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=UTF-8");
			String areaCode = request.getParameter("areaCode");
			
			urlBuilder = new StringBuilder(Address);
			urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + serviceKey);
			urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("areaCode","UTF-8") + "=" + URLEncoder.encode(areaCode, "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("40", "UTF-8"));
			
	        url = new URL(urlBuilder.toString());
			con = (HttpURLConnection)url.openConnection();
			con.setRequestMethod(protocol);
			con.setRequestProperty("Content-type", "application/json");
			System.out.println("Response code: " + con.getResponseCode());
			
			if (con.getResponseCode() >= 200 && con.getResponseCode() <= 300) {
				br = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
			} else {
				br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
			}
			
			sb = new StringBuilder();

			while((line = br.readLine()) != null) {
				sb.append(line);
			}
			
			dbFactory = DocumentBuilderFactory.newInstance();

			try {
				dBuilder = dbFactory.newDocumentBuilder();
				document = dBuilder.parse(new InputSource(new StringReader(sb.toString())));
				nameList = document.getElementsByTagName("name");
			} catch (SAXException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ParserConfigurationException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			br.close();
			con.disconnect();
			
			JSONObject jobj = new JSONObject();
			JSONArray array = new JSONArray();
			
			for(int i=0; i<nodeList.getLength(); i++) {
				textNode = nameList.item(i).getChildNodes().item(0);
				System.out.println(textNode.getNodeValue());
				array.add(textNode);
			}
			jobj.put("item", array);
			
			PrintWriter out = response.getWriter();
			out.print(jobj.toString());
			
			// System.out.println(sb.toString());
			
	}
}
