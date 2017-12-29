package cn.crap.controller.front;

import cn.crap.dto.LoginInfoDto;
import cn.crap.dto.MenuWithSubMenuDto;
import cn.crap.dto.SearchDto;
import cn.crap.dto.SettingDto;
import cn.crap.framework.JsonResult;
import cn.crap.framework.MyException;
import cn.crap.framework.base.BaseController;
import cn.crap.service.ISearchService;
import cn.crap.service.tool.LuceneSearchService;
import cn.crap.service.custom.CustomMenuService;
import cn.crap.springbeans.Config;
import cn.crap.utils.Const;
import cn.crap.utils.MyString;
import cn.crap.utils.Page;
import cn.crap.utils.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller("fontMainController")
public class MainController extends BaseController{
	@Autowired
	private ISearchService luceneService;
	@Autowired
	private CustomMenuService customMenuService;
	@Autowired
	private Config config;
	
	/**
	 * 默认页面，重定向web.do，不直接进入web.do是因为进入默认地址，浏览器中的href不会改变， 会导致用户第一点击闪屏
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/home.do")
	public void home() throws Exception {
		SettingDto indexUrl = settingCache.get(Const.SETTING_INDEX_PAGE);
		if (indexUrl != null && !MyString.isEmpty(indexUrl.getValue())){
			response.sendRedirect(indexUrl.getValue());
		}else{
			response.sendRedirect("index.do");
		}
		
	}
	
	/**
	 * 前端主页面
	 * @return
	 * @throws Exception
	 */
	@RequestMapping({"/index.do","/web.do"})
	public String index() throws Exception {
		return "resources/html/frontHtml/index.html";
	}
	/**
	 * 公共
	 * @param result
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws MessagingException
	 */
	@RequestMapping("/result.do")
	public String validateEmail(String result) throws UnsupportedEncodingException, MessagingException {
		request.setAttribute("result", result);
		return "WEB-INF/views/result.jsp";
	}
	
	/**
	 * 前端项目主页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/project.do")
	public String project() throws Exception {
		return "resources/html/frontHtml/projectIndex.html";
	}
	
	@RequestMapping("/searchList.do")
	@ResponseBody
	public void searchList(HttpServletResponse response) throws Exception {
		// 只显示前10个
		StringBuilder sb = new StringBuilder("<div class='tl'>");
		@SuppressWarnings("unchecked")
		ArrayList<String> searchWords = (ArrayList<String>) objectCache.get(Const.CACHE_SEARCH_WORDS);
		if(searchWords != null){
			int i = 0;
			String itemClass = "";
			for(String searchWord: searchWords){
				i = i+1;
				if(i > 10) break;
				if(i == 1) itemClass = " text-danger ";
				else if(i == 2) itemClass = " text-info ";
				else if(i == 3) itemClass = " text-warning ";
				else itemClass = " C555 ";
				
				
				String showText = searchWord.substring(0, searchWord.length()>20?20:searchWord.length());
				if(searchWord.length()>20){
					showText = showText + "...";
				}
				searchWord = LuceneSearchService.handleHref(searchWord);
				sb.append( "<a onclick=\"iClose('lookUp');\" class='p3 pl10 dis "+ itemClass +"' href='#/frontSearch/"+searchWord+"'>"+showText+"</a>");
			}
			
		}
		sb.append("</div>");
		printMsg(sb.toString());
		
	}

	/**
	 * 初始化前端页面
	 * 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/front/init.do")
	@ResponseBody
	public JsonResult frontInit(HttpServletRequest request) throws Exception {
		Map<String, String> settingMap = new HashMap<String, String>();
		for (SettingDto setting : settingCache.getAll()) {
			if(Const.SETTING_SECRETKEY.equals(setting.getKey())){
				continue;
			}
			settingMap.put(setting.getKey(), setting.getValue());
		}
		settingMap.put(Const.DOMAIN, config.getDomain());
		settingMap.put(Const.SETTING_OPEN_REGISTER, config.isOpenRegister()+"");
		settingMap.put(Const.SETTING_GITHUB_ID, MyString.isEmpty( config.getClientID() )? "false":"true");
		
		Map<String,Object> returnMap = new HashMap<String,Object>();
		returnMap.put("settingMap", settingMap);
		
		// 从缓存中获取菜单
		Object objMenus = objectCache.get("cache:leftMenu");
		List<MenuWithSubMenuDto> menus = null;
		if(objMenus == null){
			synchronized (MainController.class) {
				objMenus = objectCache.get("cache:leftMenu");
				if(objMenus == null){
					menus = customMenuService.getLeftMenu();
					objectCache.add("cache:leftMenu", menus);//缓存10分钟
				}else{
					menus = (List<MenuWithSubMenuDto>) objMenus;
				}
			}
			
		}else{
			menus = (List<MenuWithSubMenuDto>) objMenus;
		}
		
		returnMap.put("menuList", menus);
		LoginInfoDto user = (LoginInfoDto) Tools.getUser();

		returnMap.put("sessionAdminName", user == null? "": user.getUserName());
		return new JsonResult(1, returnMap);
	}
	

	@RequestMapping("/frontSearch.do")
	@ResponseBody
	public JsonResult frontSearch(@RequestParam(defaultValue="") String keyword, @RequestParam(defaultValue = "1") Integer currentPage) throws Exception{
		if(config.isLuceneSearchNeedLogin()){
			LoginInfoDto user = Tools.getUser();
			if(user == null){
				throw new MyException("000043");
			}
		}
		keyword = keyword.trim();
		Page page= new Page(10, currentPage);
		List<SearchDto> searchResults = luceneService.search(keyword, page);
		Map<String,Object> returnMap = new HashMap<String,Object>();
		returnMap.put("searchResults", searchResults);
		
		// 将搜索的内容记入内存
		if(!MyString.isEmpty(keyword)){
			@SuppressWarnings("unchecked")
			ArrayList<String> searchWords = (ArrayList<String>) objectCache.get(Const.CACHE_SEARCH_WORDS);
			if(searchWords == null){
				searchWords = new ArrayList<String>();
			}
			// 如果已经存在，则将排序+1
			if(searchWords.contains(keyword)){
				int index = searchWords.indexOf(keyword);
				if(index>0){
					searchWords.remove(keyword);
					searchWords.add(index-1, keyword);
				}
			}else{
				// 最多存200个，超过200个，则移除最后一个，并将新搜索的词放在100
				if(searchWords.size() >= 200){
					searchWords.remove(199);
					searchWords.add(100, keyword);
				}else{
					searchWords.add(keyword);
				}
			}
			// TODO 搜索关键字存数据库
			objectCache.add(Const.CACHE_SEARCH_WORDS, searchWords);
		}
		
		return new JsonResult(1, returnMap, page, 
				Tools.getMap("crumbs", Tools.getCrumbs("搜索关键词:"+keyword,"void")));
	}
}
