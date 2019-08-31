package openAPI;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

@WebServlet("/publicData")
public class PublicData extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final String USER_AGENT = "Mozilla/5.0";
	private String serviceKey = "FEqnHwLut7%2BkXL6aLkgAniIXfNGB1Go6F1KUHkA1DRc9joGqc8LbQooHLSu0380ybAbdG%2FkEuwE%2FeiDiR1kRpQ%3D%3D";
	private String Address = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList";
	private String protocol = "GET";
	private String result = "";
	private String line = "";
	private String parameter;
	private URL url;
	private BufferedReader br;
	private HttpURLConnection con;
	private StringBuilder urlBuilder;
	private StringBuilder sb;
	private DocumentBuilder dBuilder;
	private DocumentBuilderFactory dbFactory;
	private Document document;
	private Node node;
	private Node textNode;
	private NodeList nodeList;
	private Element element;
	
	public PublicData() {
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
			
			urlBuilder = new StringBuilder(Address);
			urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + serviceKey);
			urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));

	        url = new URL(urlBuilder.toString());
			con = (HttpURLConnection)url.openConnection();
			con.setRequestMethod(protocol);
			con.setRequestProperty("Content-type", "application/json");
			System.out.println("Response code: " + con.getResponseCode());
			// con.setRequestProperty("User-Agent", USER_AGENT);
			
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
				nodeList = document.getElementsByTagName("title");
				// node = nodeList.item(0);
				
				
			} catch (SAXException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ParserConfigurationException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			br.close();
			con.disconnect();
			
			for(int i=0; i<nodeList.getLength(); i++) {
				textNode = nodeList.item(i).getChildNodes().item(0);
				System.out.println(textNode.getNodeValue());
			}
			
			// System.out.println(sb.toString());
			
	}
}
