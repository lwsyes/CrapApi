package cn.crap.controller.visitor;

import cn.crap.enu.InterfaceContentType;
import cn.crap.framework.MyException;
import cn.crap.framework.base.BaseController;
import cn.crap.model.InterfaceWithBLOBs;
import cn.crap.service.InterfaceService;
import cn.crap.service.tool.StringCache;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

@Controller
@RequestMapping("/mock")
public class MockController extends BaseController{

	@Autowired
	private InterfaceService interfaceService;
	@Autowired
	private StringCache stringCache;
    private static final String SPLIT = "|";

	private static final String MOCK_KEY_PRE = "inter:mock:";
    private static HashMap<String, AtomicInteger> ipNumMap = Maps.newHashMap();

	@RequestMapping("/trueExam.do")
	@ResponseBody
	public void trueExam(HttpServletResponse response, HttpServletRequest request, @RequestParam String id) throws MyException {
        String ip =  (request == null ? "" : request.getRemoteHost());
        getExam(response, request, id, ip,true);
    }

    @RequestMapping("/falseExam.do")
	@ResponseBody
	public void falseExam(HttpServletResponse response, HttpServletRequest request, @RequestParam String id, @RequestParam(defaultValue = "false") Boolean cache) throws MyException {
        String ip =  (request == null ? "" : request.getRemoteHost());
        getExam(response, request, id, ip,false);
	}


    private void getExam(HttpServletResponse response, HttpServletRequest request, String id, String ip, boolean isTrueExam) throws MyException{
        response.addHeader("Access-Control-Allow-Credentials", "true");
        response.addHeader("Access-Control-Allow-Headers",
                "Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,X-Requested-With");
        response.addHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS,TRACE");
        response.addHeader("Access-Control-Allow-Origin", "*");

        log.info("getExam:" + id  + "," + ip + "," + getHeaders(request));
        if ("166575110957612017308".contains(id) || blackInterface(id)){
            printMsg(response, "", null);
            return;
        }

        String mockKey = getMockKey(id, isTrueExam);
        String cacheValue = stringCache.get(mockKey);
        if (cacheValue != null){
            String mockResult = cacheValue.substring(0, cacheValue.lastIndexOf("|"));
            String contentType = cacheValue.substring(cacheValue.lastIndexOf("|") + 1);
            printMsg(response, mockResult, InterfaceContentType.getByType(contentType));
            return;
        }

        InterfaceWithBLOBs interfaceWithBLOBs = interfaceService.getById(id);
        InterfaceContentType contentType = InterfaceContentType.getByType(interfaceWithBLOBs.getContentType());
        if (contentType == null){
            contentType = InterfaceContentType.JSON;
        }

        String mockResult = (isTrueExam ? interfaceWithBLOBs.getTrueExam() : interfaceWithBLOBs.getFalseExam());
        mockResult = (mockResult == null ? "" : mockResult);

        stringCache.add(mockKey,  mockResult + "|" + contentType.getType());
        printMsg(response, mockResult, contentType);
    }


    public static String getMockKey(String id, boolean isTrueExam){
		return MOCK_KEY_PRE + (isTrueExam ? "true:" : "false:")+ id;
	}

    protected String getHeaders(HttpServletRequest request ) {
        //获取请求头信息
        Enumeration headerNames = request.getHeaderNames();
        StringBuilder sb = new StringBuilder();
        //使用循环遍历请求头，并通过getHeader()方法获取一个指定名称的头字段
        while (headerNames.hasMoreElements()){
            String headerName = (String) headerNames.nextElement();
            sb.append(headerName + " : " + request.getHeader(headerName) + ";");
        }
        return sb.toString() + request.getRequestURL();
    }

}
